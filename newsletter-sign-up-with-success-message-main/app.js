"use strict";

document.addEventListener("DOMContentLoaded", () => {
    
    const formBtn = document.querySelector('.email-button');
    const form = document.querySelector('.form');

    formBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // const modalWindow = document.querySelector('.success-modal-window');
        let error = formValidate(form);

        if(error === 0){
            console.log("Success!");

            const modalWindow = document.querySelector('.modal-window');
            const pageElements = document.querySelector('.newsletter-container'); 

            modalWindow.style.display = 'flex';
            pageElements.style.display = 'none';

            modalWindow.addEventListener('click', (event) => { 
                if(event.target.classList.contains('close-modal-window')) {
                    modalWindow.style.display = 'none';
                    setTimeout(() => { modalWindow.style.display = 'none'; }, 300);
                    pageElements.style.display = 'flex'; 
                }
            });

        }
        else{
            console.log("Failed!");
        }
    });

    function formValidate(form){
        let error = 0;
        let input = document.querySelector('.email-input');
        let errorMessage = document.querySelector('.error-message');

        formRemoveError(input, errorMessage);

        if(emailTest(input)){
            formAddError(input, errorMessage);
            error++;
        }

        return error;
    }

    function formRemoveError(input, errorMessage){
        input.parentElement.classList.remove('error');
        input.classList.remove('error');

        errorMessage.classList.remove('error');
    }
    function formAddError(input, errorMessage){
        input.parentElement.classList.add('error');
        input.classList.add('error');    

        errorMessage.classList.add('error');
    }

    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

});