const fileInput = document.querySelector("#img_upload");
const imgBlock = document.querySelector(".imgs_wrap");
const textArea = document.querySelector("#content");
const imgUrl = [];

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
            <img class="btn_x" src="../src/images/upload/x.svg" onclick="deleteMultiImg(this)"/>
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
};

const dataExist = () => {};

textArea.addEventListener("input", () => {
  console.log(textArea.value);
});
