const url = "http://146.56.183.55:5050";
const token = sessionStorage.getItem("pic_token");
const clickedPost = localStorage.getItem("clicked-post");
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
              <img src=${postInfo.author.image === "" ? "../src/images/search/default_profile.png"
              : `${url}/${postInfo.author.image}`} alt="user-profile-img">
            </a>
            <a href="javascript:void(0)" class="user">
              <span class="user-name">${postInfo.author.username}</span>
              <span class="user-id">@${postInfo.author.accountname}</span>
            </a>
            <button type="button" class="post-edit-btn">
              <span class="txt-hide">더보기 버튼</span>
            </button>
          </nav>
          <div class="post-content-container">
            ${postInfo.content ? `<p class="post-content-txt">${postInfo.content}</p>` : ""}
            ${ postInfo.image? `<div class="post-content-img">  
            <div class="img-slide-container">` : ""}
      `

    // 포스팅 이미지 불러오기
        const images = postInfo.image;
        // 이미지가 있는 경우
        if(images) {
          const imgArr = images.split(",");
          let imgCount = imgArr.length;
          // console.log(imgCount)        
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
                  <button type="button" class="default">
                    <span class="txt-hide">좋아요 버튼</span>
                  </button>
                  <span>${postInfo.heartCount}</span>
                </li>
                <li class="comment">
                  <button type="button" class="comment-btn">
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
}

displayClickedPost(postInfo);


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



// 이벤트 위임 - 상위요소에 이벤트를 주면 하위요소까지 다 선택 가능!
const app = document.querySelector("#app");

// 모달 버튼들 핸들링
let commentEditClickedIndex;
const handleDomClick = (event) => {
  const clickedBtn = event.target;
  if(clickedBtn.classList.contains("setting-logout-btn")){
    openModal(clickedBtn);
  } else if(clickedBtn.classList.contains("post-edit-btn")){
    openModal(clickedBtn);
  } else if(clickedBtn.classList.contains("comment-edit-btn")) {   
    openModal(clickedBtn);
    const buttons = document.querySelectorAll(".comment-edit-btn");
    const index = [...buttons].indexOf(clickedBtn)
    commentEditClickedIndex = index;
  }
}
app.addEventListener("click", handleDomClick)


// API로 코멘트 불러오기 (코멘트 리스트)
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

let commentHTML;
const getComments = () => {
fetch(`${url}/post/${postInfo.id}/comments`, {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  })
  .then(response => response.json())
  .then(result => {
    // api에서 코멘트 정보 가져와서 화면에 코멘트 요소 생성
      result.comments.forEach((commentItem) => {
        const commentContainer = document.querySelector(".comments-container");
        const comment =  document.createElement("article");
        comment.classList.add("comment-container");
        commentHTML = `
          <h2 class="txt-hide">코멘트</h2>
          <div class="user-info-container">
            <!-- 유저 프로필 이미지 -->
            <a href="">
              <img src="${url}/${commentItem.author.image}" alt="user-profile-picture" />
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
      return result;
    // }
  })
  .then((result) => {
    let commentCount = result.comments.length;
    // 댓글이 1개 이상인 경우 (새로 추가되면)
    let commentsList = result.comments;
    if(commentCount > 1) {
      // 댓글생성일 기준으로 정렬
      commentsList.sort((a,b) => a.createdAt.localeCompare(b.createdAt))
    }
    return commentsList;
  })
  .then((result) => {
    const existingComment = document.querySelectorAll(".comments-container > article")
    // 기존 댓글들 삭제하고 다시 생성 해야 여러개 복제 안됨
    existingComment.forEach((comment) => {
      comment.remove();
    })
    // 댓글 화면에 디스플레이
    result.forEach((commentItem) => {
    // console.log(commentItem)
    const commentContainer = document.querySelector(".comments-container");
    const comment =  document.createElement("article");
    comment.classList.add("comment-container");
    commentHTML = `
      <h2 class="txt-hide">코멘트</h2>
      <div class="user-info-container">
        <!-- 유저 프로필 이미지 -->
        <a href="">
          <img src="${url}/${commentItem.author.image}" alt="user-profile-picture" />
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

    const commentBtn = document.querySelector(".comment-btn");
    const commentNum = commentBtn.nextElementSibling;
    commentNum.textContent = result.length;
  })
  })
  .catch(error => console.log('error', error));

}

getComments();


// 댓글 작성 
const commentInput = document.querySelector("#comment-txt");
const submitBtn = document.querySelector(".comment-submit-btn");
let newComment;

const getCommentInput = (event) => {
  const { value } = event.target;
  newComment = value;
}
 
const writeNewComment = () => {
  const raw = JSON.stringify({
    "comment": {
      "content": `${newComment}`
    }
  });
  fetch(`${url}/post/${postInfo.id}/comments`, {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
    .then(response => response.text())
    .then(result => {
      // console.log(result)
      getComments();
      commentInput.value = "";
    })
    .catch(error => console.log('error', error));
}

commentInput.addEventListener("keyup", getCommentInput);
submitBtn.addEventListener("click", writeNewComment);






////////////// 모달 모음

// 모달 신고버튼 핸들링 (댓글 신고)
const handleReportComment = () => {
  const postId = postInfo.id;
  const comments = postInfo.comments;
  const commentId = [...comments][commentEditClickedIndex]

  fetch(`${url}/post/${postId}/comments/${commentId}/report`, {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  })
    .then(response => response.text())
    .then(result => {
      const modal = document.querySelector(".modal");
      const modalCheck = document.querySelector(".modal-check");
      modal.remove();
      modalCheck.remove();
      alert("해당 댓글을 신고 하였습니다.")
    })
    .catch(error => console.log('error', error));
}

// 모달 신고버튼 핸들링 (게시글 신고)
const handleReportPost = () => {
  const postId = postInfo.id;
  //신고
  fetch(`${url}/post/${postId}/report`, {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  })
  .then(response => response.json())
  .then(result => {
    const modal = document.querySelector(".modal");
    const modalCheck = document.querySelector(".modal-check");
    modal.remove();
    modalCheck.remove();
    alert("해당 게시물을 신고 하였습니다.")
  })
  .catch(error => console.log('error', error));
}

// 셋팅(사용자 정보 수정) 페이지로 이동
const goToSetting = () => {
  location.href = "./profile_modification.html";
  const modal = document.querySelector(".modal");
  const modalCheck = document.querySelector(".modal-check");
  modal.remove();
  modalCheck.remove();
}

// 로그아웃 핸들링
const handleLogout = () => {
  sessionStorage.removeItem("pic_isLogined");
  sessionStorage.removeItem("pic_token");
  sessionStorage.removeItem("pic_accountName");
  sessionStorage.removeItem("pic_userName");
  sessionStorage.removeItem("pic_userImg");
  location.href = "./login.html";

  const modal = document.querySelector(".modal");
  const modalCheck = document.querySelector(".modal-check");
  modal.remove();
  modalCheck.remove();
}

// 취소 버튼 핸들링
const handleCancel = () => {
    const modal = document.querySelector(".modal");
    const modalCheck = document.querySelector(".modal-check");
    modal.remove();
    modalCheck.remove();
}

// 재확인 하는 모달
const openCheckModal = (event) => {
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
  if(buttonClicked.classList.contains("delete-btn")){
    checkQuestion = "게시글을 삭제할까요?"
    option.push("취소");
    option.push("삭제");
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
      <a href="javascript:void(0)" class="cancel-btn">${option[0]}</a>`

  if(option[1] === "신고") {
    if(checkQuestion === "게시글을 신고하시겠어요?") {
      modalHtml += `<a href="javascript:void(0)" class="report-post-final">${option[1]}</a>`
    } else if(checkQuestion = "신고하시겠어요?") {
      modalHtml += `<a href="javascript:void(0)" class="report-comment-final">${option[1]}</a>`
    }
  } else if(option[1] === "삭제") {
    modalHtml += `<a href="javascript:void(0)" class="delete-final">${option[1]}</a>`
  } else if(option[1] === "로그아웃") {
    modalHtml += `<a href="javascript:void(0)" class="logout-final">${option[1]}</a>`
  }

  modalHtml += `</div>`

  checkModal.innerHTML = modalHtml;
  app.append(checkModal)

  const cancelBtn = document.querySelector(".cancel-btn");
  if(cancelBtn) {
    cancelBtn.addEventListener("click", handleCancel);
  }
  const logoutFinalBtn = document.querySelector(".logout-final");
  if(logoutFinalBtn) {
    logoutFinalBtn.addEventListener("click", handleLogout);
  }
  const reportPostBtn = document.querySelector(".report-post-final");
  if(reportPostBtn) {
    reportPostBtn.addEventListener("click", handleReportPost);
  }
  const reportCommentBtn = document.querySelector(".report-comment-final");
  if(reportCommentBtn) {
    reportCommentBtn.addEventListener("click", handleReportComment);
  }
}

// 버튼 클릭하면 나오는 첫 번째 모달 창
const openModal = (clickedBtn) => {
  // console.log(clickedBtn)
  const buttonClicked = clickedBtn;
  const app = document.querySelector("#app");
  const modal = document.createElement("div"); 
  modal.classList.add("modal")
  let option = [];
  let classToAdd = ""
  let isMyPost = false;

  if(buttonClicked.classList.contains("setting-logout-btn")) {
    option.push("설정 및 개인정보");
    option.push("로그아웃");
  }
  if(buttonClicked.classList.contains("post-edit-btn")) {   
    if(!isMyPost) {
      option.push("신고");
      classToAdd = "report-post";
    } else {
      option.push("수정");
      option.push("삭제");
      classToAdd = "report-post";
    }
  } 
  if(buttonClicked.classList.contains("comment-edit-btn")) {
    option.push("신고하기")
    classToAdd = "report-comment"
  }
  if(buttonClicked.classList.contains("delete-btn")) {
    option.push("삭제")
    classToAdd = "delete"
  }

  let modalHtml = `
    <div class="modal-content">
      <div class="btn-to-close"></div>
      <ul>
      ${ (option.length > 1) ? 
        `<li class="modal-btn"><a href="javascript:void(0)" class="to-setting-btn">${option[0]}</a></li>
        <li class="modal-btn"><a href="javascript:void(0)" class="logout-btn">${option[1]}</a></li>` : 
        `<li class="modal-btn"><a href="javascript:void(0)" class=${classToAdd}>${option[0]}</a></li>`}
      </ul>
    </div>
    <div class="modal-layer"></div>
  `
  modal.innerHTML = modalHtml;
  app.append(modal);
    
  const logoutBtn = document.querySelector(".logout-btn");
  const reportPost= document.querySelector(".report-post");
  const reportComment= document.querySelector(".report-comment");
  const deleteBtn = document.querySelector(".delete-btn");


  if(logoutBtn) {
    logoutBtn.addEventListener("click", openCheckModal);
  }
  if(reportPost) {
    reportPost.addEventListener("click", openCheckModal);
  }
  if(reportComment) {
    reportComment.addEventListener("click", openCheckModal);
  }
  if(deleteBtn) {
    deleteBtn.addEventListener("click", openCheckModal);
  }

  // 게시글 수정버튼 클릭시 수정페이지로 이동
  const editBtn = document.querySelector(".edit-btn");
  if(editBtn) {
    // 
  }
  // 셋팅(정보수정) 버튼 클릭시 수정페이지로 이동
  const toSettingBtn = document.querySelector(".to-setting-btn");
  if(toSettingBtn) {
    toSettingBtn.addEventListener("click", goToSetting);
  }
  
  // 모달 레이어(백그라운드) 클릭하면 모달창 닫힘
  const closeModal = () => {
    const modalCheck = document.querySelector(".modal-check");
    const modalContent = document.querySelector(".modal-content");
    const modal = document.querySelector(".modal");
    if (!modalCheck) {    
      modal.classList.add("hidden");
      modalContent.classList.add("hidden");
    }
    modal.remove();
  }
  const modalLayer = document.querySelector(".modal-layer");
  modalLayer.addEventListener("click", closeModal);
}