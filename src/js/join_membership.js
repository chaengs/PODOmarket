let email = document.querySelector("#email");
let pwd = document.querySelector("#pwd");
let pwd_err_msg = document.querySelector(".err_msg");
let submitBtn = document.querySelector(".btn_submit");
let isChecked = false;

const handleChaeckEmail = () => {
  console.log("구현 예정 ....");
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
    isChecked = false;
  } else {
    isChecked = true;
  }
  if (!!email.value && !!pwd.value && isChecked) {
    submitBtn.removeAttribute("disabled");
    submitBtn.className = "btn_submit activate";
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.className = "btn_submit";
  }
};

email.addEventListener("blur", handleChaeckEmail);
email.addEventListener("input", handleCheckInput);
pwd.addEventListener("blur", handleCheckPwdLength);
pwd.addEventListener("input", handleCheckInput);
