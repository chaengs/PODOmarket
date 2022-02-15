const goBack = () => {
    window.history.back();
}
const btnBack = document.querySelector(".btn-back");
btnBack.addEventListener("click", goBack);

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
btnHome.addEventListener("click", goBack);
const btnChat = document.querySelector(".chat-btn");
btnChat.addEventListener("click", goChat);
const btnUpload = document.querySelector(".upload-btn");
btnUpload.addEventListener("click", goUpload);
const btnProfile = document.querySelector(".profile-btn");
btnProfile.addEventListener("click", goProfile);