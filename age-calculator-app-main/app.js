"use strict";

document.addEventListener("DOMContentLoaded", () => {

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1; 
    let currentDay = currentDate.getDate();
    console.log("Current date: " + currentDay + '.' + currentMonth + '.' + currentYear)

    const form = document.querySelector('.form');
    const formBtn = document.querySelector('.form-btn');

    formBtn.addEventListener('click', formSend);

    function formSend(event) {
        event.preventDefault();

        let error = formValidate(form);

        if(error === 0){
            console.log("Errors quantity: " + error);

            let userYear = document.querySelector('.year-input').value;
            let userMonth = document.querySelector('.month-input').value;
            let userDay = document.querySelector('.day-input').value;

            userYear = userYearCalculate(userYear, userMonth);
            userMonth = userMonthCalculate(userMonth, userDay);
            userDay = userDayCalculate(userYear, userMonth, userDay);

            console.log("years: " + userYear)
            console.log("months: " + userMonth)
            console.log("days: " + userDay)

            let yearHTML = document.querySelector('.year');
            let monthHTML = document.querySelector('.month');
            let dayHTML = document.querySelector('.day');

            yearHTML.innerHTML = '';
            monthHTML.innerHTML = '';
            dayHTML.innerHTML = '';

            yearHTML.innerHTML = userYear;
            monthHTML.innerHTML = userMonth;
            dayHTML.innerHTML = userDay;

            yearHTML.style.letterSpacing = '1px';
            monthHTML.style.letterSpacing = '1px';
            dayHTML.style.letterSpacing = '1px';

        }
        else{
            console.log("Errors quantity: " + error);
        }
    }

    function formValidate(form){
        let labels = document.querySelectorAll('.label');
        let errorMessages = document.querySelectorAll('.error-message');
        let requiredInputs = document.querySelectorAll('._req');
        let error = 0;

        for(let i = 0; i < requiredInputs.length; i++){
            let input = requiredInputs[i];
            let errorMessage = errorMessages[i];
            let label = labels[i];

            removeError(input, label, errorMessage);

            if(input.value === ''){
                addError(input, label, errorMessage);
                error++;
            }
            else if(!isNumber(input.value)){
                addError(input, label, errorMessage);
                error++;
            }
            else if(isNumber(input.value) && input.value < 0){
                addError(input, label, errorMessage);
                error++;
            }
            else if(input.classList.contains('year-input')){
                if(input.value > currentYear){
                    addError(input, label, errorMessage);
                    error++;
                }
            }
            else if(input.classList.contains('month-input')){
                if(!(input.value > 0 && input.value <= 12)){
                    addError(input, label, errorMessage);
                    error++;
                }
            }
            else if(input.classList.contains('day-input')){
                if(!(input.value > 0 && input.value <= 31)){
                    addError(input, label, errorMessage);
                    error++;
                }
            }
        }

        return error;
    }

    function addError(input, label, errorMessage){
        input.parentElement.classList.add('error');
        input.classList.add('error');

        label.classList.add('error');

        errorMessage.classList.add('error');
    }

    function removeError(input, label, errorMessage){
        input.parentElement.classList.remove('error');
        input.classList.remove('error');

        label.classList.remove('error');

        errorMessage.classList.remove('error');
    }

    function isNumber(input){
        return Number.isInteger(Number(input));
    }

    function userYearCalculate(birthYear, birthMonth){
        let year = currentYear - birthYear;

        if(currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)){
            year--;
        }
        
        return year;
    }

    function userMonthCalculate(birthMonth, birthDay){
        let monthDifference = currentMonth - birthMonth;

        if(monthDifference < 0 || (monthDifference === 0 && currentDay < birthDay)){
            monthDifference += 12;
        }
        if(currentDay < birthDay){
            monthDifference--;
        }
        
        return monthDifference;
    }

    function userDayCalculate(birthYear, birthMonth, birthDay){
        let dayDifference = currentDay - birthDay;

        if(dayDifference < 0){
            let daysInLastMonth;

            if(currentMonth === 1){
                daysInLastMonth = new Date(currentYear - 1, 12, 0).getDate();
            } else {
                daysInLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
            }

            dayDifference += daysInLastMonth;
        }

        return dayDifference;
    }
});