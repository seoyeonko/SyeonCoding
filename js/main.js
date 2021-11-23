const backToTop = document.getElementById('backtotop');

const checkScroll = () => {
  let pageYOffset = window.pageYOffset; // 문서가 수직으로 얼마나 스크롤 됐는지 픽셀 단위 반환

  if (pageYOffset !== 0) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
};

const moveBackToTop = () => {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 스무스하게 스크롤
  }
};

window.addEventListener(
  'scroll',
  checkScroll
); /* scroll; checkScroll 함수 호출 */
backToTop.addEventListener('click', moveBackToTop); /* 화면을 맨 위로 올려줌 */

/////////////////////////////
const transformPrev = () => {
  console.log('prev btn click!');
};

const slidePrevList = document.getElementsByClassName('slide-prev');
console.log(slidePrevList);

// 3개의 <- 방향 화살표
for (let i = 0; i < slidePrevList.length; i++) {
  // ul 태그 선택
  let classList =
    slidePrevList[i].parentElement.parentElement.nextElementSibling; // ul.class-list 요소
  let liList = classList.getElementsByTagName('li'); // ul.class-list > li 개수
  console.log(liList);

  // 카드가 ul.class-list 태그 너비보다 넘치면,  prev(<-) 버튼 활성화 & 현재 맨 첫 카드이므로 next(->) 버튼 비활성화
  if (classList.clientWidth < liList.length * 260) {
    slidePrevList[i].classList.add('slide-prev-hover');
    slidePrevList[i].addEventListener('click', transformPrev);
  } else {
    // 카드가 ul.class-list 태그 보다 작다면, prev & next 버튼 삭제
    // 태그 삭제: 부모요소에서 removeChild를 통해 삭제

    const arrowContainer = slidePrevList[i].parentNode; // parentElement와 동일
    arrowContainer.removeChild(slidePrevList[i].nextElementSibling); // next(->) 오른쪽 버튼 삭제
    arrowContainer.removeChild(slidePrevList[i]); // prev(<-) 왼쪽 버튼 삭제: 자기자신
  }
}
