// DOM 조작하기 위한 변수들
const searchBtn = document.querySelector(".search-btn");
const postEditBtn = document.querySelectorAll(".post-edit-btn");
const feedContainer = document.querySelector("#feed-container");

// API 이용하기 위한 변수들
const url = "http://146.56.183.55:5050";
const token = sessionStorage.getItem("pic_token");
const accountName = sessionStorage.getItem("pic_accountName");

const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


// 팔로우 하고 있는 사람들의 피드 불러오기 
const displayFollowingFeed = () => {
fetch(`${url}/post/feed/?limit=100`, requestOptions)
  .then(response => response.json())
  .then(result => {
    // 팔로잉 하는 사람의 포스트가 없을 경우 기본 페이지 디스플레이
    if (result.posts.length === 0) { 
      const defaultDisplay = document.createElement("section");
      defaultDisplay.classList.add("section-feed-new-user");
      const defaultHTML = `
      <!-- first feed page for new user -->
      <h2 class="feed-title">유저를 검색해 팔로우 해보세요!</h2>
      <button class="search-user-btn">검색하기</button>
      `
      defaultDisplay.innerHTML = defaultHTML;
      feedContainer.append(defaultDisplay);
    }
    // 팔로잉 하는 사람의 포스트가 하나라도 있을 경우 
    if(result.posts.length >= 1) {
      result.posts.forEach((post) => {
        // console.log(post);
        const postItem = document.createElement("article");
        postItem.classList.add("post");

        // 포스트에 있는 유저 프로필 이미지
        let profilePic = post.author.image;
        if(!profilePic.includes("http")) {
          profilePic = `${url}/${profilePic}`;
        }
        // ""들어간 string에서 ""제거
        const content = post.content.replaceAll(/^"|"$/g, ""); 

        // 포스트 작성일
        const date = post.createdAt.slice(0,10);
        let [year, month, day] = date.split("-");
        if (month.length > 1 && month[0] == 0) {
          const temp = month.split("0").join("");
          month = temp;
        }
        if (day.length > 1 && day[0] == 0) {
          const temp = day.split("0").join("");
          day = temp;
        }

        // 포스트 HTML  
        let postHTML = `
        <h2 class="txt-hide">포스팅 카드</h2>
          <section class="post-card">
            <nav class="user-info">
              <a href="javascript:void(0)" class="post-card-profile">
                <img src=${ post.author.image === "" ? "../src/images/search/default_profile.png"
                : `${profilePic}`} alt="user-profile-img">
              </a>
              <a href="javascript:void(0)" class="user">
                <span class="user-name">${post.author.username}</span>
                <span class="user-id">@${post.author.accountname}</span>
              </a>
              <button type="button" class="post-edit-btn">
                <span class="txt-hide">더보기 버튼</span>
              </button>
            </nav>
            <div class="post-content-container">
              ${content ? `<p class="post-content-txt">${content}</p>` : ""}
              ${ post.image? `<div class="post-content-img">  
              <div class="img-slide-container">` : ""}
        `

        // 포스팅 이미지 불러오기
        const images = post.image;

        // 이미지가 있는 경우
        if(images) {
          const imgArr = images.split(",");
          let imgCount = imgArr.length;
          
          if (imgCount === 1) {
            // 포스트 이미지 1개 일때  
            postHTML += `<img src ="${url}/${images}" alt="feed-posting-image"></div></div>`
          } else if(imgCount > 1) {
            // 포스트 이미지 1개 이상
            imgArr.forEach((img) => {
              postHTML += `
                <img src="${url}/${img}" alt="feed-posting-image">`
            })
            postHTML += `</div>`
          }
    
          // 포스트 이미지 여러개 일 때 슬라이드 버튼
          if(imgCount > 1) {
            postHTML += `<div class="slide-buttons">` 
          for (let i=0; i <imgCount; i++) {
            if(i === 0) {
              postHTML += `<span class="slide-btn active"></span>`
            } else {
              postHTML += `<span class="slide-btn"></span>`
            }          
          }
          postHTML +=`</div></div>`
          }
        }

        postHTML += `  
              <ul class="like-comment-container">
                <li class="like">
                  <button type="button" class="default likebtn">
                    <span class="txt-hide">좋아요 버튼</span>
                  </button>
                  <span>${post.heartCount}</span>
                </li>
                <li class="comment">
                  <button type="button" class="comment-btn">
                    <span class="txt-hide">코멘트 버튼</span>
                  </button>
                  <span>${post.commentCount}</span>
                </li>
              </ul>
              <p class="post-date">${year}년 ${month}월 ${day}일</p>
            </div>
          </section>
        `
        postItem.innerHTML = postHTML;
        feedContainer.append(postItem);
      })
      handleDomElement(feedContainer, result); // handleDomeElement function 안에서 dom요소 접근가능
    }    
  })
  .catch(error => {
    console.log('error', error)
    // 에러여도 디폴트 화면 보여주기
    const defaultDisplay = document.createElement("section");
    defaultDisplay.classList.add("section-feed-new-user");
    const defaultHTML = `
    <!-- first feed page for new user -->
    <h2 class="feed-title">유저를 검색해 팔로우 해보세요!</h2>
    <button class="search-user-btn">검색하기</button>
    `
    defaultDisplay.innerHTML = defaultHTML;
    feedContainer.append(defaultDisplay);
  })
}


// DOM element - domElements, api data - feed로 받음 (element선택가능)
let feedData;
function handleDomElement(domElements, feed) {
  // console.log(data)
  // console.log(feed)
  feedData = feed;

  // 포스팅 이미지 슬라이드
  const slideButtons = document.querySelectorAll(".slide-btn");    
  const handleImgSlider = (e) => {   
    const currentBtn = e.target;
    const buttons = e.target.parentNode;
    let currentIndex;
    const findActiveBtn = (currentBtn) => {
      for(let i=0; i < slideButtons.length; i++) {
        if(buttons.childNodes[i] === currentBtn) {
          currentIndex = i;        
        }
        buttons.childNodes[i].classList.remove("active")
      }
      currentBtn.classList.add("active");            
      const slider = buttons.parentNode.querySelector(".img-slide-container");
      slider.style.transform = `translateX(-${304 * currentIndex}px)`;
    }
    findActiveBtn(currentBtn);
  } 
  slideButtons.forEach((btn) => {
    btn.addEventListener("click", handleImgSlider)
  })

  // 코멘트 버튼 클릭시 해당 포스팅의 postDetail 페이지로 이동 
  const commentButtons = document.querySelectorAll(".comment-btn");
  const goToPostDetail = (event) => {
    location.href = "./postDetail.html";
    const currentBtn = event.target;
    const index = [...commentButtons].indexOf(currentBtn)
    clickedPost = feed.posts[index];
    // 코멘트버튼 클릭한 해당포스트 정보 로컬스토리지에 저장
    localStorage.setItem("clicked-post", JSON.stringify(clickedPost))
  };   
  commentButtons.forEach((btn) => {
    btn.addEventListener("click", goToPostDetail)
  });

  const postEditBtn = document.querySelectorAll(".post-edit-btn")
  // console.log(postEditBtn)
  postEditBtn.forEach((button) => {
    button.addEventListener("click", openModal)
  })
}


// 내가 팔로잉 하고있는 유저 확인
fetch(`${url}/profile/${accountName}/following`, requestOptions)
  .then(response => response.json())
  .then(result => {
    const sectionForNewUser = document.querySelector(".section-feed-new-user");
    //팔로잉 하는 유저가 있는 경우 디폴트 디스플레이 삭제
    if(result[0].followingCount >= 1 && sectionForNewUser) {
      sectionForNewUser.remove();
    }
    // 피드 불러오기
    displayFollowingFeed();
  })
  .catch(error => console.log('error', error));



// 모달 취소버튼 핸들링
const handleCancel = (e) => {
  e.preventDefault();
  const modal = document.querySelector(".modal");
  const modalCheck = document.querySelector(".modal-check");
  modal.remove();
  if(modalCheck) {
         modalCheck.remove();
      }
}

// 모달 신고버튼 핸들링
let postToReport;
const handleReport = () => {
  // console.log(postToReport); // 신고할 포스트의 인덱스
  // console.log(feedData.posts); // 전체포스트 데이터
  const postId = feedData.posts[postToReport].id;
// 신고
fetch(`${url}/post/${postId}/report`, {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
})
  .then(response => response.json())
  .then(result => {
    console.log(result)
    const modal = document.querySelector(".modal");
    const modalCheck = document.querySelector(".modal-check");
    modal.remove();
    modalCheck.remove();
    alert("해당 게시물을 신고 하였습니다.")
  }
  
  )
  .catch(error => console.log('error', error));
}

// 재확인 하는 모달
const openCheckModal = (event) => {
  const buttonClicked = event.target;
  const app = document.querySelector("#app");
  const checkModal = document.createElement("div"); 
  checkModal.classList.add("modal-check");

  let modalHtml = `
    <p>게시글을 신고하시겠어요?</p>
    <div class="check-btn">
      <a href="javascript:void(0)" class="cancel-btn">취소</a>
      <a href="javascript:void(0)" class="report-final">신고</a>
    </div>
  `
  checkModal.innerHTML = modalHtml;
  app.append(checkModal)

  const cancelBtn = document.querySelector(".check-btn > .cancel-btn");
  const reportBtn = document.querySelector(".report-final");

  cancelBtn.addEventListener("click", handleCancel)
  reportBtn.addEventListener("click", handleReport);

}

// 포스트 상세 버튼 클릭하면 나오는 첫 번째 모달 창
const openModal = (event) => {
  // console.log(event.target);
  const app = document.querySelector("#app");
  const modal = document.createElement("div"); 
  modal.classList.add("modal")
  const postEditBtn = document.querySelectorAll(".post-edit-btn");
  const clickedBtn = event.target;
  postToReport = [...postEditBtn].indexOf(clickedBtn);


  let modalHTML = `
   <div class="modal">
      <div class="modal-content">
        <div class="btn-to-close"></div>
        <ul>
          <li class="modal-btn"><a href="javascript:void(0)" class="report-post">신고</a></li>
        </ul>
      </div>
      <div class="modal-layer"></div>
    </div>
  `
  modal.innerHTML = modalHTML;
  app.append(modal);

  const reportPost= document.querySelector(".report-post");
  if(reportPost) {
    reportPost.addEventListener("click", openCheckModal);
  }

  const closeModal = () => {
    const modalCheck = document.querySelector(".modal-check");
    const modal = document.querySelector(".modal");
    modal.remove();
    if(modalCheck) {
      modalCheck.remove();
    }  
  }
  const modalLayer = document.querySelector(".modal-layer");
  modalLayer.addEventListener("click", closeModal);
}


// 돋보기(서치) 아이콘 클릭시
const openSearch = () => {
  location.href = "search.html"
}
searchBtn.addEventListener("click", openSearch)

const app = document.querySelector("#app");
// JS로 생성되는 모달 버튼 핸들링
const handleDomClick = (event) => {
  const clickedBtn = event.target;
  if(clickedBtn.classList.contains("search-user-btn")){
    openSearch();
  }
}
app.addEventListener("click", handleDomClick)


// 독바 메뉴 클릭시 해당 페이지로 이동
const chatBtn = document.querySelector(".btn-chat");
const newPostBtn = document.querySelector(".btn-new-post");
const profileBtn = document.querySelector(".btn-profile");

const goToChat = () => {
  location.href = "chat_room.html";
}
const uploadNewPost = () => {
  location.href = "upload.html";
}
const goToProfile = () => {
  location.href = "mypage.html";
}

chatBtn.addEventListener("click", goToChat);
newPostBtn.addEventListener("click", uploadNewPost);
profileBtn.addEventListener("click", goToProfile);