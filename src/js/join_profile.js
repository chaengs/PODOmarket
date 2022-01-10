let profileImg = document.querySelector(".img_profile");
let userName = document.querySelector("#userName");
let userID = document.querySelector("#userID");
let userDesc = document.querySelector("#userDesc");
let err_userName = document.querySelector("#userNameError");
let err_ID = document.querySelector("#userIDError");
let err_Desc = document.querySelector("#userDescError");
let submitBtn = document.querySelector(".btn_submit");
let imgInput = document.querySelector("#img_profile");
let registerImgUrl = "1641803765586.png";
//기본이미지
console.log(imgInput.value);
// 이전페이지 쿠키를 가져온다.
const getCookie = function (name) {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};

const email = getCookie("EMAIL");
const pwd = getCookie("PWD");

// 이전페이지에서의 쿠키가 없다면 로그인페이지로 강제 이동
if (!email || !pwd) {
  alert("잘못된 접근입니다.");
  location.href = "./login.html";
}

const checkName = () =>
  userName.value.length < 11 && userName.value.length > 1 ? true : false;

const checkID = () => {
  const regExp = /^[a-zA-Z0-9._]*$/;
  return regExp.test(userID.value) && !!userID.value ? true : false;
};
const checkDesc = () => (userDesc.value.length != 0 ? true : false);

const handleCheckUserName = () => {
  if (checkName()) err_userName.innerHTML = "";
  else err_userName.innerHTML = "*사용자 이름은 2~10자 이내여야 합니다.";
};

const handleCheckUserID = () => {
  if (checkID()) err_ID.innerHTML = "";
  else err_ID.innerHTML = "*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.";
};

const handleCheckUserDesc = () => {
  if (checkDesc()) err_Desc.innerHTML = "";
  else err_Desc.innerHTML = "*자신을 소개해 주세요.";
};

const handleCheckInput = () => {
  if (checkName() && checkID() && checkDesc()) {
    submitBtn.removeAttribute("disabled");
    submitBtn.className = "btn_submit activate";
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.className = "btn_submit";
  }
};

const setProfile = (event) => {
  let reader = new FileReader();

  reader.onload = (event) => {
    profileImg.setAttribute("src", event.target.result);
  };
  reader.readAsDataURL(event.target.files[0]);
  imgUpload();
};

const imgUpload = () => {
  var formdata = new FormData();
  formdata.append("image", imgInput.files[0], "basic-profile-img.png");
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  async function fetcher() {
    return (
      await fetch("http://146.56.183.55:5050/image/uploadfile", requestOptions)
    ).json();
  }
  fetcher().then((value) => {
    registerImgUrl = value.filename;
  });
};

userName.addEventListener("blur", handleCheckUserName);
userID.addEventListener("blur", handleCheckUserID);
userDesc.addEventListener("blur", handleCheckUserDesc);

userName.addEventListener("input", handleCheckInput);
userDesc.addEventListener("input", handleCheckInput);
userID.addEventListener("input", handleCheckInput);
