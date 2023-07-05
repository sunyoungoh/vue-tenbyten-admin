#tenbyten admin
> 텐바이텐 파트너 어드민 페이지 사용이 번거로워 오픈 API를 활용하여 개발한 어드민 사이트입니다.


![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/51437B3A-F0B5-44FC-8A07-4CEEA5925A6D_2/RBs2MWFA3vo4LpWznbTdMgM2EgGPWUzFCtHeha6gtiYz/00_.png)


## 주요 기술


####  Front End

- Vue2
- Vuex
- Chart.js
- CryptoJS

####  Back End

- Node.js
- express
- MogoDB atlas
- nodemailer
- CryptoJS
<br>

---

## 기능 설명

### 로그인 화면 🔐

> 텐바이텐 업체 아이디와 API키값으로 로그인 할 수 있는 로그인 페이지입니다.

- 텐바이텐 API는 별도의 인증절차가 없으므로 사용자가 입력한 아이디와 API 호출 결과의 `brandid` 값과 대조하여 로그인 진행
- API키값 보안을 위해 `CryptoJS` 로 `AES256` 암호화 하여 `axios` 요청

![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/204FC62D-9C83-4C46-8B67-0308B759C74E_2/TsOrzRMrjyBQzNE9mK89TfjLsI8AdMS3C8LojE2SieEz/AnimatedImage.gif)


<br>

### 홈 화면 🏠

> 당월 판매 개수와 6개월치 판매 그래프를 보여주는 화면입니다.

![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/2F50675F-8DB4-4BDC-BCC3-C54D5A9E3B99_2/4OeDEAxijcWqXu8lMPLJ5yrRJbM3d1oIjpn1UFoZneAz/Image.png)

<br>

### 신규 주문 🔖
> 신규 주문 정보를 확인하는 페이지입니다.

- 신규 주문 필드별 오름차순, 내림차순 정렬

![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/1648161D-0E8F-430F-9BC6-6D33ACDDF2CC_2/wOrhfQLRSLapoQoL9gp6d9Y9Hwx4yUufvajeN3CI7Bwz/AnimatedImage.gif)

- 반응형 구현

![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/4731E21F-0354-4D1F-9C29-51E88B939F1A_2/aw9S5lKItMEFTneosOMaSmG7d0ymlSwrNboqMSy2MXkz/AnimatedImage.gif)

<br>

### 배송 준비 📦

> 배송 준비 중인 주문 내역을 확인하고 메일 발송 및 운송장 등록을 할 수 있는 페이지입니다.

**기능**

- 메일 발송 (디지털 상품 발송)
  - 수신 이메일 기준 : 1. 주문메모에 이메일  2. 사용자 이메일
    - 정규식을 활용하여 test() 이메일 여부를 검증하고 match()로 이메일만 추출하여 메일을 발송합니다. (백엔드에서 Nodemailer 모듈을 사용하여 발송)
- 운송장 등록
- 모든 주문 메일 발송 및 송장 한번에 등록하기
- 발송 성공한 주문내역 정보 mongoDB에 데이터 저장 (발송내역 , 판매내역 페이지에서 활용)

| 발송 성공 | 발송 실패 |
| --- | --- |
| ![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/19D19FB2-2796-4995-88B0-B4973C08EB69_2/zqEmQfD15h9ag30jfEvaVaE8h9K7lB1UiyeQLSdZB7gz/AnimatedImage.gif) | ![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/BF028274-1214-464B-9EC0-30F775CE031F_2/lmbQqflmTTnLzw1eIROgOn3IwFLVhAgyht0p8MUHYBgz/AnimatedImage.gif) |

<br>

### 발송 내역 💌

> 메일 발송을 성공한 내역을 월별로 보여주는 페이지입니다.

**기능**

- < >  버튼을 통한 월별 메일 발송 내역 조회
- 필드별 오름차순, 내림차순 정렬
- 이름 검색 기능

![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/51599BBD-2348-45D6-87A5-D9E04E592433_2/TxgBqLc0Vd8x58755FPi4uSLblQCi43JgLIBRIoRZVgz/AnimatedImage.gif)

<br>

## 판매 내역 💰

> 월별 판매내역과 매출, 판매 순위, 탑3를 보여주는 페이지입니다.

**기능**

- < >  버튼을 통한 월별 판매 내역 조회
- 필드별 오름차순, 내림차순 정렬
- 아이템 고유 `itemId` 기준으로 취합하여 탑3 통계
![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/D6223A4C-9FB9-4C7C-9596-29137245CD92_2/6N6PZj4iD0U1vi5sH9ikbn8xPPpT8ZWpOTo3qn34C1gz/AnimatedImage.gif)

<br>

## 고객 문의 🤔
> 일주일간 등록된 고객 문의를 확인하고 답변을 달 수 있는 페이지입니다.

**기능**
- 미답변, 답변, 전체 문의 보기
- 답변 달기, 보기
- 미답변 문의 있을 시 헤더 탭 우측상단에 뱃지 표시


| 시연 영상 | 답변 여러 개일 때 캡쳐 |
| --- | --- |
| ![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/8942EB20-7621-4509-BD25-35B937DB2768_2/FLEPs7B5Z67pYExtvLjm5ZGwQsPkaU1NwEdSm6k0DS8z/AnimatedImage.gif) | ![image](https://res.craft.do/user/full/d4e66ef7-7b8e-371b-14c6-b9740c2eb54b/doc/EA4011A5-F502-4A8D-9CFA-DDA56B675C3D/A5A63E6F-CBD7-4182-BCF6-28612FAA056A_2/NQDjHd5hsvIsQRkIOGCFxCmluoKdUT4vKzjxCuFBZS8z/06_.jpeg) | 