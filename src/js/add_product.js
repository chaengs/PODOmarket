// login flag
const isLogined = sessionStorage.pic_isLogined;

// 회원 서비스 페이지에 비 로그인 상태로 접근할 경우 splash로 이동
if (!isLogined) {
  location.href = "./index.html";
}

// preview profile img
const productImg = document.querySelector("#img_product");

// 이미지 업로드 시 미리보기 view 만들기
const setPreView = (event) => {
  let reader = new FileReader();

  reader.onload = (event) => {
    productImg.setAttribute("src", event.target.result);
  };
  reader.readAsDataURL(event.target.files[0]);
};
