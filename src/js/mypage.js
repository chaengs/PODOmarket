function follow() {
    let btn_follow = document.querySelector(".follow-btn");
    if (btn_follow.innerText === '팔로우') {
        btn_follow.innerText = '취소';
    } else {
        btn_follow.innerText = '팔로우';
    }
}