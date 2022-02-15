function follow() {
    let btn_follow = document.querySelector(".follow-btn");
    if (btn_follow.innerText === '팔로우') {
        btn_follow.innerText = '취소';
    } else {
        btn_follow.innerText = '팔로우';
    }
}

const url = "http://146.56.183.55:5050";
const sessionAccountName = sessionStorage.getItem("pic_accountName");
const token = sessionStorage.getItem("pic_token");

const itemList = document.querySelector(".item-list");
const itemWrap = document.querySelector(".item-wrap");
const postImgWrap = document.querySelector(".post-img-wrap");
const postNav = document.querySelector(".post-nav");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + token);
myHeaders.append("Content-type", "application/json")
const requestOptions = {
    method: "GET",
    headers: myHeaders,
};

// 프로필 정보 넣기
fetch(url+"/profile/"+sessionAccountName, requestOptions)
    .then(res => res.json())
    .then(res => {
        const profile = res.profile;
        document.querySelector("#profile-img").setAttribute("src", url+"/"+profile.image);
        document.querySelector(".profile-name").innerHTML = profile.username;
        document.querySelector(".profile-id").innerHTML = '@' + profile.accountname;
        document.querySelector(".profile-info").innerHTML = profile.intro;
    }).catch(err => {
        console.log("fetch error", err);
    });

// 판매중인상품
fetch(url+"/product/"+sessionAccountName, requestOptions)
    .then(res => res.json())
    .then(res => {
        if (res.data != 0) {
            itemList.classList.remove("txt-hide");

            const product = res.product;
            let input = '';
            for (let i = 0; i < product.length; i++) {
                input += `
                    <div class="item-container">
                        <a href=""><img src="${product[i].itemImage}" alt="판매 중인 상품 사진"></a>
                        <p class="item-tit">${product[i].itemName}</p>
                        <p class="item-price">${product[i].price}</p>
                    </div>
                `
            }
            document.querySelector(".items").innerHTML = input;
        } else {
            itemList.classList.add("txt-hide");
            itemWrap.style.height = 0;
        }
    }).catch(err => {
        console.log("fetch error", err);
    });


// 게시글 목록형
const postsContainer = document.querySelector(".posts");
const postList = (hasLiked) => {
    fetch(url+"/post/"+sessionAccountName+"/userpost/?limit=100&skip=0", requestOptions)
        .then(res => res.json())
        .then(result => {
            // 포스트가 하나라도 있을 경우 
            // console.log(result)
            if(result.post.length >= 1) {
              if(hasLiked === undefined) {
                result.post.forEach((item) => {
                // console.log(item);
                const postItem = document.createElement("article");
                postItem.classList.add("post");
        
                // 포스트에 있는 유저 프로필 이미지
                let profilePic = item.author.image;
                if(!profilePic.includes("http")) {
                  profilePic = `${url}/${profilePic}`;
                }
                // ""들어간 string에서 ""제거
                const content = item.content.replaceAll(/^"|"$/g, ""); 
        
                // // 포스트 작성일
                const date = item.createdAt.slice(0,10);
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
                        <img src=${item.author.image === "" ? "../src/images/search/default_profile.png"
                        : `${profilePic}`} alt="user-profile-img">
                      </a>
                      <a href="javascript:void(0)" class="user">
                        <span class="user-name">${item.author.username}</span>
                        <span class="user-id">@${item.author.accountname}</span>
                      </a>
                      <button type="button" class="post-edit-btn">
                        <span class="txt-hide">더보기 버튼</span>
                      </button>
                    </nav>
                    <div class="post-content-container">
                      ${content ? `<p class="post-content-txt">${content}</p>` : ""}
                      ${item.image ? `<div class="post-content-img">  
                      <div class="img-slide-container">` : ""}
                `
        
            //     // 포스팅 이미지 불러오기
                const images = item.image;
        
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
                          <button type="button" id="likebtn" class=${item.hearted === true? "like-btn-on" : "default"}>
                            <span class="txt-hide">좋아요 버튼</span>
                          </button>
                          <span>${item.heartCount}</span>
                        </li>
                        <li class="comment">
                          <button type="button" class="comment-btn">
                            <span class="txt-hide">코멘트 버튼</span>
                          </button>
                          <span>${item.commentCount}</span>
                        </li>
                      </ul>
                      <p class="post-date">${year}년 ${month}월 ${day}일</p>
                    </div>
                  </section>
                `
                postItem.innerHTML = postHTML;
                postsContainer.append(postItem);
              })
            } 
            handleDomElement(postImgWrap, result);
          }   
        }).catch(err => {
            console.log("fetch error", err);
        });
}
postList();



let feedData;
function handleDomElement(domElements, feed) {
//   console.log(domElements)
//   console.log(feed)
  feedData = feed;
  console.log(feedData)
// 포스팅 이미지 슬라이드
const slideButtons = document.querySelectorAll(".slide-btn"); 
const handleImgSlider = (e) => {

  const currentBtn = e.target;
  const buttonsParent = e.target.parentNode; 
  const allButtons = buttonsParent.childNodes;
  let currentIndex;

  const findActiveBtn = (currentBtn) => {   
      for(let i=0; i < allButtons.length; i++) {
        if(buttonsParent.childNodes[i] === currentBtn) {
          currentIndex = i;  
          if(!currentBtn.classList.contains("active")){
            currentBtn.classList.add("active");
          }   
          if(!allButtons[i].classList.contains("active")) {
            allButtons[i].classList.add("active")
          }
        } else if(buttonsParent.childNodes[i] !== currentBtn) {
          if(allButtons[i].classList.contains("active")) {
            allButtons[i].classList.remove("active")
          }
        }
      } 
      const slider = buttonsParent.parentNode.querySelector(".img-slide-container");
      slider.style.transform = `translateX(-${304 * currentIndex}px)`;
    }
    findActiveBtn(currentBtn);
    const slider = buttonsParent.parentNode.querySelector(".img-slide-container");
    slider.style.transform = `translateX(-${304 * currentIndex}px)`;
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
    clickedPost = feed.post[index];
    // console.log(clickedPost)
    // 코멘트버튼 클릭한 해당포스트 정보 로컬스토리지에 저장
    localStorage.setItem("clicked-post-id", clickedPost.id)
    localStorage.setItem("clicked-post", JSON.stringify(clickedPost))
  };   
  commentButtons.forEach((btn) => {
    btn.addEventListener("click", goToPostDetail)
  });

  const postEditBtn = document.querySelectorAll(".post-edit-btn")
  postEditBtn.forEach((button) => {
    button.addEventListener("click", openModal)
  })
}

// 라이크 핸들링
const app = document.querySelector("#app");
const handleLikeClick = (event) => {
  const clickedBtn = event.target;
  if(clickedBtn.id === "likebtn") {
    applyLike(clickedBtn);
  }
}
app.addEventListener("click", handleLikeClick)

// 클릭시 좋아요 및 좋아요 취소
const applyLike = (clickedBtn) => {
  // console.log(feedData)
  // console.log(clickedBtn)
  const likeButtons = document.querySelectorAll("#likebtn");
  const index = [...likeButtons].indexOf(clickedBtn);
  clickedPost = feedData.post[index];
  // console.log(clickedPost)
  const postId = clickedPost.id;
  const likeCountElement = clickedBtn.nextElementSibling;
  let count = parseInt(likeCountElement.textContent);

  if(clickedPost.hearted === true) {
    // 이미 좋아요 한 경우에는 좋아요 - (취소)
    const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch(`${url}/post/${postId}/unheart`, requestOptions)
    .then(response => response.json())
    .then(result => {
      count -= 1;
      likeCountElement.textContent = count;
      clickedBtn.classList.remove("like-btn-on");
      clickedBtn.classList.add("default");
      if(clickedBtn.classList.contains("like-active")) {
        clickedBtn.classList.remove("like-active");
      }
      localStorage.setItem("clicked-post", JSON.stringify(result.post));
      // 좋아요 적용 후 피드 정보 새로 불러오기 (새로 불러와야 댓글 페이지에도 적용됨)
      // console.log(result)
      const hasLiked = result.post.hearted;
      console.log(hasLiked)
      postList(hasLiked);
      
    })
    .catch(error => console.log('error', error));
  } else if(clickedPost.hearted !== true) {
    // 좋아요 안한 경우 좋아요 +
    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch(`${url}/post/${postId}/heart`, requestOptions)
  .then(response => response.json())
  .then(result => {
    count += 1;
    likeCountElement.textContent = count;
    clickedBtn.classList.remove("default");
    clickedBtn.classList.add("like-btn-on");
    clickedBtn.classList.add("like-active"); // 클릭시 애니메이션 위해 추가(새로 피드 렌더링 되면 없어짐)
    localStorage.setItem("clicked-post", JSON.stringify(result.post));
    const hasLiked = result.post.hearted;
    console.log(hasLiked)
    postList(hasLiked);

  })
  .catch(error => console.log('error', error));
  }
}




//게시글 앨범형
const postAlbum = () => {
    fetch(url+"/post/"+sessionAccountName+"/userpost/?limit=100&skip=0", requestOptions)
        .then(res => res.json())
        .then(res => {
            const post = res.post;
            let input = '';
            if (post.length > 0) {
                for (let i = 0; i < post.length; i++) {
                    const firstImage = post[i].image.split(',')[0];
                    input +=
                    `
                        <img src="http://146.56.183.55:5050/${firstImage}" alt="게시글 첫번째 사진" class="post-img-list">
                    `
                }
                document.querySelector(".posts").innerHTML = input;
            } else {
                postNav.classList.add("txt-hide");
                postImgWrap.style.height = 0;
                postImgWrap.style.padding = 0;
            }
        }).catch(err => {
            console.log("fetch error", err);
        });
}



// 게시물 삭제
const handleDeletePost = () => {
    const postId = feedData.post[postToDeleteOrEdit].id;

    //API에서 해당 게시물 삭제
    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${url}/post/${postId}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        const modal = document.querySelector(".modal");
        const modalCheck = document.querySelector(".modal-check");
        modal.remove();
        modalCheck.remove();
        // 삭제 적용 후 포스트 피드 다시 불러오고 새로고침
        postList();
        location.href = "./mypage.html";
        
    })
    .catch(error => console.log('error', error));
}




// 게시물 수정
const handleEditPost = () => {
    // 클릭된 포스트 아이디
    const postId = feedData.post[postToDeleteOrEdit].id;

    // 여기에 게시물 수정할 코드 작성 하시면 될 것 같습니다.
    // 수정에 성공하면 아래 코드를 입력해 해당 모달 창을 삭제하면 모달 창이 닫힙니다.
    const modal = document.querySelector(".modal");
    modal.remove();

    // 그리고 수정 후 포스트 피드 다시 불러와서 새로고침 해주시면 될 것 같습니다.
    // 위 게시물 삭제 코드 참고해주세요
    postList();
    location.href = "./mypage.html";
}