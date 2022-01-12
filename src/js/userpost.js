const likeButtons = document.querySelectorAll(".like > button");

let hasClicked = false;

const handleLike = (event) => {
  // 각각의 포스팅 별로 내가좋아요 했는지 안했는지 저장하고 api 확인해야 함
  // like or cancel like 
  const likeBtn = event.target;
  const likeCount = likeBtn.nextElementSibling;
  // console.log(likeCount)
  let count = parseInt(likeCount.textContent);
  console.log(count)

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


likeButtons.forEach((btn) => {
  btn.addEventListener("click", handleLike);
})