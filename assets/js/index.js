/* 커서 이벤트 */
$(document).ready(function(){
  const $cursor = $(".cursor");
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
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.sec').forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top top',
    pin: true,
    pinSpacing: false
  });
});

/* gsap 마우스포인트 이벤트 */
let activeImage = null;

let activeAlignFn = null;

gsap.utils.toArray('.list').forEach((elem) => {
  const image = elem.querySelector('img.fade');
  if (!image) return;

  const xTo = gsap.quickTo(image, "x", { duration: 0.5, ease: "elastic.out(1, 0.3)" });
  const yTo = gsap.quickTo(image, "y", { duration: 0.5, ease: "elastic.out(1, 0.3)" });

  const align = e => {
    xTo(e.clientX);
    yTo(e.clientY);
  };

  const startTracking = () => document.addEventListener('mousemove', align);
  const stopTracking = () => document.removeEventListener('mousemove', align);

  const fade = gsap.to(image, { autoAlpha: 0.8, ease: 'none', paused: true });

  elem.addEventListener('mouseenter', (e) => {

    if (activeAlignFn && activeAlignFn !== align) {
      document.removeEventListener('mousemove', activeAlignFn);
    }
    activeAlignFn = align;

    fade.play();

    if (activeImage && activeImage !== image) {
      gsap.set(image, {
        x: gsap.getProperty(activeImage, "x"),
        y: gsap.getProperty(activeImage, "y")
      });
    }

    activeImage = image;
    align(e);
    startTracking();
  });

  elem.addEventListener('mouseleave', () => {
    fade.reverse();
    stopTracking();

    if (activeAlignFn === align) {
      activeAlignFn = null;
    }
  });
});
