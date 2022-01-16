const searchBtn = document.querySelector(".search-btn");
const commentButtons = document.querySelectorAll(".comment-btn");

const postEditBtn = document.querySelectorAll(".post-edit-btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const deletePostBtn = document.querySelector(".delete-btn");
const modalCheck = document.querySelector(".modal-check");
const cancelBtn = document.querySelector(".cancel-btn");
const finalDeleteBtn = document.querySelector(".delete-btn-final");

const modalLayer = document.querySelector(".modal-layer");


const handleModal = () => {
  let isModalClicked = true;
  if(isModalClicked) {
    modal.classList.toggle("hidden");
    modalContent.classList.toggle("hidden");
  }
}
const openModal = () => {
  modal.classList.toggle("hidden");
  modalContent.classList.toggle("hidden");
}

const handleDelete = () => {
  modalCheck.classList.toggle("hidden");
  modalContent.classList.toggle("hidden")
}

const handleCancel = () => {
  modalCheck.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}

const handleFinalDelete = () => {
  modalCheck.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}

const openSearch = () => {
  location.href = "search.html"
}

const closeModal = () => {
  if (modalCheck.classList.contains("hidden")) {
    modal.classList.add("hidden")
    modalContent.classList.add("hidden");
  } 
}

const goToPostDetail = () => {
  location.href = "./postDetail.html";
};

postEditBtn.forEach((button) => {
  button.addEventListener("click", openModal)
})


deletePostBtn.addEventListener("click", handleDelete)
cancelBtn.addEventListener("click", handleCancel);
finalDeleteBtn.addEventListener("click", handleFinalDelete)

searchBtn.addEventListener("click", openSearch)

commentButtons.forEach((btn) => {
  btn.addEventListener("click", goToPostDetail)
});


modalLayer.addEventListener("click", closeModal);