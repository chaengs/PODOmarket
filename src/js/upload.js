const isLogined = sessionStorage.pic_isLogined;

// 회원 서비스 페이지에 비 로그인 상태로 접근할 경우 splash로 이동
if (!isLogined) {
  location.href = "./index.html";
}

const fileInput = document.querySelector("#img_upload");
const imgBlock = document.querySelector(".imgs_wrap");
const textArea = document.querySelector("#content");
const uploadBtn = document.querySelector(".btn_upload");
const token = sessionStorage.getItem("pic_token");
let imgUrl = "";

// conent textarea 글자수에 따라 높이 조절
const resize = (obj) => {
  obj.style.height = "1px";
  obj.style.height = 14 + obj.scrollHeight + "px";
};

const setProfile = (event) => {
  // 업로드 개수 확인
  if (fileInput.files.length > 3) {
    alert("이미지는 3개까지 업로드 가능합니다.");
    fileInput.value = "";
    return;
  } else if (fileInput.value.length == 0) {
    // 이미지 업로드가 없을 때 아무것도 안한다.(이 분기가 없으면 div가 비워짐)
  } else {
    imgBlock.innerHTML = "";
    if (fileInput.files.length == 1) {
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

const deleteSingleImg = () => {
  imgBlock.innerHTML = "";
  fileInput.value = "";
  dataExist();
};

const deleteMultiImg = (e) => {
  const removeTargetId = e.dataset.index;
  const removeTarget = document.getElementById(removeTargetId);
  const files = fileInput.files;
  const dataTranster = new DataTransfer();
  Array.from(files)
    .filter((file) => file.lastModified != removeTargetId)
    .forEach((file) => {
      dataTranster.items.add(file);
    });
  fileInput.files = dataTranster.files;
  removeTarget.remove();
  dataExist();
};

const dataExist = () => {
  if (textArea.value.length || fileInput.files.length) {
    uploadBtn.removeAttribute("disabled");
    uploadBtn.className = "btn_upload activate";
  } else {
    uploadBtn.setAttribute("disabled", true);
    uploadBtn.className = "btn_upload";
  }
};

const imgUpload = () => {
  const formdata = new FormData();

  for (let i = 0; i < fileInput.files.length; i++) {
    formdata.append(`image`, fileInput.files[i], fileInput.files[i].name);
  }

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("http://146.56.183.55:5050/image/uploadfiles", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      imgUrl = result.map((item) => item.filename).join();
    })
    .catch((error) => console.log("error", error));
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
    .then(() => (location.href = "./feed.html"))
    .catch((error) => console.log("error", error));
};

const handleOnSubmit = () => {
  if (fileInput.files.length == 0) {
    postUpload();
  } else {
    imgUpload();
    setTimeout(postUpload, 100);
  }
};

textArea.addEventListener("input", dataExist);
fileInput.addEventListener("change", dataExist);
