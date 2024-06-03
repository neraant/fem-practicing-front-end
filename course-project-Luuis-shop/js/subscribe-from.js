let subscribeForm = document.querySelector(".input__block");
let subscribeModal = document.querySelector(".email__modal");
let subscribeBtn = document.querySelector(".inp__btn");
let subscribeSpan = document.querySelector(".close__modal");
let emailInput = document.querySelector(".inp__email");

subscribeForm.addEventListener("submit", function(event) {
    event.preventDefault();
})

subscribeBtn.onclick = function(){
    if(emailInput.value.trim() != ''){
        subscribeModal.style.display = "block";
        emailInput.value = '';
    }
}