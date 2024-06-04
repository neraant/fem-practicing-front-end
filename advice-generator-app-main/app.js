"use strict";

document.addEventListener('DOMContentLoaded', function() {

    const button = document.querySelector('.generate-btn');
    const quote = document.querySelector('.advice-text');
    const adviceId = document.querySelector('.advice-id')
    const themeSwither = document.querySelector('.checkbox');

    themeSwither.addEventListener('click', changeTheme)
    button.addEventListener('click', getAdvice)
    
    async function getAdvice(){
        let url = 'https://api.adviceslip.com/advice';
        let response = await fetch(url);
    
        if (response.ok) {
    
            let dataJSON = await response.json();
            adviceId.innerHTML = dataJSON.slip.id;
            quote.innerHTML = dataJSON.slip.advice;
            
        } 
        else {
            console.log("Error!");
        }
    }

    function changeTheme(event){
        event.stopPropagation(); // Предотвращаем всплытие
        console.log('changeTheme вызвана');
        document.body.classList.toggle('light-theme'); 
    }

}); 