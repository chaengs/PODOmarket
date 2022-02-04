const accountName = sessionStorage.getItem("pic_accountName");
const currentPost = localStorage.getItem("clicked-post"); 
const postInfo = JSON.parse(currentPost);
const settingLogoutBtn = document.querySelector(".setting-logout-btn");
const modal = document.querySelector(".modal");


// 셋팅(사용자 정보 수정) 페이지로 이동
const goToSetting = () => {
  // console.log("세팅페이지로가기")
  location.href = "./profile_modification.html";
  // const modal = document.querySelector(".modal");
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
  
  //댓글 신고
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
  const deletePostBtn = document.querySelector(".delete-final");

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
  // 게시글 삭제버튼 클릭시 게시물 삭제
  if(deletePostBtn) {
    deletePostBtn.addEventListener("click", handleDeletePost);
  }
}

// 버튼 클릭하면 나오는 첫 번째 모달 창
let postToDeleteOrEdit;
const openModal = (event) => {
  const buttonClicked = event.target;
  const app = document.querySelector("#app");
  const modal = document.createElement("div"); 
  modal.classList.add("modal")

  const previousElement = event.target.previousElementSibling; 
  const currentPostUserIdEl = previousElement.querySelector(".user-id");

  let option = [];
  let classToAdd = ""
  let classesToAdd = [];
  let isMyPost = false;

  if(buttonClicked.classList.contains("setting-logout-btn")) {
    option.push("설정 및 개인정보");
    option.push("로그아웃");
  }
  if(currentPostUserIdEl) {
    const currentPostUserId = currentPostUserIdEl.textContent.split("@")[1];
    const postEditBtn = document.querySelectorAll(".post-edit-btn");
    postToDeleteOrEdit = [...postEditBtn].indexOf(buttonClicked); //index of post
    if(accountName === currentPostUserId) {
      isMyPost = true;
    }
  }

  if(buttonClicked.classList.contains("post-edit-btn")) {   
    if(!isMyPost) {
      option.push("신고");
      classToAdd = "report-post";
    } else {
      option.push("삭제");
      option.push("수정");
      classesToAdd.push("delete-btn")
      classesToAdd.push("edit-post");
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
      ${ (option.length > 1) ? option[0] === "설정 및 개인정보" ?
        `<li class="modal-btn"><a href="javascript:void(0)" class="to-setting-btn">${option[0]}</a></li>
        <li class="modal-btn"><a href="javascript:void(0)" class="logout-btn">${option[1]}</a></li>` : 
        `<li class="modal-btn"><a href="javascript:void(0)" class=${classesToAdd[0]}>${option[0]}</a></li>
        <li class="modal-btn"><a href="javascript:void(0)" class=${classesToAdd[1]}>${option[1]}</a></li>` : 
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
  const editPost = document.querySelector(".edit-post");
  const deletePost = document.querySelector(".delete-post");

  
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
  if(editPost) {
    editPost.addEventListener("click", handleEditPost);
  }
  if(deletePost) {
    deletePost.addEventListener("click", openCheckModal);
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

// 세팅&로그아웃 버튼 핸들링
settingLogoutBtn.addEventListener("click", openModal);

