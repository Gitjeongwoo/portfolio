/* 커서 이벤트 */
$(document).ready(function(){
  var $cursor = $(".cursor");
  if (!$cursor.length) return;

  $(document).on("mousemove", function(e){
    $cursor.css({
      top: (e.clientY - 15) + "px",
      left: (e.clientX - 15) + "px"
    });
  });

  $(document).on("mouseenter", "a, button, .list, [href]", function(){
    $cursor.addClass("is-hover");
  }).on("mouseleave", "a, button, .list, [href]", function(){
    $cursor.removeClass("is-hover");
  });
});

/* gsap 화면 겹치는 이벤트 */

$(function(){Splitting();});

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

var pinTriggers = [];

gsap.utils.toArray('.sec').forEach((sec, i) => {
  const video = sec.querySelector('.project_box video');
  if (video && i > 0) {
    gsap.set(video, {
      y: 120,
      scale: 0.8,
      rotateX: 22,
      z: -280,
      opacity: 1,
      force3D: true
    });
    gsap.to(video, {
      y: 0,
      scale: 1,
      rotateX: 0,
      z: 0,
      opacity: 1,
      ease: 'power2.out',
      duration: 1,
      scrollTrigger: {
        trigger: sec,
        start: 'top top',
        end: '+=100%',
        scrub: 0.5,
        invalidateOnRefresh: true,
      }
    });
  }

  var st = ScrollTrigger.create({
    trigger: sec,
    start: 'top top',
    pin: true,
    pinSpacing: false,
    scrub: true,
    invalidateOnRefresh: true,
  });
  pinTriggers.push(st);
});

/* gsap 마우스포인트 이벤트 */
gsap.registerPlugin(ScrollTrigger);

let activeImage;

gsap.utils.toArray('.list').forEach((elem) => {
  let image = elem.querySelector('img.fade');

  let align = e => {
    gsap.set(image, {
      x: e.clientX,
      y: e.clientY
    });
  };

  const startPoint = () => document.addEventListener('mousemove', align),
        stopPoint = () => document.removeEventListener('mousemove', align);

  let fade = gsap.to(image, {autoAlpha: 0.8, ease: 'none', paused: true});

  elem.addEventListener('mouseenter', (e) => {
    fade.play();

    if (activeImage) {
      gsap.set(image, {
        x: gsap.getProperty(activeImage, "x"),
        y: gsap.getProperty(activeImage, "y")
      });
    }

    activeImage = image;
    gsap.quickTo(image, "x", {duration: 0.5, ease: "elastic"});
    gsap.quickTo(image, "y", {duration: 0.5, ease: "elastic"});

    align(e);
    startPoint();
  });

  elem.addEventListener('mouseleave', () => {
    fade.reverse();
    stopPoint();
  });
});

/* $(document).on('click', 'a[href="#"]', function(e){
  e.preventDefault();
}); */

