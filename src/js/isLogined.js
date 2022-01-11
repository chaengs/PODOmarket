const isLogined = sessionStorage.pic_isLogined;

// 로그인, 회원가입 등의 페이지에 로그인 상태로 접근할 경우 splash로 이동
if (isLogined) {
  location.href = "./index.html";
}
