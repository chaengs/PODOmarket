// login flag
const isLogined = sessionStorage.pic_isLogined;

// 회원 서비스 페이지에 비 로그인 상태로 접근할 경우 splash로 이동
if (!isLogined) {
  location.href = "./index.html";
}

// input list
const inputMsg = document.querySelector("#input_msg");
const sendBtn = document.querySelector("#send_btn");

// elements
const mainBox = document.querySelector("#main");
const modalWrap = document.querySelector("#modal-wrap");

// 메시지를 입력했으면 true 반환
const checkMsg = () => (inputMsg.value.length ? "true" : false);

// 메시지 입력에 따른 전송버튼의 활성화/비활성화
const handleCheckMsg = () => {
  if (checkMsg()) {
    sendBtn.removeAttribute("disabled");
    sendBtn.className = "send_btn send_active";
  } else {
    sendBtn.setAttribute("disabled", true);
    sendBtn.className = "send_btn";
  }
};

// 전송버튼을 누르면 말풍선 랜더링 시키기
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

// modal wrap hidden 제거
const openModal = () => {
  modalWrap.removeAttribute("hidden");
};

// modal wrap set hidden
const closeModal = () => {
  modalWrap.setAttribute("hidden", true);
};

// 채팅방 나가기 버튼 클릭 시 채팅 리스트로 이동
const outRoom = () => {
  location.href = "chat_list.html";
};

inputMsg.addEventListener("input", handleCheckMsg);
