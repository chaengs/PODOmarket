const fileInput = document.querySelector("#img_upload")
const imgBlock = document.querySelector(".imgs_wrap")
const imgUrl=[];

const resize = (obj) => {
  obj.style.height = "1px";
  obj.style.height = 14 + obj.scrollHeight + "px";
}

const setProfile = (event) => {
  imgBlock.innerHTML = '';
  // 업로드 개수 확인
  if(fileInput.files.length > 3){
    alert("이미지는 3개까지 업로드 가능합니다.")
    fileInput.value="";
    return ;
  }else{
    if(fileInput.files.length == 1){
      let reader = new FileReader();
      reader.onload = (event) => {
        let img_wrap = document.createElement('div');
        img_wrap.classList.add('img_wrap');

        let single = document.createElement('img');
        single.src = event.target.result;
        single.classList.add('img_single');

        let x = document.createElement('img');
        x.onclick = function(){
          imgBlock.removeChild(img_wrap);
          fileInput.value="";
        };
        x.src = "../src/images/upload/x.svg";
        x.classList.add('btn_x');

        imgBlock.appendChild(img_wrap);
        img_wrap.appendChild(single);
        img_wrap.appendChild(x);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

};