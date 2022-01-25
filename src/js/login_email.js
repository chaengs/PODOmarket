// login flag
const isLogined = sessionStorage.pic_isLogined;

// 로그인, 회원가입 등의 페이지에 로그인 상태로 접근할 경우 splash로 이동
if (isLogined) {
  location.href = "./index.html";
}
// querySelector
const email = document.querySelector("#email");
const pwd = document.querySelector("#pwd");
const err_msg = document.querySelector("#emailError");

// email 정규표현식 test
const checkEmailFormet = () => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regExp.test(email.value);
};

// input list의 value를 확인하여 로그인 버튼 활성화/비활성화
const handleCheckInput = () => {
  // email과 pwd를 입력했고 eamil 형식이 부합할 경우 button 활성화
  if (!!email.value && !!pwd.value && checkEmailFormet()) {
    submitBtn.removeAttribute("disabled");
    submitBtn.className = "btn_submit activate";
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.className = "btn_submit";
  }
};

// 버튼이 활성화되면 버튼에 생기는 onClick event
const handleOnSubmit = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    user: {
      email: email.value,
      password: pwd.value,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://146.56.183.55:5050/user/login", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // 로그인에 실패하면 message가 들어있고 성공하면 없다.
      if (result.message) {
        err_msg.innerHTML = "*" + result.message;
      } else {
        err_msg.innerHTML = "";
        //로그인에 성공하면 토큰 포함 유저 정보를 세션에 넣는다.
        sessionStorage.setItem("pic_isLogined", true);
        sessionStorage.setItem("pic_token", result.user.token);
        sessionStorage.setItem("pic_accountName", result.user.accountname);
        sessionStorage.setItem("pic_userName", result.user.username);
        sessionStorage.setItem("pic_userId", result.user._id);
        sessionStorage.setItem("pic_userImg", result.user.image);
        location.href = "./index.html";
      }
    })
    .catch((error) => console.log("error", error));
};

// input을 감시하여 checkInput 함수 실행
email.addEventListener("input", handleCheckInput);
pwd.addEventListener("input", handleCheckInput);
