const settingBtn = document.querySelector(".setting-logout-btn");
const postEditBtn = document.querySelector(".post-edit-btn");
const commentEditBtn = document.querySelector(".comment-edit-btn");


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
commentEditBtn.addEventListener("click", openModal);