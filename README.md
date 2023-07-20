## 네이버 오픈 API 쇼핑인사이트를 이용한 데이터 시각화 토이프로젝트 

특정 카테고리를 선택하고 검색어를 입력하면 연령별 통계를 그래프로 볼 수 있습니다.

---
### 기술스택
  - React + TypeScript
  - Redux + Redux Saga
  - Antd
  - Day.js
  - Rechart.js
- **빌드** :  `Creat-React-App`
- 실행 :  `npm start`

---
### 프로젝트 설명
- http-proxy-middleware 미들웨어 사용하여 프록시 설정 : CORS 오류 우회
- Antd를 이용한 화면 디자인
- Redux Saga로 API 호출 비동기 처리
- 응답데이터 Redux state로 저장
- 응답데이터 가공하여 차트 시각화
- Ages 다중선택
- 로딩 상태 관리
- env파일에 API KEY 저장

---

### 컴포넌트 기능 명세
1. `TrendAnalysis.tsx` :
   - 검색조건 입력 및 입력 데이터 검증
     - 타임유닛은 date로 초깃값을 주었습니다. 그 외 필수입력값은 제출시 검증하여 입력이 안되어있으면 return 처리를 해주었습니다.
     - Antd의 DatePicker 컴포넌트와 dayJS 라이브러리를 사용하여 미래날짜를 disabled 하였습니다.
   - 데이터 state로 저장하여 리덕스로 디스패치
2. `GraphView.tsx` :
   - 리덕스에서 받아온 데이터를 그래프로 그릴수 있는 데이터로 형태 가공하여 Rechart.js 로 렌더링
   - 로딩 상태와 검색결과 없는경우 조건부 렌더링

