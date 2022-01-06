eMail.oninput = function () {
  if (!!eMail.value && !!pwd.value) {
    submitBtn.removeAttribute("disabled");
    submitBtn.className = "btn_submit activate";
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.className = "btn_submit";
  }
};
pwd.oninput = function () {
  if (!!eMail.value && !!pwd.value) {
    submitBtn.removeAttribute("disabled");
    submitBtn.className = "btn_submit activate";
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.className = "btn_submit";
  }
};
