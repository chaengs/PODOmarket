const postEditBtn = document.querySelectorAll(".post-edit-btn");
const modal = document.querySelector(".modal");
const feedBody = document.querySelector("body");
const deletePostBtn = document.querySelector(".delete-btn");
const modalDelete = document.querySelector(".modal-delete");
const cancelBtn = document.querySelector(".cancel-btn");
const finalCancelBtn = document.querySelector(".delete-btn-final");


const openModal = () => {
  modal.classList.remove("hide");
  modal.classList.add("on");
  feedBody.classList.add("modal-bg"); 
}

const handleDelete = () => {
  modal.classList.add("hide");
  modal.classList.remove("on");
  modalDelete.classList.remove("hide");
  modalDelete.classList.add("on");
}

const handleCancel = () => {
  modalDelete.classList.add("hide");
  modalDelete.classList.remove("on");
  feedBody.classList.remove("modal-bg"); 
}

const handleFinalDelete = () => {
  modalDelete.classList.add("hide");
  modalDelete.classList.remove("on");
  feedBody.classList.remove("modal-bg"); 
}

postEditBtn.forEach((button) => {
  button.addEventListener("click", openModal)
})
deletePostBtn.addEventListener("click", handleDelete)
cancelBtn.addEventListener("click", handleCancel);
finalCancelBtn.addEventListener("click", handleFinalDelete)

