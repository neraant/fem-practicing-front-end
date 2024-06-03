document.addEventListener("DOMContentLoaded", function() {
    // Работа с ссылкой старницы
     let url = window.location.href; // Получаем URL текущей страницы
     let webNum = 0;

     if (url.includes('/collection-page.html')) {
         webNum = 1;
     } else if (url.includes('/for-her-page.html')) {
         webNum = 2;
     } else if (url.includes('/for-him-page.html')) {
         webNum = 3;
     } else if (url.includes('/index.html')) {
         webNum = 4;
     } else if (url.includes('/about-page.html')) {
         webNum = 5;
     }
     
     // Получение всех необходимых элементов
     let iconCart = document.querySelector('.cart');
     let closeBtn = document.querySelector('.close');
     let body = document.querySelector('body');
     let listProductHTML = document.querySelector('.product__container');
     let listCartHtml = document.querySelector('.listCart');
     let productsQuantity = document.querySelector(".products__quantity");

     // Добавление товара в корзину
     let cardProductHTML = document.querySelectorAll('.product__card');
     cardProductHTML.forEach(card => {
         card.addEventListener('click', (event) => {
             let position = event.target;
             if(position.classList.contains('add__to__cart__button')){
                 // Получение id товара для добавления в корзину
                 let productIdFromUrl = new URLSearchParams(window.location.search);
                 let Idurl = productIdFromUrl.get('id')

                 // Проверка, что размер выбран
                 let selectedSizeHtml  = document.querySelector('.product__card__dot__button.selected');

                 if(parseInt(Idurl) >= 13 && parseInt(Idurl) <= 24)
                 {
                     addToCart(Idurl);
                 }
                 else if(!selectedSizeHtml){
                     console.log("need size");
                 }
                 else
                 {
                     // Получаем выбранный размер
                     let selectedSize = selectedSizeHtml.textContent; // Здесь вам нужно будет написать код для получения выбранного размера

                     addToCart(Idurl, selectedSize);
                 }
             }
         });
     });

     let listProducts = [];
     let carts = [];
     
     iconCart.addEventListener('click', function(){
         body.classList.toggle('showCart');
     });
     closeBtn.addEventListener('click', function(){
         body.classList.toggle('showCart');
     });

     const addDataToHtml = () => {
         listProductHTML.innerHTML = '';
         if(listProducts.length > 0){
             listProducts.forEach(product => {

                 // Добавление id товара для загрузки
                 let newProduct = document.createElement('div');
                 newProduct.classList.add('product__inner');
                 newProduct.dataset.id = product.id;

                 // Добавление типа товара в класс
                 let productType = product.type;
                 newProduct.classList.add(productType);

                 // Добавление id товара для загрузки
                 let productDescription = document.createElement('div');
                 productDescription.classList.add('product__description');
                 productDescription.dataset.id = product.id;

                 // Определяем URL в зависимости от webNum и id товара
                 let productUrl = `/product.html?id=${product.id}`;

                 if(webNum == 1 && product.id >= 1 && product.id <= 12) 
                 {
                     for(let i = 1; i <= 12; i++ )
                     {
                         newProduct.innerHTML = `
                         <a href="${productUrl}" class="product__image__link">
                             <img src="${product.image}" alt="product-image" class="product__image">
                         </a>
                         <div class="product__description">
                             <div class="prodcut__information">
                                 <div class="product name">
                                     ${product.name}
                                 </div>  
                                 <div class="product__cost">
                                     ${product.price}$
                                 </div>
                             </div>
                         </div>
                         `;
                     }
                     listProductHTML.appendChild(newProduct);
                 }
                 if(webNum == 2 && product.id >= 13 && product.id <= 30) 
                 {
                     for(let i = 13; i <= 30; i++)
                     {
                         newProduct.innerHTML = `
                         <a href="${productUrl}" class="product__image__link">
                             <img src="${product.image}" alt="product-image" class="product__image">
                         </a>
                         <div class="product__description">
                             <div class="prodcut__information">
                                 <div class="product name">
                                     ${product.name}
                                 </div>  
                                 <div class="product__cost">
                                 ${product.price}$
                                 </div>
                             </div>                       
                         </div>
                         `;
                     }
                     listProductHTML.appendChild(newProduct);
                 }
                 if(webNum == 3 && product.id >= 31 && product.id <= 42) 
                 {
                     for(let i = 31; i <= 42; i++ )
                     {
                         newProduct.innerHTML = `
                         <a href="${productUrl}" class="product__image__link">
                             <img src="${product.image}" alt="product-image" class="product__image">
                         </a>
                         <div class="product__description">
                             <div class="prodcut__information">
                                 <div class="product name">
                                     ${product.name}
                                 </div>  
                                 <div class="product__cost">
                                 ${product.price}$
                                 </div>
                             </div>                 
                         </div>
                         `;
                     }
                     listProductHTML.appendChild(newProduct);
                 }

                 // Обработчик клика для каждого продукта
                 newProduct.addEventListener('click', (event) => {
                 event.preventDefault(); // Предотвращаем стандартное поведение ссылки
                 // Переход на страницу продукта с уникальным ID
                 window.location.href = productUrl;
             });
             })
         }
     }

     const addToCart = (product_id) => {
         let size;
         // Если ID товара от 13 до 25, устанавливаем размер "N"
         if (product_id >= 13 && product_id <= 24) {
             size = 'N';
         } else {
             // Иначе получаем выбранный размер
             size = localStorage.getItem('selectedSize');
         }
     
         let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id && value.size == size);
         if(positionThisProductInCart < 0){
             carts.push({
                 product_id: product_id,
                 size: size,
                 quantity: 1
             });
             productsQuantity.innerHTML++;
         }else{
             carts[positionThisProductInCart].quantity++;
             productsQuantity.innerHTML++;
         }
         addCartToHtml();
         addCartToMemory();
         localStorage.setItem('productsQuantity', productsQuantity.innerHTML);
     }
     
     const addCartToMemory = () => {
         localStorage.setItem('cart', JSON.stringify(carts));
     }

     const addCartToHtml = () => {
         listCartHtml.innerHTML = '';
         if(carts.length > 0) {
             carts.forEach(cart => {
                 let newCart = document.createElement('div');
                 newCart.classList.add('item');
                 newCart.dataset.id = cart.product_id;
                 let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id)
                 let info = listProducts[positionProduct];
                 newCart.innerHTML = `
                     <div class="product__cart__image">
                         <img src="${info.image}" alt="product-image">
                         <span class="products__size">
                             ${cart.size}
                         </span>
                     </div>
                     <div class="product__name">
                         ${info.name}
                     </div>
                     <div class="product__cost">
                         ${info.price * cart.quantity}$
                     </div>
                     <div class="quantity">
                         <span class="minus"><</span>
                         <span class="product_quantity">${cart.quantity}</span>
                         <span class="plus">></span>
                     </div>
                 `;
                 listCartHtml.appendChild(newCart);
             })
         }
     }    

     listCartHtml.addEventListener('click', (event) => {
         let positionClick = event.target;
         if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
             let product_id = positionClick.parentElement.parentElement.dataset.id;
             let type = 'minus';
             if(positionClick.classList.contains('plus')){
                 type = 'plus';
             }
             changeQuantity(product_id, type);
         }
     })

    const changeQuantity = (product_id, type) => {
         let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
         if(positionItemInCart >= 0){
             switch(type) {
                 case 'plus':
                     carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                     productsQuantity.innerHTML++;if(productsQuantity.innerHTML < 0){
                         productsQuantity.innerHTML = 0
                     }
                     break;

                 default:
                     let valueChange = carts[positionItemInCart].quantity - 1;
                     if(valueChange > 0){
                         carts[positionItemInCart].quantity = valueChange;
                         productsQuantity.innerHTML--;
                         if(productsQuantity.innerHTML < 0){
                             productsQuantity.innerHTML = 0
                         }
                     }else{
                         carts.splice(positionItemInCart, 1);
                         productsQuantity.innerHTML--;
                         if(productsQuantity.innerHTML < 0){
                             productsQuantity.innerHTML = 0
                         }
                     }
                     break;
             }
         }
         addCartToMemory();
         addCartToHtml();
         localStorage.setItem('productsQuantity', productsQuantity.innerHTML);
     }
     
    const addFilteringHtml = () => {
        // Получение кнопки фильтрации, продукта и отмены
        let filterButtons = document.querySelectorAll('.filter__button');
        let products = document.querySelectorAll('.product__inner');
        let resetBtn = document.querySelector('.close__filter');

        // Проверка на существование элементов на странице
        if (filterButtons && products && resetBtn) {
           filterButtons.forEach(button => {
             button.addEventListener('click', () => {
                 const category = button.textContent.trim();

                 // Проверяем, была ли кнопка уже нажата
                 if (button.dataset.clicked === 'true') {
                     // Если кнопка была нажата, отменяем фильтрацию
                     products.forEach(product => {
                         product.style.display = 'block';
                     });

                     button.style.boxShadow = '';
                     button.dataset.clicked = 'false'; // Сбрасываем состояние кнопки
                 } else {
                     // Если кнопка не была нажата, применяем фильтрацию
                     products.forEach(product => {
                         let productCategory = product.classList[1];

                         if (productCategory === category) {
                             product.style.display = 'block';
                         } else {
                             product.style.display = 'none';
                         }
                     });

                     // Сбрасываем стили и состояние всех кнопок
                     filterButtons.forEach(btn => {
                         btn.style.boxShadow = '';
                         btn.dataset.clicked = 'false';
                     });

                     // Применяем стили и состояние к нажатой кнопке
                     button.style.boxShadow = '0px 0px 15px 4px rgba(0,0,0,0.39) inset';
                     button.dataset.clicked = 'true';
                 }
             });
         });

         resetBtn.addEventListener('click', () => {
             // Сбрасываем стили и состояние всех кнопок
             filterButtons.forEach(btn => {
                 btn.style.boxShadow = '';
                 btn.dataset.clicked = 'false';
             });

             // Показываем все продукты
             products.forEach(product => {
                 product.style.display = 'block';
             });
         }); 
        }
    }

    const initApp = async () => {
        // Получение данных из json файла
        let response = await fetch('product.json');
        let data = await response.json();
     
        listProducts = data;
        addDataToHtml();
        addFilteringHtml();
     
        // Получение корзины из памяти
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHtml();
        }
        if(localStorage.getItem('productsQuantity')){
            productsQuantity.innerHTML = localStorage.getItem('productsQuantity');
        }
    }
    console.log(localStorage)
    initApp();        
});