$(document).ready(function(){
    $('.gallery__slider').slick({
        slidesToShow: 1,
        infinite: true,
        speed: 500,
        easing: 'ease',
        touchThreshold: 10,
        waitForAnimate: false,
        arrows: true,
    });
});