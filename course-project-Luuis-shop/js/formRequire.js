let modal = document.getElementById("myModal");
let rejectModal = document.querySelector(".reject__modal");

let btn = document.getElementById("myBtn");
let spans = document.querySelectorAll(".close__modal");
let form = document.querySelector(".order__block");
let input = document.querySelector(".form__email");
let checkbox = document.querySelector(".check");

let cartList = document.querySelector(".listCart");
let productQnty = document.querySelector(".products__quantity");

// Отмена отправки всех форм (Отмена стандартного поведения формы)
form.addEventListener("submit", function(event) {
    event.preventDefault();
});

// Появление модальных окон
btn.onclick = function() {
  let itemsInCart = document.querySelectorAll('.listCart .item').length;
  
  if(input.value.trim() != '' && checkbox.checked && itemsInCart > 0)
  {
    modal.style.display = "block";

    cartList.innerHTML = '';
    productQnty.innerHTML = '0';
    localStorage.clear(); // Очистка localStorage после заказа

    localStorage.removeItem('cart');
    localStorage.setItem('productsQuantity', productsQuantity.innerHTML);
  }
  else if(itemsInCart == 0){
    rejectModal.style.display = "block";
  }
}

// Закрытие модальных окон
for (let i = 0; i < spans.length; i++) {
  spans[i].onclick = function() {
    modal.style.display = "none";
    rejectModal.style.display = "none";
    subscribeModal.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  else if (event.target == rejectModal) {
    rejectModal.style.display = "none";
  }
  else if(event.target == subscribeModal){
    subscribeModal.style.display = "none";
}
}