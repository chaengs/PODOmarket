# 🍇포도마켓  
2021.12.19 - 2022.2.19
  
## 포도마켓은,  
- 🦁멋쟁이사자처럼 프론트엔드스쿨 1기에서 팀 프로젝트로 진행한 포도마켓입니다.
- 판매할 상품을 등록하여 홍보, 판매할 수 있습니다.
- 또한 판매가 아니더라도 사진과 글을 작성하여 일상을 공유할 수 있는 SNS입니다.
- 다른 사용자를 팔로우하여 사람들의 소식을 확인할 수 있습니다.
- 게시글에 좋아요와 댓글을 남길 수 있습니다.
- 🍇이웃들이 알알이 모여 이룬 풍성한 한 송이, 포도마켓입니다.
  
## 팀원  
|[**심채영**](https://github.com/chaengs)|[**임한민**](https://github.com/hanminss)|[**지다혜**](https://github.com/daaahailey)|
|:---:|:---:|:---:|
|<a href="https://github.com/chaengs"><img src="https://user-images.githubusercontent.com/73277502/154791225-7298da96-2917-4aef-aff1-82750af3d298.jpeg" width="100"></a>|<a href="https://github.com/hanminss"><img src="https://avatars.githubusercontent.com/u/60065661?v=4" width="100"></a>|<a href="https://github.com/daaahailey"><img src="https://avatars.githubusercontent.com/u/56154510?v=4" width="100px"></a>|
  
## 개발 환경  
- Front-End : HTML / CSS / Vanilla JavaScript
- Back-End : 제공된 API
  
## 프로젝트 구조  
- src/ : .css, .js, 이미지(아이콘)
- templates/ : .html
```bbash
├── README.md
├── src
│   ├── css
│   │   ├── add_product.css
│   │   ├── chat_list.css
│   │   ├── chat_room.css
│   │   ├── feed.css
│   │   ├── followerList.css
│   │   ├── join_membership.css
│   │   ├── join_profile.css
│   │   ├── login.css
│   │   ├── login_email.css
│   │   ├── menubar.css
│   │   ├── mypage.css
│   │   ├── postDetail.css
│   │   ├── profile_modification.css
│   │   ├── reset.css
│   │   ├── search.css
│   │   ├── splash.css
│   │   ├── upload.css
│   │   ├── userpost.css
│   │   └── yourpage.css
│   ├── images
│   │   ├── chat
│   │   ├── feed
│   │   ├── followers
│   │   ├── join
│   │   ├── login
│   │   ├── menubar
│   │   ├── mypage
│   │   ├── postdetail
│   │   ├── product
│   │   ├── search
│   │   ├── splash
│   │   ├── upload
│   │   └── userpost
│   └── js
│       ├── add_product.js
│       ├── chat_room.js
│       ├── feed.js
│       ├── followerList.js
│       ├── goback.js
│       ├── index.js
│       ├── isLogined.js
│       ├── join_membership.js
│       ├── join_profile.js
│       ├── login_email.js
│       ├── module.js
│       ├── mypage.js
│       ├── postDetail.js
│       ├── profile_modification.js
│       ├── search.js
│       ├── upload.js
│       └── yourpage.js
└── templates
    ├── add_product.html
    ├── chat_list.html
    ├── chat_room.html
    ├── feed.html
    ├── followerList.html
    ├── index.html
    ├── join_membership.html
    ├── join_profile.html
    ├── login.html
    ├── login_email.html
    ├── modal
    │   ├── modal.css
    │   └── modal.js
    ├── modules
    │   ├── menubar.html
    │   └── userpost.html
    ├── mypage.html
    ├── postDetail.html
    ├── profile_modification.html
    ├── search.html
    ├── upload.html
    └── yourpage.html
```
<img src="https://user-images.githubusercontent.com/73277502/154792669-8cb25279-b55b-4fe2-9733-aaad0e922121.png" width="600px">
  
## 역할  
### [심채영](https://github.com/chaengs)  
- 로고 제작, 사용자 프로필 페이지, 페이지별 링크 연결
  
### [임한민](https://github.com/hanminss)  
- 로그인 페이지, 회원가입 페이지, 게시물 작성 페이지, 상품 등록 페이지
  
### [지다혜](https://github.com/daaahailey)  
- 게시글 피드 페이지, 검색 페이지, 모달(삭제, 수정, 로그아웃) 구현, 좋아요와 댓글 구현
  
## UI  
![슬라이드1](https://user-images.githubusercontent.com/73277502/154797157-314ff6fc-fcaa-4876-8c7a-3648c207687c.png)
  
## 페이지 기능  
### 🍇초기화면  
|🔗[스플래쉬](https://github.com/chaengs/PODOmarket/wiki#splash)|🔗[로그인](https://github.com/chaengs/PODOmarket/wiki#로그인)|🔗[회원가입](https://github.com/chaengs/PODOmarket/wiki#회원가입)|
|:-----:|:-----:|:-----:|
|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154804686-c2fd1757-218c-4d40-a3b4-f21f0f85e5dc.gif"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154804587-f2b19184-ab04-4433-a22e-7631a380993d.gif"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154804740-4f8b9610-f198-40b7-92f2-cadbc641ab79.gif"></p>|
  
### 🍇홈
|🔗[피드](https://github.com/chaengs/PODOmarket/wiki#홈-화면피드)|🔗[검색](https://github.com/chaengs/PODOmarket/wiki#검색)|
|:---:|:---:|
|<p align="center"><img width="300px" src="https://user-images.githubusercontent.com/73277502/154805261-41771b43-7229-464f-8f5b-c4a6f051c4e6.png"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154805207-fea0179b-f31f-49ea-a32b-bc288318d3b8.gif"></p>|
  
### 🍇프로필 페이지
|🔗[프로필 페이지](https://github.com/chaengs/PODOmarket/wiki#프로필-페이지)|🔗[피드 표기 방식](https://github.com/chaengs/PODOmarket/wiki#나의-프로필-페이지)|🔗[프로필 수정](https://github.com/chaengs/PODOmarket/wiki#프로필-수정)|
|:---:|:---:|:---:|
|<p align="center"><img width="300px" src="https://user-images.githubusercontent.com/73277502/154805031-c11104a5-eb6c-42de-85f9-80752b12a131.png"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154805091-d35b7912-a25b-42b9-a49f-c0ccd53cb51d.gif"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154804818-eff2fbcf-edb6-473f-9d69-9107c56e36ca.gif"></p>|
  
### 🍇게시글
|🔗[상품 등록](https://github.com/chaengs/PODOmarket/wiki#상품-등록)|🔗[게시글 작성](https://github.com/chaengs/PODOmarket/wiki#게시글-작성)|🔗[좋아요/댓글](https://github.com/chaengs/PODOmarket/wiki#좋아요)|
|:---:|:---:|:---:|
|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154804870-7eab520f-d817-492e-b491-08cbf1eefc01.gif"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154804913-271819c0-7f9e-49ae-be67-e6101445a25a.gif"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154804894-81bcf81e-1d24-446a-aace-5b081a35ebf9.gif"></p>|
|🔗[게시글 삭제](https://github.com/chaengs/PODOmarket/wiki#게시글-삭제)|🔗[채팅](https://github.com/chaengs/PODOmarket/wiki#채팅방)|
|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154805185-f56b54ac-209b-402f-b20d-9bc986aebd45.gif"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/73277502/154804793-3bade49a-8986-4851-a744-d3078deaf007.gif"></p>|
