const searchBtn = document.querySelector(".search-btn");
const postEditBtn = document.querySelectorAll(".post-edit-btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const deletePostBtn = document.querySelector(".delete-btn");
const modalDelete = document.querySelector(".modal-delete");
const cancelBtn = document.querySelector(".cancel-btn");
const finalCancelBtn = document.querySelector(".delete-btn-final");

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
  modalDelete.classList.toggle("hidden");
  modalContent.classList.toggle("hidden")
}

const handleCancel = () => {
  modalDelete.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}

const handleFinalDelete = () => {
  modalDelete.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}

const openSearch = () => {
  location.href = "search.html"
}

const closeModal = () => {
  modal.classList.add("hidden")
  modalContent.classList.add("hidden");
}

postEditBtn.forEach((button) => {
  button.addEventListener("click", openModal)
})
deletePostBtn.addEventListener("click", handleDelete)
cancelBtn.addEventListener("click", handleCancel);
finalCancelBtn.addEventListener("click", handleFinalDelete)

searchBtn.addEventListener("click", openSearch)

modalLayer.addEventListener("click", closeModal);