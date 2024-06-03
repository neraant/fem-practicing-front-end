    document.addEventListener('DOMContentLoaded', (event) => {
        const hamburger_btn = document.querySelector('.hamburger');
        const mobile_nav = document.querySelector('.mobile__nav');
        const logo = document.querySelector('.logo');
        const cart = document.querySelector('.cart');
        
        hamburger_btn.addEventListener('click', function() {
            hamburger_btn.classList.toggle('is-active');
            mobile_nav.classList.toggle('is-active');
            logo.classList.toggle('is-active');
            cart.classList.toggle('is-active');
        });
        
        const submenuBtn = document.querySelector('.submenu__btn');
        const submenu = document.querySelector('.menu__sublist');
        
        submenuBtn.addEventListener('click', () => {
            submenu.classList.toggle('opened');
        });
        submenuBtn.addEventListener('mouseover', () => {
            submenu.classList.add('opened');
        });
        submenuBtn.addEventListener('mouseout', () => {
            submenu.classList.remove('opened');
        });
    });