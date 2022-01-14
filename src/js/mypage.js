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

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + token);
myHeaders.append("Content-type", "application/json")
const requestOptions = {
    method: "GET",
    headers: myHeaders,
};

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
    });
