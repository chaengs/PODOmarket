const url = "http://146.56.183.55:5050";
const token = sessionStorage.getItem("pic_token");
const searchInput = document.querySelector(".search-input");
let searchValue;

const getSearchInput = (event) => {
  const { value } = event.target;
  searchValue = value;
  // console.log(searchValue);
  search()
}

searchInput.addEventListener("keyup", getSearchInput);


// 검색 (accountname, username 검색 가능)
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

let usersTotal;

const search = () => {
  fetch(`${url}/user/searchuser/?keyword=${searchValue}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    usersTotal = result.length;
    let users = [];
    result.forEach((user) => {
      if(user.accountname.includes(searchValue) || user.username.includes(searchValue)) {   
        users.push(user);
      } 
  })
  return users;  
  })
  // .then((users) => {
  //   // console.log(users.length)
  //   const main = document.querySelector("main");
  //   const container = document.querySelector(".container");
  //   users.forEach((user)=> {
  //     let profilePic = user.image;
  //     if(!profilePic.includes("http")) {
  //         profilePic = `${url}/${profilePic}`;
  //     } else if(profilePic.includes("null")) {
  //       profilePic = "../src/images/search/default_profile.png";
  //     }
  //     const userCard = document.createElement("article");

  //     const userCardHTML = `
  //     <article>
  //       <img class="img-profile" src="${profilePic}" alt="유저 프로필 이미지" />
  //       <a href="javascript:void(0)">
  //         <div class="wrap-profile-desc">
  //           <p class="profile-nick-name">${user.username}</p>
  //           <p class="profile-id">${user.accountname}</p>
  //         </div>
  //       </a>
  //     </article>
  //   `
  //   userCard.innerHTML = userCardHTML;
  //   container.append(userCard)

  //   })
  //   main.append(container);
  //   return users;
  // })
  .then((users) => {     
    // console.log(users)   
    const existAnyUser = document.querySelectorAll("main > div > article"); 
    if(existAnyUser) {
      existAnyUser.forEach((userCard) => {
      userCard.remove();
      })
    }
    const main = document.querySelector("main");
    const container = document.querySelector(".container");
    users.forEach((user)=> {
      let profilePic = user.image;
      if(!profilePic.includes("http")) {
          profilePic = `${url}/${profilePic}`;
      } else if(profilePic.includes("null")) {
        profilePic = "../src/images/search/default_profile.png";
      }
      const userCard = document.createElement("article");
      

      const userCardHTML = `
      <article>
        <img class="img-profile" src="${profilePic}" alt="유저 프로필 이미지" />
        <a href="javascript:void(0)">
          <div class="wrap-profile-desc">
            <p class="profile-nick-name">${user.username}</p>
            <p class="profile-id">${user.accountname}</p>
          </div>
        </a>
      </article>
    `
    userCard.innerHTML = userCardHTML;
    container.append(userCard)
    })
    main.append(container);
    if (!searchValue) {
      // const container = document.querySelector(".container")
      const userCards = document.querySelectorAll("article");
      if(userCards) {
        userCards.forEach((userCard) => {
        userCard.remove();
      })
      }
    }  
  })
  .catch(error => console.log('error', error));
}


