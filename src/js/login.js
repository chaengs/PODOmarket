let email = document.querySelector("#email");
let pwd = document.querySelector("#pwd");

const handleCheckInput = () => {
  if (!!email.value && !!pwd.value && checkEmailFormet()) {
    submitBtn.removeAttribute("disabled");
    submitBtn.className = "btn_submit activate";
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.className = "btn_submit";
  }
};

const checkEmailFormet = () => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regExp.test(email.value);
};

email.addEventListener("input", handleCheckInput);
pwd.addEventListener("input", handleCheckInput);
