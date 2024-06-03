$(document).ready(function(){
    $('.slider').slick({
        slidesToShow: 3,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        easing: 'ease',
        touchThreshold: 10,
        waitForAnimate: false,
    });
});