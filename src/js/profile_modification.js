const isLogined = sessionStorage.pic_isLogined;

// 회원 서비스 페이지에 비 로그인 상태로 접근할 경우 splash로 이동
if (!isLogined) {
  location.href = "./index.html";
}

const profileImg = document.querySelector(".img_profile");
const userName = document.querySelector("#userName");
const userID = document.querySelector("#userID");
const userDesc = document.querySelector("#userDesc");
const err_userName = document.querySelector("#userNameError");
const err_ID = document.querySelector("#userIDError");
const err_Desc = document.querySelector("#userDescError");
const submitBtn = document.querySelector(".btn_upload");
const imgInput = document.querySelector("#img_profile");

let registerImgUrl = sessionStorage.getItem("pic_userImg"); // 이미지를 업로드 하지 않을 경우 기존이미지가 db에 들어간다.
const token = sessionStorage.getItem("pic_token");
const sessionAccountName = sessionStorage.getItem("pic_accountName");

let validID = true;

const getMyInfo = () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "http://146.56.183.55:5050/profile/" + sessionAccountName,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const profile = result.profile;
      userName.value = profile.username;
      userID.value = profile.accountname;
      userDesc.value = profile.intro;
      profileImg.setAttribute(
        "src",
        "http://146.56.183.55:5050/" + profile.image
      );
    })
    .catch((error) => console.log("error", error));
};
getMyInfo();

// username의 길이 유효성 검사
const checkName = () =>
  userName.value.length < 11 && userName.value.length > 1 ? true : false;

// accountname의 정규표현식 검사
const checkID = () => {
  const regExp = /^[a-zA-Z0-9._]*$/;
  return regExp.test(userID.value) && !!userID.value ? true : false;
};

// accountname이 중복인지 검사
const checkIDValid = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://146.56.183.55:5050/user", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      validID = true;
      result.map((item) => {
        if (
          item.accountname == userID.value &&
          sessionAccountName != userID.value
        ) {
          err_ID.innerHTML = "*이미 존재하는 아이디 입니다.";
          validID = false;
        }
      });
    })
    .catch((error) => console.log("error", error));
};

// intro(자기소개)란이 공백인지 검사
const checkDesc = () => (userDesc.value.length != 0 ? true : false);

// input blur 시 실행
const handleCheckUserName = () => {
  if (checkName()) err_userName.innerHTML = "";
  else err_userName.innerHTML = "*사용자 이름은 2~10자 이내여야 합니다.";
};

// input blur 시 실행
const handleCheckUserID = () => {
  if (checkID()) {
    err_ID.innerHTML = "";
    checkIDValid();
  } else err_ID.innerHTML = "*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.";
};

// input blur 시 실행
const handleCheckUserDesc = () => {
  if (checkDesc()) err_Desc.innerHTML = "";
  else err_Desc.innerHTML = "*자신을 소개해 주세요.";
};

// input tag를  blur,input 시 실행
const handleCheckInput = () => {
  console.log("good");
  function check() {
    // 유효성 검사를 모두 통과하면 button을 활성화 시킨다.
    if (checkName() && checkID() && checkDesc() && validID) {
      submitBtn.removeAttribute("disabled");
      submitBtn.className = "btn_upload activate";
    } else {
      submitBtn.setAttribute("disabled", true);
      submitBtn.className = "btn_upload";
    }
  }
  // fetch 함수의 비동기 처리때문에 setTimeout으로 .1s 후 실행
  setTimeout(check, 100);
};

// 이미지 업로드 시 미리보기 view와 이미지 업로드 실행
const setProfile = (event) => {
  let reader = new FileReader();

  reader.onload = (event) => {
    profileImg.setAttribute("src", event.target.result);
  };
  reader.readAsDataURL(event.target.files[0]);
};

// 이미지 db에 업로드 후 로그인 시 이용할 변수에 파일이름 할당.
const imgUpload = () => {
  if (imgInput.files.length) {
    const formdata = new FormData();
    formdata.append("image", imgInput.files[0], "basic-profile-img.png");
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    async function fetcher() {
      return (
        await fetch(
          "http://146.56.183.55:5050/image/uploadfile",
          requestOptions
        )
      ).json();
    }
    fetcher().then((value) => {
      registerImgUrl = value.filename;
    });
  }
};

const saveModification = () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    user: {
      username: userName.value,
      accountname: userID.value,
      intro: userDesc.value,
      image: registerImgUrl,
    },
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://146.56.183.55:5050/user", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (!result.message) {
        alert("프로필이 성공정으로 수정되었습니다.");
        sessionStorage.setItem("pic_accountName", result.user.accountname);
        sessionStorage.setItem("pic_userName", result.user.username);
        sessionStorage.setItem("pic_userImg", result.user.image);
        location.reload();
      }
    })
    .catch((error) => console.log("error", error));
};

// 버튼이 활성화되면 버튼에 생기는 onClick event
const handleOnSubmit = () => {
  imgUpload();
  setTimeout(saveModification, 100);
};

userName.addEventListener("blur", handleCheckUserName);
userID.addEventListener("blur", handleCheckUserID);
userDesc.addEventListener("blur", handleCheckUserDesc);

// input이 아닌 데이터 변경점이 있기 때문에 blur도 추가하였음.
userName.addEventListener("blur", handleCheckInput);
userID.addEventListener("blur", handleCheckInput);
userDesc.addEventListener("blur", handleCheckInput);

userName.addEventListener("input", handleCheckInput);
userDesc.addEventListener("input", handleCheckInput);
userID.addEventListener("input", handleCheckInput);

imgInput.addEventListener("change", handleCheckInput);
