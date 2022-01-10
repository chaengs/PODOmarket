let email = document.querySelector("#email");
let pwd = document.querySelector("#pwd");

console.log(document.cookie);
const handleCheckInput = () => {
  if (!!email.value && !!pwd.value) {
    submitBtn.removeAttribute("disabled");
    submitBtn.className = "btn_submit activate";
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.className = "btn_submit";
  }
};

email.addEventListener("input", handleCheckInput);
pwd.addEventListener("input", handleCheckInput);
