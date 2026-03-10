/* cursor */
$(document).ready(function () {
  const $cursor = $(".cursor");
  if (!$cursor.length) return;

  $(document).on("mousemove", function (e) {
    if ($(window).width() <= 540) return;
    $cursor.css({
      top:  (e.clientY - 15) + "px",
      left: (e.clientX - 30) + "px"
    });
  });

  $(document).on("mouseenter", "a, button, .list, [href]", function () {
    if ($(window).width() <= 540) return;
    $cursor.addClass("is-hover");
  }).on("mouseleave", "a, button, .list, [href]", function () {
    $cursor.removeClass("is-hover");
  });

  /* skill icon hover */
  const skills = [
    { n: 1, off: "html.svg",       on: "html2.svg"       },
    { n: 2, off: "css.svg",        on: "css2.svg"        },
    { n: 3, off: "jquery.svg",     on: "jquery2.svg"     },
    { n: 4, off: "javascript.svg", on: "javascript2.svg" },
    { n: 6, off: "figma.svg",      on: "figma2.svg"      },
    { n: 7, off: "photoshop.svg",  on: "photoshop2.svg"  },
  ];
  skills.forEach(({ n, off, on }) => {
    $(".skills_wrap img:nth-child(" + n + ")")
      .on("mouseenter", function () { $(this).attr("src", "assets/images/ui/" + on);  })
      .on("mouseleave", function () { $(this).attr("src", "assets/images/ui/" + off); });
  });
});

/* project_sec */
gsap.registerPlugin(ScrollTrigger);

const mob = gsap.matchMedia();

mob.add("(min-width: 540px)", () => {
  const sections = gsap.utils.toArray('#project_sec .sec');

  // 패널 고정
  sections.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: false
    });

    // 진입: 아래에서 슬라이드업
    gsap.from(el, {
      scale: 0.7,
      yPercent: 6,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'top top',
        scrub: true
      }
    });

    // 이탈: 뒤로 물러나며 축소 (마지막 패널 제외)
    if (i < sections.length - 1) {
      gsap.to(el, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  });
});

/* swiper */
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    280:  { slidesPerView: 1 },
    768:  { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

/* list_sec */
let activeImage;

gsap.utils.toArray('#list_sec .list_wrap a.list').forEach((elem) => {
  const image = elem.querySelector('img.fade');

  // quickTo로 생성한 헬퍼 함수를 저장해 mousemove 시 재사용
  const xTo = gsap.quickTo(image, "x", { duration: 0.5, ease: "power3" });
  const yTo = gsap.quickTo(image, "y", { duration: 0.5, ease: "power3" });
  const fade = gsap.to(image, { autoAlpha: 1, ease: 'none', paused: true });

  const onMove = (e) => { xTo(e.clientX); yTo(e.clientY); };

  elem.addEventListener('mouseenter', (e) => {
    
    gsap.set(image, {
      x: activeImage ? gsap.getProperty(activeImage, "x") : e.clientX,
      y: activeImage ? gsap.getProperty(activeImage, "y") : e.clientY,
    });
    activeImage = image;
    fade.play();
    document.addEventListener('mousemove', onMove);
  });

  elem.addEventListener('mouseleave', () => {
    fade.reverse();
    document.removeEventListener('mousemove', onMove);
  });
});

$(document).ready(function(){

  let totalNum = $('.swiper-slide a').length;
  let pageNum = 0;

  //각 목록을 클릭했을때 해당내용 나옴
  $(".swiper-slide a").click(function(){
    pageNum = $(".swiper-slide a").index(this);
    $(".page-num span:nth-child(1)").text(pageNum+1); //현재 페이지번호
    $(".modal-content li").eq(pageNum).stop().fadeIn(); //클릭한 해당목록의 내용
    $(".modal").stop().fadeIn(); //검정배경
    $(".modal").scrollTop(0); //새로 창을 열때는 항상 맨위로 이동하여 보이게 함
    $("body").addClass("modal-open"); //배경 스크롤 막기
  });

  //이전다음버튼
  $(".pre").click(function(){
    $(".modal").scrollTop(0);
    if(pageNum > 0){
      $(".modal-content li").eq(pageNum).hide(); 
      pageNum--;
      $(".page-num span:nth-child(1)").text(pageNum+1); 
      $(".modal-content li").eq(pageNum).stop().fadeIn();
    };
  });
  $(".next").click(function(){
    $(".modal").scrollTop(0);
    if(pageNum < totalNum-1){
      $(".modal-content li").eq(pageNum).hide(); 
      pageNum++;
      $(".page-num span:nth-child(1)").text(pageNum+1); 
      $(".modal-content li").eq(pageNum).stop().fadeIn();
    };
  });

  //닫기버튼
  //모달창에 컨텐츠가 포함이 되어 있기때문에 모달부분을 클릭할때도 닫히게 하면 컨텐츠를 클릭해도 담힘
  // $(".close, .modal").click(function(){
  $(".close").click(function(){
    $(".modal").stop().fadeOut();
		$(".modal-content li").stop().fadeOut();
    $("body").removeClass("modal-open"); //배경 스크롤 복원
  });

});
