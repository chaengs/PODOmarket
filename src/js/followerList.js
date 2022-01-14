let btn_follow = document.querySelectorAll(".follow-btn");
// btn_follow.addEventListener('click', follow);
for (const button of btn_follow) {
    button.addEventListener('click', follow);
}

function follow(e) {
    if (e.innerText === '팔로우') {
        e.innerText = '취소';
        e.classList.remove('follow-btn-purple');
        e.classList.add('follow-btn-white')
    } else {
        e.innerText = '팔로우';
        e.classList.remove('follow-btn-white');
        e.classList.add('follow-btn-purple');
    }
}