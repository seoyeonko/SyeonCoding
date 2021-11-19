const backToTop = document.getElementById('backtotop');

function checkScroll() {
  let pageYOffset = window.pageYOffset; // 문서가 수직으로 얼마나 스크롤 됐는지 픽셀 단위 반환

  if (pageYOffset !== 0) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}

function moveBackToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 스무스하게 스크롤
  }
}

window.addEventListener(
  'scroll',
  checkScroll
); /* scroll; checkScroll 함수 호출 */
backToTop.addEventListener('click', moveBackToTop); /* 화면을 맨 위로 올려줌 */
