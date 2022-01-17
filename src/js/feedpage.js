const searchBtn = document.querySelector(".search-btn");
const commentButtons = document.querySelectorAll(".comment-btn");

const postEditBtn = document.querySelectorAll(".post-edit-btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const deletePostBtn = document.querySelector(".delete-btn");
const modalCheck = document.querySelector(".modal-check");
const cancelBtn = document.querySelector(".cancel-btn");
const finalDeleteBtn = document.querySelector(".delete-btn-final");

const modalLayer = document.querySelector(".modal-layer");


// API 에서 팔로우 하고 있는 사람들의 피드 불러오기
const url = "http://146.56.183.55:5050";
const token = sessionStorage.getItem("pic_token");
const feedContainer = document.querySelector("#feed-container");

const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://146.56.183.55:5050/post/feed/?limmit=100", requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log(result.posts)
    if(result) {
      result.posts.forEach((post) => {     
        const postItem = document.createElement("article");
        postItem.classList.add("post");
        // 포스트에 있는 유저 프로필 이미지
        let profilePic = post.author.image;
        if(!profilePic.includes("http")) {
          profilePic = `http://146.56.183.55:5050/${profilePic}`;
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
              <p class="post-content-txt">${content}</p>
              <div class="post-content-img">
              <div class="img-slide-container">`

         // 포스팅 이미지 불러오기
        const images = post.image;
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
          postHTML +=`</div>`
          }
        }

        postHTML += `
        </div>
        <ul class="like-comment-container">
                <li class="like">
                  <button type="button" class="default">
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


        // 포스팅 상세 버튼 클릭
        const postEditBtn = document.querySelectorAll(".post-edit-btn");
        postEditBtn.forEach((button) => {
          button.addEventListener("click", openModal)
        })
      })

      if (!result) { 
        // 팔로잉 하는 사람이 없을 경우 피드 첫화면으로
       location.href = "./feed.html";
      }

    }
  })
  .catch(error => console.log('error', error))
  //  에러여도 feed.html에 있게 하기 ///
  









const handleModal = () => {
  let isModalClicked = true;
  if(isModalClicked) {
    modal.classList.toggle("hidden");
    modalContent.classList.toggle("hidden");
  }
}
const openModal = () => {
  modal.classList.toggle("hidden");
  modalContent.classList.toggle("hidden");
}

const handleDelete = () => {
  modalCheck.classList.toggle("hidden");
  modalContent.classList.toggle("hidden")
}

const handleCancel = () => {
  modalCheck.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}

const handleFinalDelete = () => {
  modalCheck.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}

const openSearch = () => {
  location.href = "search.html"
}

const closeModal = () => {
  if (modalCheck.classList.contains("hidden")) {
    modal.classList.add("hidden")
    modalContent.classList.add("hidden");
  } 
}

const goToPostDetail = () => {
  location.href = "./postDetail.html";
};

postEditBtn.forEach((button) => {
  button.addEventListener("click", openModal)
})


deletePostBtn.addEventListener("click", handleDelete)
cancelBtn.addEventListener("click", handleCancel);
finalDeleteBtn.addEventListener("click", handleFinalDelete)

searchBtn.addEventListener("click", openSearch)

commentButtons.forEach((btn) => {
  btn.addEventListener("click", goToPostDetail)
});


modalLayer.addEventListener("click", closeModal);