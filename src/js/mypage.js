function follow() {
    let btn_follow = document.querySelector(".follow-btn");
    if (btn_follow.innerText === '팔로우') {
        btn_follow.innerText = '취소';
    } else {
        btn_follow.innerText = '팔로우';
    }
}

const url = "http://146.56.183.55:5050";
const sessionAccountName = sessionStorage.getItem("pic_accountName");
const token = sessionStorage.getItem("pic_token");

const itemList = document.querySelector(".item-list");
const itemWrap = document.querySelector(".item-wrap");
const postImgWrap = document.querySelector(".post-img-wrap");
const postNav = document.querySelector(".post-nav");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + token);
myHeaders.append("Content-type", "application/json")
const requestOptions = {
    method: "GET",
    headers: myHeaders,
};

// 프로필 정보 넣기
fetch(url + "/profile/" + sessionAccountName, requestOptions)
    .then(res => res.json())
    .then(res => {
        const profile = res.profile;
        document.querySelector(".profile-img").setAttribute("src", profile.image);
        document.querySelector(".profile-name").innerHTML = profile.username;
        document.querySelector(".profile-id").innerHTML = '@' + profile.accountname;
    }).catch(err => {
        console.log("fetch error", err);
    });

// 판매중인상품
fetch(url + "/product/" + sessionAccountName, requestOptions)
    .then(res => res.json())
    .then(res => {
        if (res.data != 0) {
            itemList.classList.remove("txt-hide");

            const product = res.product;
            let input = '';
            for (let i = 0; i < product.length; i++) {
                input += `
                    <div class="item-container">
                        <a href=""><img src="${product[i].itemImage}" alt="판매 중인 상품 사진"></a>
                        <p class="item-tit">${product[i].itemName}</p>
                        <p class="item-price">${product[i].price}</p>
                    </div>
                `
            }
            document.querySelector(".items").innerHTML = input;
        } else {
            itemList.classList.add("txt-hide");
            itemWrap.style.height = 0;
        }
    }).catch(err => {
        console.log("fetch error", err);
    });


// 게시글 목록
fetch(url + "/post/" + sessionAccountName + "/userpost", requestOptions)
    .then(res => res.json())
    .then(res => {
        const post = res.post;
        let input = '';
        if (post.length > 0) {
            for (let i = 0; i < post.length; i++) {
                input +=
                    `
                        <section class="post-card">
                        <nav class="user-info">
                        <a href="javascript:void(0)" class="post-card-profile">
                            <img src="${post[i].author.image}" alt="user-profile-img">
                        </a>
                        <a href="javascript:void(0)" class="user">
                            <span class="user-name">${post[i].author.username}</span>
                            <span class="user-id">@${post[i].author.accountname}</span>
                        </a>
                        <button type="button" class="post-edit-btn">
                            <span class="txt-hide">더보기 버튼</span>
                        </button>
                        </nav>
                        <div class="post-content-container">
                        <p class="post-content-txt">${post[i].content}</p>
                        <div class="post-content-img">
                    `
                const images = post[i].image.split(',');
                for (let i = 0; i < images.length; i++) {
                    input +=
                        `
                        <img src="${images[i]}" alt="feed-posting-image">
                    `
                }
                input +=
                    `
                        </div>
                        <ul class="like-comment-container">
                            <li class="like">
                                <button type="button" class="default">
                                    <span class="txt-hide">좋아요 버튼</span>
                                </button>
                                <span>58</span>
                            </li>
                            <li class="comment">
                                <button>
                                    <span class="txt-hide">코멘트 버튼</span>
                                </button>
                                <span>12</span>
                            </li>
                        </ul>
                        <p class="post-date">${post[i].createdAt.slice(0, 4)}년 ${post[i].createdAt.slice(5, 7)}월 ${post[i].createdAt.slice(8, 10)}일</p>
                    </div>
                </section>
                `
            }
            document.querySelector(".posts").innerHTML = input;
        } else {
            postNav.classList.add("txt-hide");
            postImgWrap.style.height = 0;
            postImgWrap.style.padding = 0;
        }
    }).catch(err => {
        console.log("fetch error", err);
    });