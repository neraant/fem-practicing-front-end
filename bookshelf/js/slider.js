$(document).ready(function(){
    $('.slider').slick({
        dots: true,
        slidesToShow: 3,
        infinite: true,
        speed: 500,
        easing: 'ease',
        touchThreshold: 10,
        waitForAnimate: false,
        autoplay: true,
        autoplaySpeed: 2000,
        easing: 'ease',
        responsive: [
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
});
