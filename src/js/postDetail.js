const url = "http://146.56.183.55:5050/";
const token = sessionStorage.getItem("pic_token");

const settingBtn = document.querySelector(".setting-logout-btn");
const postEditBtn = document.querySelector(".post-edit-btn");


const clickedPost = localStorage.getItem("clicked post");
const postInfo = JSON.parse(clickedPost)
// console.log(postInfo)


// 클릭된 포스트 정보 디스플레이
const displayClickedPost = (postInfo) => {
  const postContainer = document.querySelector(".post");
  const post = document.createElement("section");
  post.classList.add("post-card");

  // 포스트 작성일
  const date = postInfo.createdAt.slice(0,10);
  let [year, month, day] = date.split("-");
  if (month.length > 1 && month[0] == 0) {
    const temp = month.split("0").join("");
    month = temp;
  }
  if (day.length > 1 && day[0] == 0) {
    const temp = day.split("0").join("");
    day = temp;
  }

  let postHTML = `
    <nav class="user-info">
      <a href="javascript:void(0)" class="post-card-profile">
        <img src="http://146.56.183.55:5050/${postInfo.author.image}" alt="user-profile-img">
      </a>
      <a href="javascript:void(0)" class="user">
        <span class="user-name">${postInfo.author.username}</span>
        <span class="user-id">@${postInfo.author.accountname}</span>
      </a>
      <button class="post-edit-btn">
        <span class="txt-hide">더보기 버튼</span>
      </button>
    </nav>
    <div class="post-content-container">
      ${postInfo.contents? `<p class="post-content-txt">${postInfo.contents}</p>` : ""}  
      <div class="post-content-img">
      <div class="img-slide-container">`

    // 포스팅 이미지 불러오기
    const images = postInfo.image;
    if (images.length === 1) {
        // 포스트 이미지 1개 일때  
        postHTML += `<img src="http://146.56.183.55:5050/${images}" alt="feed-posting-image">`
      } else if(images.length > 1) {
        // 포스트 이미지 1개 이상
        const imgArr = images.split(",");
        let imgCount = 0;
        imgArr.forEach((img) => {
          postHTML += `<img src="http://146.56.183.55:5050/${img}" alt="feed-posting-image">`
          imgCount = imgArr.length;
      })
      
      postHTML += `</div>`

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
      postHTML += `</div>`
      }
    }

    postHTML +=`
      </div>
        <ul class="like-comment-container">
          <li class="like">
            <button type="button" class="default">
              <span class="txt-hide">좋아요 버튼</span>
            </button>
            <span>${postInfo.heartCount}</span>
          </li>
          <li class="comment">
            <button>
              <span class="txt-hide">코멘트 버튼</span>
            </button>
            <span>${postInfo.commentCount}</span>
          </li>
        </ul>
        <p class="post-date">${year}년 ${month}월 ${day}일</p>
      </div>
    `

  post.innerHTML = postHTML;
  postContainer.append(post);

   // 포스팅 이미지 슬라이드
  const slideBtn = document.querySelectorAll(".slide-btn");      
  const handleImgSlider = (e) => {   
    const currentBtn = e.target;
    const buttons = e.target.parentNode;
    let myIndex;
    const findMyIndex = (currentBtn) => {
      for(let i=0; i < buttons.childNodes.length; i++) {
        if(currentBtn.parentNode.childNodes[i] === currentBtn) {
          myIndex = i;        
        }
        currentBtn.parentNode.childNodes[i].classList.remove("active")
      }
      currentBtn.classList.add("active");            
      const slider = currentBtn.parentNode.parentNode.querySelector(".img-slide-container");
      slider.style.transform = `translateX(-${304 * myIndex}px)`;
    }
    findMyIndex(currentBtn);
  } 
  slideBtn.forEach((btn) => {
    btn.addEventListener("click", handleImgSlider)
  })  
}
displayClickedPost(postInfo);


// API로 코멘트 불러오기
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`http://146.56.183.55:5050/post/${postInfo.id}/comments`, requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log(result.comments);
    const commentContainer = document.querySelector(".comments-container");
    if(result.comments) {    
      result.comments.forEach((commentItem) => {
        console.log(commentItem)     
        const comment =  document.createElement("article");
        comment.classList.add("comment-container");
        let commentHTML = `
          <h2 class="txt-hide">코멘트</h2>
          <div class="user-info-container">
            <!-- 유저 프로필 이미지 -->
            <a href="">
              <img src="${url}${commentItem.author.image}" alt="user-profile-picture" />
            </a>
            <div class="comment-user-info">
              <a href="">${commentItem.author.username}</a><span>· 5분 전</span>
            </div>
            <button class="comment-edit-btn">
              <span class="txt-hide">더보기 버튼</span>
            </button>
          </div>
          <p class="comment-txt">${commentItem.content}</p>
        `
        comment.innerHTML = commentHTML;    
        commentContainer.append(comment);
      })

      // 버튼 클릭하면 나오는 첫 번째 모달 창
      const commentEditBtn = document.querySelectorAll(".comment-edit-btn");
      const openModal = (event) => {
        console.log(event.target)
        const buttonClicked = event.target;
        const app = document.querySelector("#app");
        const modal = document.createElement("div"); 
        modal.classList.add("modal")
        let option = [];
        let reportClass = ""

        if(buttonClicked.classList.contains("setting-logout-btn")) {
          option.push("설정 및 개인정보");
          option.push("로그아웃");
        }
        if(buttonClicked.classList.contains("post-edit-btn")) {
          option.push("신고");
          reportClass = "report-post";
        }
        if(buttonClicked.classList.contains("comment-edit-btn")) {
          option.push("신고하기")
          reportClass = "report-comment"
        }

        let modalHtml = `
          <div class="modal-content">
            <div class="btn-to-close"></div>
            <ul>
            ${ (option.length > 1) ? 
              `<li class="modal-btn"><a href="javascript:void(0)" class="to-setting-btn">${option[0]}</a></li>
              <li class="modal-btn"><a href="javascript:void(0)" class="logout-btn">${option[1]}</a></li>` : 
              `<li class="modal-btn"><a href="javascript:void(0)" class=${reportClass}>${option[0]}</a></li>`}
            </ul>
          </div>
          <div class="modal-layer"></div>
        `
        modal.innerHTML = modalHtml;
        app.append(modal);
          
        const logoutBtn = document.querySelector(".logout-btn");
        const reportPost= document.querySelector(".report-post");
        const reportComment= document.querySelector(".report-comment");

        if(logoutBtn) {
          logoutBtn.addEventListener("click", openCheckModal)
        }
        if(reportPost) {
          reportPost.addEventListener("click", openCheckModal);
        }
        if(reportComment) {
          reportComment.addEventListener("click", openCheckModal);
        }
      }
      commentEditBtn.forEach((btn) => {
        btn.addEventListener("click", openModal);
      })


    }

  })
  .catch(error => console.log('error', error));




 // 포스트 생성후 로컬 스토리지 삭제 (로그아웃 하거나, 뒤로가기 버튼누르면!)
  // localStorage.removeItem("clicked post");

// 취소 버튼 핸들링
const handleCancel = () => {
    const modal = document.querySelector(".modal");
    const modalCheck = document.querySelector(".modal-check");
    modal.remove();
    modalCheck.remove();
}

// 재확인 하는 모달
const openCheckModal = (event) => {
  console.log(event.target)
  const buttonClicked = event.target;
  const app = document.querySelector("#app");
  const checkModal = document.createElement("div"); 
  checkModal.classList.add("modal-check");
  let checkQuestion = "";
  let option = [];

  if(buttonClicked.classList.contains("logout-btn")) {
    checkQuestion = "로그아웃 하시겠어요?"
    option.push("취소");
    option.push("로그아웃");
  }
  if(buttonClicked.classList.contains("report-post")) {
    checkQuestion = "게시글을 신고하시겠어요?"
    option.push("취소");
    option.push("신고");
  }
   if(buttonClicked.classList.contains("report-comment")) {
    checkQuestion = "신고하시겠어요?"
    option.push("취소");
    option.push("신고");
  }

  let modalHtml = `
    <p>${checkQuestion}</p>
    <div class="check-btn">
      <a href="javascript:void(0)" class="cancel-btn">${option[0]}</a>
      <a href="javascript:void(0)" class="logout-final">${option[1]}</a>
    </div>
  `
  checkModal.innerHTML = modalHtml;
  app.append(checkModal)

  const cancelBtn = document.querySelector(".cancel-btn");
  cancelBtn.addEventListener("click", handleCancel)
}


// 버튼 클릭하면 나오는 첫 번째 모달 창
const openModal = (event) => {
  console.log(event.target)
  const buttonClicked = event.target;
  const app = document.querySelector("#app");
  const modal = document.createElement("div"); 
  modal.classList.add("modal")
  let option = [];
  let reportClass = ""

  if(buttonClicked.classList.contains("setting-logout-btn")) {
    option.push("설정 및 개인정보");
    option.push("로그아웃");
  }
  if(buttonClicked.classList.contains("post-edit-btn")) {
    option.push("신고");
    reportClass = "report-post";
  }
  if(buttonClicked.classList.contains("comment-edit-btn")) {
    option.push("신고하기")
    reportClass = "report-comment"
  }

  let modalHtml = `
    <div class="modal-content">
      <div class="btn-to-close"></div>
      <ul>
      ${ (option.length > 1) ? 
        `<li class="modal-btn"><a href="javascript:void(0)" class="to-setting-btn">${option[0]}</a></li>
        <li class="modal-btn"><a href="javascript:void(0)" class="logout-btn">${option[1]}</a></li>` : 
        `<li class="modal-btn"><a href="javascript:void(0)" class=${reportClass}>${option[0]}</a></li>`}
      </ul>
    </div>
    <div class="modal-layer"></div>
  `
  modal.innerHTML = modalHtml;
  app.append(modal);
    
  const logoutBtn = document.querySelector(".logout-btn");
  const reportPost= document.querySelector(".report-post");
  const reportComment= document.querySelector(".report-comment");

  if(logoutBtn) {
    logoutBtn.addEventListener("click", openCheckModal)
  }
  if(reportPost) {
    reportPost.addEventListener("click", openCheckModal);
  }
  if(reportComment) {
    reportComment.addEventListener("click", openCheckModal);
  }
}

settingBtn.addEventListener("click", openModal);
postEditBtn.addEventListener("click", openModal);
