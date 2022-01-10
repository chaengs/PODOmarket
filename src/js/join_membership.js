let email = document.querySelector("#email");
let pwd = document.querySelector("#pwd");
let email_err_msg = document.querySelector("#email_err_msg");
let pwd_err_msg = document.querySelector("#pwd_err_msg");
let submitBtn = document.querySelector(".btn_submit");
let emailCheck = false;
let pwdCheck = false;

// 중복된 email인지 확인
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
      const case1 = "이미 가입된 이메일 주소 입니다.";
      const case2 = "사용 가능한 이메일 입니다.";
      const case3 = "잘못된 접근입니다.";
      console.log(result);
      if (result.message === case1) {
        email_err_msg.innerHTML = "*" + case1;
        emailCheck = false;
      } else if (result.message == case2) {
        email_err_msg.innerHTML = "";
        emailCheck = true;
      } else {
        email_err_msg.innerHTML = "*" + case3;
        emailCheck = false;
      }
    })
    .catch((error) => console.log("error", error));
};
// Email 형식 확인
const checkEmailFormet = () => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regExp.test(email.value);
};

const handleChaeckEmail = () => {
  checkEmailFormet();
  if (checkEmailFormet()) {
    email_err_msg.innerHTML = "";
    checkEmailValid();
  } else {
    emailCheck = false;
    email_err_msg.innerHTML = "*올바르지 않은 이메일 형식입니다.";
  }
};

const handleCheckPwdLength = () => {
  if (pwd.value.length < 6) {
    pwd_err_msg.innerHTML = "*비밀번호는 6자 이상이어야 합니다.";
  } else {
    pwd_err_msg.innerHTML = "";
  }
};

const handleCheckInput = () => {
  if (pwd.value.length < 6) {
    pwdCheck = false;
  } else {
    pwdCheck = true;
  }
  function to() {
    if (!!email.value && !!pwd.value && pwdCheck && emailCheck) {
      submitBtn.removeAttribute("disabled");
      submitBtn.className = "btn_submit activate";
    } else {
      submitBtn.setAttribute("disabled", true);
      submitBtn.className = "btn_submit";
    }
  }
  setTimeout(to, 100);
};

const handleOnSubmit = () => {
  let date = new Date();
  // expire = 10분
  date.setTime(date.getTime() + 10 * 60 * 1000);
  document.cookie = `EMAIL=${email.value};expires=${date.toUTCString()};`;
  document.cookie = `PWD=${pwd.value};expires=${date.toUTCString()};`;
  location.href = "./join_profile.html";
};

email.addEventListener("blur", handleChaeckEmail);
email.addEventListener("blur", handleCheckInput);
email.addEventListener("input", handleCheckInput);
pwd.addEventListener("blur", handleCheckPwdLength);
pwd.addEventListener("blur", handleCheckInput);
pwd.addEventListener("input", handleCheckInput);
