const isLogined = sessionStorage.pic_isLogined;

// 로그인, 회원가입 등의 페이지에 로그인 상태로 접근할 경우 splash로 이동
if (isLogined) {
  location.href = "./index.html";
}

//querySelector
const email = document.querySelector("#email");
const pwd = document.querySelector("#pwd");
const email_err_msg = document.querySelector("#email_err_msg");
const pwd_err_msg = document.querySelector("#pwd_err_msg");
const submitBtn = document.querySelector(".btn_submit");
// email check flag
let emailCheck = false;

// email이 중복되었는지 서버에 value를 보내 확인
const checkEmailValid = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    user: {
      email: email.value,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://146.56.183.55:5050/user/emailvalid", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const trueCase = "사용 가능한 이메일 입니다.";
      if (result.message === trueCase) {
        email_err_msg.innerHTML = "";
        emailCheck = true;
      } else {
        email_err_msg.innerHTML = "*" + result.message;
        emailCheck = false;
      }
    })
    .catch((error) => console.log("error", error));
};

// Email 정규표현식 test
const checkEmailFormet = () => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regExp.test(email.value);
};

// Email 정규표현식 test를 통과하면 중복검사를 실시한다.
const handleChaeckEmail = () => {
  if (checkEmailFormet()) {
    email_err_msg.innerHTML = "";
    checkEmailValid();
  } else {
    emailCheck = false;
    email_err_msg.innerHTML = "*올바르지 않은 이메일 형식입니다.";
  }
};

// 비밀번호 length가 유효범위인지 확인
const CheckPwdLength = () => (pwd.value.length > 5 ? true : false);

// 비밀번호 유효범위 여부에 따른 msg 출력
const handleCheckPwdLength = () => {
  if (CheckPwdLength()) {
    pwd_err_msg.innerHTML = "";
  } else {
    pwd_err_msg.innerHTML = "*비밀번호는 6자 이상이어야 합니다.";
  }
};

// submit 버튼을 활성화 시키기 위한 조건 확인
const handleCheckInput = () => {
  function to() {
    // 유효성 검사를 모두 통과하면 button을 활성화 시킨다.
    if (!!email.value && !!pwd.value && CheckPwdLength() && emailCheck) {
      submitBtn.removeAttribute("disabled");
      submitBtn.className = "btn_submit activate";
    } else {
      submitBtn.setAttribute("disabled", true);
      submitBtn.className = "btn_submit";
    }
  }
  // email check fetch 함수의 비동기 처리때문에 setTimeout으로 .1s 후 실행
  setTimeout(to, 100);
};

// 버튼이 활성화되면 버튼에 생기는 onClick event
const handleOnSubmit = () => {
  let date = new Date();
  // expire = 10분
  date.setTime(date.getTime() + 10 * 60 * 1000);
  // 로그인 페이지는 2페이지이기 때문에 expire 10분짜리 쿠키에 정보를 가지고 다음페이지로 보낸다.
  document.cookie = `EMAIL=${email.value};expires=${date.toUTCString()};`;
  document.cookie = `PWD=${pwd.value};expires=${date.toUTCString()};`;
  location.href = "./join_profile.html";
};

// input list의 blur,input event를 감시하여 버튼 활성화/비활성화
email.addEventListener("blur", handleChaeckEmail);
email.addEventListener("blur", handleCheckInput);
email.addEventListener("input", handleCheckInput);

pwd.addEventListener("blur", handleCheckPwdLength);
pwd.addEventListener("blur", handleCheckInput);
pwd.addEventListener("input", handleCheckInput);
