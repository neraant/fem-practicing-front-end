"use strict";
document.addEventListener('DOMContentLoaded', function() {
    
    const formBtn = document.querySelector('.send-button ');
    formBtn.addEventListener('click', formSend);

    let form = document.querySelector('form');
    const successModal = document.querySelector('.success-modal-window');

    // Отмена отправки формы
    function formSend(event){
        event.preventDefault();

        let error = formValidate(form);

        if(error === 0){
            successModal.classList.add('sended');
            setTimeout(function() {
                successModal.classList.remove('sended');
            }, 2000);
        }
        else{
            successModal.classList.remove('sended');
            console.log(error);
        }
    }
    
    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        let errorMessages = document.querySelectorAll('.error-message');
        
        for(let i = 0; i < formReq.length; i++){
            const input = formReq[i];
            const errorMessage = errorMessages[i];
            formRemoveError(input, errorMessage);

            if(input.classList.contains('email')){
                if(emailTest(input)){
                    formAddError(input, errorMessage);
                    error++;
                }
            }
            else if(input.getAttribute("type") === "checkbox" && input.checked === false){
                formAddError(input, errorMessage);
                error++;
            }
            else{
                if(input.value === ''){
                    formAddError(input, errorMessage);
                    error++;
                }
            }
        }

        return error;
    }

    // Добавление/удаление класса _error
    function formAddError(input, errorMessage){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');

        errorMessage.style.display = "block";
    }
    function formRemoveError(input, errorMessage){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');

        errorMessage.style.display = "none";
    }

    // Проверка email
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    // Смена chekbox и т.п.
    function changeBackground() {
        const checkbox1 = document.getElementById('query1');
        const checkbox2 = document.getElementById('query2');
        const queryWrapper1 = document.getElementById('queryWrapper1');
        const queryWrapper2 = document.getElementById('queryWrapper2');

        console.log("click!");

        if (checkbox1.checked) {
            queryWrapper1.classList.add('checked');
        } else {
            queryWrapper1.classList.remove('checked');
        }

        if (checkbox2.checked) {
            queryWrapper2.classList.add('checked');
        } else {
            queryWrapper2.classList.remove('checked');
        }
    }
});