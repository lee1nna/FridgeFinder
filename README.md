# 🛒 Fridge Finder - 냉장고 털기
- 밥은 해먹어야 하는데 장보러가 가기는 귀찮고.. 냉장고에 있는 메뉴들로 해먹을만한 거 없을까?
- 냉장고에 있는 재료를 입력하면 메뉴를 추천해주는 웹앱
- 공공 API인 [식품의약품안전처\_조리식품의 레시피](https://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=661&show_cnt=10&start_idx=1&svc_no=COOKRCP01) API 를 사용
- 회원가입과 레시피 보관 기능을 위해 Firebase 사용

## 👩🏻‍💻 로컬에서 시작하기

```
# 로컬 환경에 Clone하기
git clone https://github.com/lee1nna/FridgeFinder.git

# 디펜던시 설치하기
npm install

# 개발 서버 실행하기
npm run start
```

## 🌐 배포

- gh-pages 로 배포
- 배포된 사이트 : [냉장고털기](https://lee1nna.github.io/FridgeFinder/)

## 🚀 스택

- React 18.3.1
- Styled-component 6.1.12
- TypeScript 4.9.5
- Firebase 10.13.0

## 🙌 Preview

<img src="https://github.com/user-attachments/assets/265b8f88-c9e1-483a-9d60-cad6af26f076">

## 📚 이슈 기록

- [react-router 사용해 페이지 라우터 적용하기](https://hann-nnah.tistory.com/15)
- [useRef 사용시 The expected type comes from property 'ref' which is declared here on type 에러 (+ useRef 3가지 정의)](https://hann-nnah.tistory.com/17)
