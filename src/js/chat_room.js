// login flag
const isLogined = sessionStorage.pic_isLogined;

// 회원 서비스 페이지에 비 로그인 상태로 접근할 경우 splash로 이동
if (!isLogined) {
  location.href = "./index.html";
}

// input list
const inputMsg = document.querySelector("#input_msg");
const sendBtn = document.querySelector("#send_btn");
const mainBox = document.querySelector("#main");

const checkMsg = () => (inputMsg.value.length ? "true" : false);

const handleCheckMsg = () => {
  if (checkMsg()) {
    sendBtn.removeAttribute("disabled");
    sendBtn.className = "send_btn send_active";
  } else {
    sendBtn.setAttribute("disabled", true);
    sendBtn.className = "send_btn";
  }
};

const handleOnSend = () => {
  const date = new Date();
  const time = date.getHours() + ":" + date.getMinutes() + "";
  mainBox.innerHTML += `
      <article class="my_chat">
        <p class="text_time">${time}</p>
        <div class="bubble my_bubble">${inputMsg.value}</div>
      </article>
  `;
  inputMsg.value = "";
  handleCheckMsg();
};

inputMsg.addEventListener("input", handleCheckMsg);
