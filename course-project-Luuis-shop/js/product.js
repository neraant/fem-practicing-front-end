// Подгрузка днных из xml
document.addEventListener('DOMContentLoaded', (event) => {

    let params = new URLSearchParams(window.location.search);
    let urlId = params.get('id')

    fetch('/product-card.xml')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      console.log(data);
    
        // Загрузка главного изображения
        const loadDataXml = () => {

            let productCards = data.getElementsByTagName('productCard');

            for(let i = 0; i < productCards.length; i++){
                let id = productCards[i].getElementsByTagName('id')[0].textContent;
                if(id == urlId)
                {
                    
                    let mainImage = productCards[i].getElementsByTagName('mainImage');
                    let mainImageBlock = document.querySelector('.general__product__information');
            
                    let mainImageHtml = document.createElement('img');
                    mainImageHtml.className = 'product__card__image__main';
                    mainImageHtml.src = mainImage[0].textContent;
            
                    mainImageBlock.prepend(mainImageHtml);
            
                    // Загрузка названия и цены
                    let title = productCards[i].getElementsByTagName('title')[0].textContent;
                    let cost = productCards[i].getElementsByTagName('cost')[0].textContent;
                
                    document.querySelector('.product__card__title').textContent = title;
                    document.querySelector('.product__card__cost').textContent = cost;
                
                    // Загрузка всех размеров, кнопки в корзину и кнопки состава и тп
                    let sizes = productCards[i].getElementsByTagName('size');
                    let sizeList = document.querySelector('.product__card__dot__size');
                
                    for(let i = 0; i < sizes.length; i++){
                        // Создаем новый элемент списка для каждого размера
                        let listItem = document.createElement('li');
                        listItem.className = '';
                        let button = document.createElement('button');
                        button.className = 'product__card__dot__button';
                        button.textContent = sizes[i].textContent;
                        listItem.appendChild(button);
                        sizeList.appendChild(listItem);
                    }
              
                    let addToCartButton = productCards[i].getElementsByTagName('addToCart')[0].textContent;
                    let madeMenuBtn = productCards[i].getElementsByTagName('madeOf')[0].textContent;
            
                    document.querySelector('.add__to__cart__button').textContent = addToCartButton;
                    document.querySelector('.madeof__button').textContent = madeMenuBtn;
                
                    // Загрузка галереи изображений
                    let topImages = productCards[i].getElementsByTagName('topImage');
                    let galleryTop = document.querySelector('.product__card__gallery__top');
            
                    for(let i = 0; i < topImages.length; i++){
                        let img = document.createElement('img');
                        img.className = 'product__card__image';
                        img.src = topImages[i].textContent;
                        galleryTop.appendChild(img);
                    }
            
                    let bottomImages = productCards[i].getElementsByTagName('bottomImage');
                    let galleryBottom = document.querySelector('.product__card__gallery__bottom');
            
                    for(let i = 0; i < bottomImages.length; i++){
                        let img = document.createElement('img');
                        img.className = 'product__card__image';
                        img.src = bottomImages[i].textContent;
                        galleryBottom.appendChild(img);
                    }

                    let sliderImages = productCards[i].getElementsByTagName('sliderImage');
                    let sliderDiv = document.querySelectorAll('.gallery__slider__item');

                    for(let i = 0; i < 5; i++){
                        let img = document.createElement('img');
                        img.className = 'product__card__image';
                        img.src = sliderImages[i].textContent;
                        sliderDiv[i].appendChild(img);
                    }
                }
            }
        }            
        loadDataXml();

    // -----------------------------карточка товара-------------------------
    // Для кнопок выбора размера
    const sizeBtn = document.querySelectorAll('.product__card__dot__button');

    // Проходим по всем кнопкам размеров
    for (let i = 0; i < sizeBtn.length; i++) {
        sizeBtn[i].addEventListener('click', function() {
            // Сначала сбрасываем стили для всех кнопок
            for (let j = 0; j < sizeBtn.length; j++) {
                sizeBtn[j].style.backgroundColor = '';
                sizeBtn[j].style.color = '';

                if(sizeBtn[j] != this){
                    sizeBtn[j].classList.remove('selected');
                }
            }
            // Затем применяем новые стили для нажатой кнопки
            this.style.backgroundColor = '#fff';
            this.style.color = '#2E3F62';

            this.classList.add('selected');
            
             // Получаем значение выбранной кнопки и сохраняем в памяти
            selectedSize = this.innerText;
            localStorage.setItem('selectedSize', selectedSize);
        });
    }
    


    // Для кнопки состава и тп
    const madeBtn = document.querySelector('.madeof__button');
    const madeMenu = document.querySelector('.made__content');
    const closeMenuBtn = document.querySelector('.close-made');
    const overlay = document.querySelector('.overlay');
    
    madeBtn.addEventListener('click', () => {
        madeMenu.classList.add('made-menu-opened');
    
        overlay.style.opacity = 1;
        setTimeout(function() {
            overlay.style.visibility = 'visible';
        }, 100);
    });
    
    closeMenuBtn.addEventListener('click', () => {
        madeMenu.classList.remove('made-menu-opened');
    
        overlay.style.opacity = 0;
        setTimeout(function() {
            overlay.style.visibility = 'hidden';
        }, 200);
    });
    // ----------------------------------------------------------------------   
  });
});