// login flag
const isLogined = sessionStorage.pic_isLogined;

// 회원 서비스 페이지에 비 로그인 상태로 접근할 경우 splash로 이동
if (!isLogined) {
  location.href = "./index.html";
}

// preview profile img
const productImg = document.querySelector("#img_product");

// input list
const itemName = document.querySelector("#itemName");
const price = document.querySelector("#price");
const submitBtn = document.querySelector(".btn_upload");
const link = document.querySelector("#link");
const imgInput = document.querySelector("#product_img");

// error msg list
const itemNameErr = document.querySelector("#itemNameError");

// sessionStorage
const token = sessionStorage.getItem("pic_token");

// fetch
const url = "http://146.56.183.55:5050";
let imgUrl = "";
let priceN = 0;

// 이미지 업로드 시 미리보기 view 만들기
const setPreView = (event) => {
  let reader = new FileReader();

  reader.onload = (event) => {
    productImg.setAttribute("src", event.target.result);
  };
  reader.readAsDataURL(event.target.files[0]);
};

// 상품 이름의 길이 유효성 검사
const checkItemName = () =>
  itemName.value.length < 16 && itemName.value.length > 1 ? true : false;

// 이름 길이 유효성 검사가 끝나면 error 메시지 처리
const handleItemName = () => {
  if (checkItemName()) {
    itemNameErr.innerHTML = "";
  } else {
    itemNameErr.innerHTML = "상품명은 2~15자 이내여야 합니다.";
  }
};
// input price 숫자만 입력 가능하게 제한
const checkPrice = () => {
  const regExp = /[^0-9,]/g;
  if (regExp.test(price.value)) {
    price.value = price.value.replace(regExp, "");
  }
};

// 숫자를 입력한 후 blur 하면 자동으로 원단위로 변환
const changePriceForm = () => {
  priceN = price.value.replace(/,/g, "") * 1;
  let arr = price.value.replace(/,/g, "").split("").reverse();
  let count =
    arr.length % 3 == 0
      ? parseInt(arr.length / 3) - 1
      : parseInt(arr.length / 3);

  for (let i = 1; i <= count; i++) {
    arr.splice(3 * i + (i - 1), 0, ",");
  }
  price.value = arr.reverse().join("");
};

const handleCheckInput = () => {
  // 유효성 검사를 모두 통과하면 button을 활성화 시킨다.
  if (checkItemName() && price.value && link.value && imgInput.files.length) {
    submitBtn.removeAttribute("disabled");
    submitBtn.className = "btn_upload activate";
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.className = "btn_upload";
  }
};

const imageUpload = async () => {
  const formdata = new FormData();

  formdata.append("image", imgInput.files[0], "basic-profile-img.png");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  return await fetch(
    `${url}/image/uploadfile`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result.filename;
    })
    .then((res) => {
      imgUrl = res;
    })
    .catch((error) => console.log("error", error));
};

const addProduct = () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    product: {
      itemName: itemName.value,
      price: priceN,
      link: link.value,
      itemImage: imgUrl,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${url}/product`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (!result.message) {
        alert("상품이 정상적으로 등록되었습니다.");
        location.href = "mypage.html";
      }
    })
    .catch((error) => console.log("error", error));
};

const handleOnSubmit = () => {
  imageUpload().then(() => {
    addProduct();
  });
};

itemName.addEventListener("blur", handleItemName);
price.addEventListener("input", checkPrice);
price.addEventListener("blur", changePriceForm);

itemName.addEventListener("input", handleCheckInput);
price.addEventListener("input", handleCheckInput);
link.addEventListener("input", handleCheckInput);
imgInput.addEventListener("change", handleCheckInput);
