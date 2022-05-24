# NETFLIX

## STEP 1 : 라우팅

- react-router-dom
- 총 3개의 페이지
  - /
  - /tv
  - /search

## Header 구현

- nav로 감싸고 두 개의 열을 구성
- framer motion 사용
  - 로고 : hover 시 로고 색상이 비워지고 채워지는 것을 반복
    - variants 사용, fill 배열 사용
  - nav : 해당하는 화면에 있을 때 아래에 동그라미가 표시되도록
    - Link, useMatch, 중앙 정렬, layoutId 사용
  - 검색
    - 두 개의 애니매이션을 똑같이 자연스럽게 움직이기를 원한다면 두 개 모두에게 transition type linear 지정
    - `transform-origin: right center;` -> 애니매이션의 시작 위치 지정
  - 헤더 색상
    - useViewportScroll의 scrollY 사용
    - 값에 따라 animation을 코드로 조작하는 방법(useAnimation) vs props로 바로 지정해주는 방법

## 홈 화면 구현

- API 통신 (react-query)
- `background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});`
  - 투명해졌다가 어두워지는 효과 + 배경 이미지
- Slider 구현
  - AnimatePresence 활용: initial, animate, exit
  - key를 변경함으로써 렌더링이 새로 일어나는것같은 효과 재현
- 버그 발생: 연이어 배너를 클릭하면 큰 Gap이 생김
  - 해결방법: exit하는 동안에는 key가 증가하지 않도록 설정. 즉, 애니메이션이 발생하지 않도록 하는 것 (isLeaving이라는 상태를 둠)
  - AnimatePresence의 onExitComplete 함수를 이용하면 exit이 완료된 후에 isLeaving을 원래대로 돌려놓을 수 있음 -> key 값이 다시 증가하면서 애니메이션이 다시 발생할 수 있다는 뜻
- 버그 발생: 다른 페이지 갔다가 다시 돌아오면 슬라이더가 오른쪽에서 슬라이드하면서 들어옴. 처음에는 그냥 바로 위치해있는 것을 기대
  - 해결방법: AnimatePresence의 initial 속성 활용 -> 값을 false로 주게되면 처음 마운트될 때는 애니메이션이 동작하지 않음
- pagination 구현
  - offset, page(=index)
  - slice 함수 활용
  - 이미 배너에서 사용한 영화는 제외
  - index의 상한 지정
- search 기능 구현
  - react-hook-form 활용
  - useSearchParams을 통해서 query 파싱
