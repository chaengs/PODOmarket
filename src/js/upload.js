//login flag
const isLogined = sessionStorage.pic_isLogined;

// 회원 서비스 페이지에 비 로그인 상태로 접근할 경우 splash로 이동
if (!isLogined) {
  location.href = "./index.html";
}
// input list
const fileInput = document.querySelector("#img_upload");
const textArea = document.querySelector("#content");
const uploadBtn = document.querySelector(".btn_upload");

// 이미지 추가 시 innerHTML할 parent
const imgBlock = document.querySelector(".imgs_wrap");

// sessionStorage list
const token = sessionStorage.getItem("pic_token");
const profileUrl = sessionStorage.getItem("pic_userImg");

// 이미지 업로드 후 res 받은 이미지의 url을 저장하기 위한 변수, multi이면 ,로 구분
let imgUrl = "";

// user profile 이미지를 서버에서 받아와 바꾸기
const profileImg = document.querySelector("#profileImg");
profileImg.setAttribute("src", "http://146.56.183.55:5050/" + profileUrl);

// conent textarea 글자수에 따라 높이 조절
const resize = (obj) => {
  obj.style.height = "1px";
  obj.style.height = 14 + obj.scrollHeight + "px";
};

// input files 의 onchange 이벤트
const setProfile = (event) => {
  // 업로드 개수 확인
  if (fileInput.files.length > 3) {
    alert("이미지는 3개까지 업로드 가능합니다.");
    fileInput.value = "";
    return;
  } else if (fileInput.value.length == 0) {
    // 이미지 업로드가 없을 때 아무것도 안한다.(이 분기가 없으면 업로드 중단 시 div가 비워짐)
  } else {
    imgBlock.innerHTML = "";

    // files에 업로드된 이미지가 1장일 경우
    if (fileInput.files.length == 1) {
      // 미리보기 구현을 위한 reader
      let reader = new FileReader();
      reader.onload = (event) => {
        imgBlock.innerHTML += `
          <div class="img_wrap">
            <img class="img_single" src="${event.target.result}" alr="img"/>
            <img class="btn_x" src="../src/images/upload/x.svg" onclick="deleteSingleImg()"/>
          </div>`;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      // files에 업로드된 이미지가 여러장일 경우
      const files = Array.from(fileInput.files);
      files.forEach((file, idx) => {
        let reader = new FileReader();
        reader.onload = (event) => {
          imgBlock.innerHTML += `
          <div id="${file.lastModified}" class="img_wrap">
            <img class="img_multi" src="${event.target.result}" alr="img${idx}"/>
            <img data-index='${file.lastModified}' class="btn_x" src="../src/images/upload/x.svg" onclick="deleteMultiImg(this)"/>
          </div>`;
        };
        reader.readAsDataURL(event.target.files[idx]);
      });
    }
  }
};

// single 이미지의 delete event
const deleteSingleImg = () => {
  // 1. imgBlock과 fileInput을 비운다.
  imgBlock.innerHTML = "";
  fileInput.value = "";
  // 2. 유효성 검사를 다시 실시하여 버튼을 비활성화 시킨다.
  dataExist();
};
// multi 이미지의 delete event
const deleteMultiImg = (e) => {
  // 지우려는 이미지의 data-index의 저장된 img_wrap의 아이디를 받아와 id를 찾는다.
  const removeTargetId = e.dataset.index;
  const removeTarget = document.getElementById(removeTargetId);
  const files = fileInput.files;

  // dataTranster을 사용하면 files의 파일을 개별로 삭제할 수 있다.
  const dataTranster = new DataTransfer();
  // 객체인 fileInput.files를 배열로 바꿔 지우려는 파일을 제외한 배열을 다시 만든다.
  Array.from(files)
    .filter((file) => file.lastModified != removeTargetId)
    .forEach((file) => {
      // 지우려는 파일을 제외한 배열을 datatranster에 넣어준다.
      dataTranster.items.add(file);
    });
  // fileInput의 파일을 dataTranster.files로 바꿔준다.
  fileInput.files = dataTranster.files;
  // 랜더되어 있는 target을 지워준다.
  removeTarget.remove();
  // 유효성 검사를 다시 실시하여 버튼을 비활성화 시킨다.
  dataExist();
};

// 파일이나 글이 존재하는지 확인하여 submit button을 활성화/비활성화 시킨다. 둘 중 하나만 있어도 업로드 할 수 있다.
const dataExist = () => {
  if (textArea.value.length || fileInput.files.length) {
    uploadBtn.removeAttribute("disabled");
    uploadBtn.className = "btn_upload activate";
  } else {
    uploadBtn.setAttribute("disabled", true);
    uploadBtn.className = "btn_upload";
  }
};

// 이미지 업로드
const imgUpload = async () => {
  if (fileInput.files.length) {
    const formdata = new FormData();
    // 이미지가 여러장일 경우를 대비하여 files의 길이만큼 formdata를 붙힌다.
    for (let i = 0; i < fileInput.files.length; i++) {
      formdata.append(`image`, fileInput.files[i], fileInput.files[i].name);
    }

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    return await fetch(
      "http://146.56.183.55:5050/image/uploadfiles",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // 사진이 여러장일 경우를 대비해 "1.png,2.png,3.png" 형식이 되도록 해주고 imgUrl 변수에 넣어준다.
        imgUrl = result.map((item) => item.filename).join();
      })
      .catch((error) => console.log("error", error));
  }
};

const postUpload = () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    post: {
      content: textArea.value,
      image: imgUrl,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://146.56.183.55:5050/post", requestOptions)
    .then((response) => response.json())
    .then(() => (location.href = "./mypage.html"))
    .catch((error) => console.log("error", error));
};

const handleOnSubmit = () => {
  imgUpload()
    .then((res) => {
      imgUrl = res;
    })
    .then(() => {
      postUpload();
    });
};

textArea.addEventListener("input", dataExist);
fileInput.addEventListener("change", dataExist);
