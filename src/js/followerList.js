let btn_follow = document.querySelector("#follow-btn");
btn_follow.addEventListener('click', follow)

function follow(){
    if (btn_follow.innerText === '팔로우') {
        btn_follow.innerText = '취소';
        btn_follow.classList.remove('follow-btn-orange');
        btn_follow.classList.add('follow-btn-white')
    } else {
        btn_follow.innerText = '팔로우';
        btn_follow.classList.remove('follow-btn-white');
        btn_follow.classList.add('follow-btn-orange');
    }
}