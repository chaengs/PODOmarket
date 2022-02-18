// 뒤로가기
const goBack = () => {
    window.history.back();
}
document.querySelector(".btn-back").addEventListener("click", goBack);

// 독바 아이콘 이동
const goHome = () => {
    location.href = "feed.html";
}
const goChat = () => {
    location.href = "chat_list.html";
}
const goUpload = () => {
    location.href = "upload.html";
}
const goProfile = () => {
    location.href = "mypage.html";
}
const btnHome = document.querySelector(".home-btn");
btnHome.addEventListener("click", goHome);
const btnChat = document.querySelector(".chat-btn");
btnChat.addEventListener("click", goChat);
const btnUpload = document.querySelector(".upload-btn");
btnUpload.addEventListener("click", goUpload);
const btnProfile = document.querySelector(".profile-btn");
btnProfile.addEventListener("click", goProfile);