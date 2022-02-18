const url = "http://146.56.183.55:5050";
const token = sessionStorage.getItem("pic_token");
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');

// 검색 (accountname, username 검색 가능)
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-type", "application/json")
const requestOptions = {
    method: "GET",
    headers: myHeaders,
};

const searchUser = (e) => {
  e.preventDefault();
  const searchValue = e.target.value;
  if(searchValue == '') {
    document.querySelector(".container").innerHTML = '';
  } else {
      fetch(`${url}/user/searchuser/?keyword=${searchValue}`, requestOptions)
      .then(res => res.json())
      .then(res => {
        document.querySelector(".container").innerHTML = '';
        res.forEach(user => {
          document.querySelector(".container").innerHTML += `
          <article>
            <img class="img-profile" src="${url}/${user.image}" alt="유저 프로필 이미지" />
            <a href="./yourpage.html?id=${user.accountname}">
              <div class="wrap-profile-desc">
                <p class="profile-nick-name">${user.username}</p>
                <p class="profile-id" onclick="sendName()">${user.accountname}</p>
              </div>
            </a>
          </article>            
          `
        });
      });
    }
}
searchInput.addEventListener('input', searchUser);
