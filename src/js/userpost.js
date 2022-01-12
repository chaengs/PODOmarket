const likeBtn = document.querySelector(".like > button");
const likeCount = document.querySelector(".like > span");
let hasClicked = false;

const handleLike = (event) => {
  // like or cancel like 
  let count = parseInt(likeCount.textContent);
  if (!hasClicked) {
    count += 1;
    likeCount.textContent = count;
    hasClicked = true;
    likeBtn.classList.remove("default");
    likeBtn.classList.add("like-btn-on");
  } else {
    count -= 1;
    likeCount.textContent = count;
    hasClicked = false;
    likeBtn.classList.remove("like-btn-on");
    likeBtn.classList.add("default");
  }
}


likeBtn.addEventListener("click", handleLike);