let email = document.querySelector("#email");
let pwd = document.querySelector("#pwd");
let err_msg = document.querySelector("#emailError");

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
      if (result.message) {
        err_msg.innerHTML = "*" + result.message;
      } else {
        err_msg.innerHTML = "";
        sessionStorage.setItem("pic_isLogined", true);
        sessionStorage.setItem("pic_token", result.user.token);
        sessionStorage.setItem("pic_accountName", result.user.accountname);
        sessionStorage.setItem("pic_userName", result.user.username);
        sessionStorage.setItem("pic_userImg", result.user.image);
        location.href = "./index.html";
      }
    })
    .catch((error) => console.log("error", error));
};

email.addEventListener("input", handleCheckInput);
pwd.addEventListener("input", handleCheckInput);
