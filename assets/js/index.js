/* cursor */
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


  /* skill icon hover */
$(".skills_wrap img:nth-child(1)")
  .on("mouseenter", function(){ $(this).attr("src", "assets/images/ui/html2.svg"); })
  .on("mouseleave", function(){ $(this).attr("src", "assets/images/ui/html.svg"); });

$(".skills_wrap img:nth-child(2)")
  .on("mouseenter", function(){ $(this).attr("src", "assets/images/ui/css2.svg"); })
  .on("mouseleave", function(){ $(this).attr("src", "assets/images/ui/css.svg"); });
  
$(".skills_wrap img:nth-child(3)")
.on("mouseenter", function(){ $(this).attr("src", "assets/images/ui/jquery2.svg"); })
.on("mouseleave", function(){ $(this).attr("src", "assets/images/ui/jquery.svg"); }); 

  $(".skills_wrap img:nth-child(4)")
  .on("mouseenter", function(){ $(this).attr("src", "assets/images/ui/javascript2.svg"); })
  .on("mouseleave", function(){ $(this).attr("src", "assets/images/ui/javascript.svg"); });

  $(".skills_wrap img:nth-child(6)")
  .on("mouseenter", function(){ $(this).attr("src", "assets/images/ui/figma2.svg"); })
  .on("mouseleave", function(){ $(this).attr("src", "assets/images/ui/figma.svg"); });

  $(".skills_wrap img:nth-child(7)")
  .on("mouseenter", function(){ $(this).attr("src", "assets/images/ui/photoshop2.svg"); })
  .on("mouseleave", function(){ $(this).attr("src", "assets/images/ui/photoshop.svg"); });
});

/* about */
/* let list = gsap.utils.toArray('#about_sec ul li');
let scrollTween = gsap.to(list,{
  xPercent: -100 * (list.length - 1),
  ease:'none',
  scrollTrigger: {
    trigger: '#about_sec',
    start: 'center center',
    end: '300%', 
    pin: true,
    scrub: 1,
  }
}); */



/* gsap */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('#project_sec .sec').forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top top',
    pin: true,
    pinSpacing: false
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
    280: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
