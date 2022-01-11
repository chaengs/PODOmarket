const isLogined = sessionStorage.pic_isLogined;
if (isLogined) {
  setTimeout("location.href='./feed.html'", 2000);
} else {
  setTimeout("location.href='./login.html'", 2000);
}
