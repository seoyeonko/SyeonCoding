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
function transformNext(event) {
  console.log('next btn click!');
  const slideNext = event.target;
  const slidePrev = slideNext.previousElementSibling;

  // ul 태그 선택
  const classList = slideNext.parentElement.parentElement.nextElementSibling;
  let activeLi = classList.getAttribute('data-position');
  const liList = classList.getElementsByTagName('li');

  // data-position 값이 0보다 작다면, next(->) 버튼 활성화
  // 하나의 카드라도 왼쪽으로 이동시, 오른쪽으로 갈 수 있음
  if (Number(activeLi) < 0) {
    activeLi = Number(activeLi) + 260;

    // 왼쪽에 있던 카드가 오른쪽으로 갔다면, 다시 왼쪽으로 갈 수 있으므로 prev(<-)버튼 활성화
    slidePrev.style.color = '#2f3059';
    slidePrev.classList.add('slide-prev-hover');
    slidePrev.addEventListener('click', transformPrev);

    if (Number(activeLi) === 0) {
      slideNext.style.color = '#cfd8dc';
      slideNext.classList.remove('slide-next-hover');
      slideNext.removeEventListener('click', transformNext);
    }
  }

  // 이동 효과 부여 & data-position 값 수정
  classList.style.transition = 'transform 1s';
  classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
  classList.setAttribute('data-position', activeLi);
}

function transformPrev(event) {
  console.log('prev btn click!');
  const slidePrev = event.target;
  const slideNext = slidePrev.nextElementSibling;

  // ul 태그 선택
  const classList = slidePrev.parentElement.parentElement.nextElementSibling;
  let activeLi = classList.getAttribute('data-position'); // getAttribute: 해당 태그의 속성에 대한 값을 가져옴
  const liList = classList.getElementsByTagName('li');

  // classList.clientWidth: ul.class-list의 실제 width 값
  // liList.length * 260: li 개수 * 각 li의 너비 260px
  // Number(activeLi): 현재 위치값을 정수 형변환
  // classList.clientWidth < (liList.length * 260 + Number(activeLi))는 오른쪽으로 나열될 카드들이 넘친 상태: prev(<-) 이동 가능
  if (classList.clientWidth < liList.length * 260 + Number(activeLi)) {
    // 왼쪽으로 260 이동 (-260px): data-position 속성값 변경
    activeLi = Number(activeLi) - 260;

    // 왼쪽으로 넘어간 카드로 인해; ul.class-list 실제 width값 > liList.length * 260 + Number(activeLi) 값
    // prev(<-) 비활성화 && next(->) 활성화
    if (classList.clientWidth > liList.length * 260 + Number(activeLi)) {
      slidePrev.style.color = '#cfd8dc';
      slidePrev.classList.remove('slide-prev-hover');
      slidePrev.removeEventListener('click', transformPrev);
    }

    // next(->) 버튼 활성화
    slideNext.style.color = '#2f3059';
    slideNext.classList.add('slide-next-hover');
    slideNext.addEventListener('click', transformNext);
  }

  // 이동 효과 부여 & data-position 값 수정
  classList.style.transition = 'transform 1s';
  classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
  classList.setAttribute('data-position', activeLi);
}

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
    // 260px = 240px(width) + 20px(margin 좌우 10px씩)
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
