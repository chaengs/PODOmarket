const app = document.querySelector("#app");
const userId = sessionStorage.getItem("pic_userId");
let commentsListArr = [];

// 모달 버튼들 핸들링
let commentClickedIndex;
let isMyComment = false;

const handleDomClick = (event) => {
const clickedBtn = event.target;
console.log(clickedBtn);
if(clickedBtn.classList.contains("setting-logout-btn")){
    openModal(clickedBtn);
} else if(clickedBtn.classList.contains("post-edit-btn")){
    openModal(clickedBtn);
     // 게시글이 내 게시글인 경우 '수정/삭제' 띄우기
    const buttons = document.querySelectorAll(".post-edit-btn");
    const index = [...buttons].indexOf(clickedBtn)
    postClickedIndex = index;
    postAuthorId = commentsListArr[index].author._id;
    if(postAuthorId === userId) {
    isMyPost = true;
    openModal(clickedBtn);
    } else {
    isMyPost = false;
    openModal(clickedBtn);
    }
} else if(clickedBtn.classList.contains("comment-edit-btn")) {   
    const buttons = document.querySelectorAll(".comment-edit-btn");
    const index = [...buttons].indexOf(clickedBtn)
    commentClickedIndex = index;
    commentAuthorId = commentsListArr[index].author._id;
    // 클릭한 댓글이 내가 쓴 댓글인 경우
    if(commentAuthorId === userId) {
    isMyComment = true;
    openModal(clickedBtn);
    } else {
    isMyComment = false;
    openModal(clickedBtn);
    }
}
}
app.addEventListener("click", handleDomClick)

// 셋팅(사용자 정보 수정) 페이지로 이동
const goToSetting = () => {
    console.log("세팅페이지로가기")
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
    // 필요하면 추가하세요
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