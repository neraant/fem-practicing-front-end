$(document).ready(function(){
    $('.product-slider').slick({
        autoplay: true,
        autoplaySpeed: 0,
        speed: 2500,
        slidesToShow: 10,       
        cssEase: "linear",
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows:false,
        variableWidth: true
    });
});