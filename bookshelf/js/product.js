document.addEventListener('DOMContentLoaded', (event) => {

    let params = new URLSearchParams(window.location.search);
    let urlId = params.get('id')

    fetch('/products.xml')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
    
    let products = data.getElementsByTagName('product');
    let productContainer = document.querySelector('.product');

    function loadDataFromXML(filterParam = null){
        productContainer.innerHTML = '';

        for(let i = 0; products.length; i++){
            const product = products[i];
            
            const id = product.getElementsByTagName('id')[0].textContent;
            const image = product.getElementsByTagName('product-image')[0].textContent;
            const name = product.getElementsByTagName('product-name')[0].textContent;
            const author = product.getElementsByTagName('product-author')[0].textContent;
            const cost = product.getElementsByTagName('product-cost')[0].textContent;
            const year = product.getElementsByTagName('year')[0].textContent;
            const pages = product.getElementsByTagName('pages')[0].textContent;
            const binding = product.getElementsByTagName('binding')[0].textContent;
            const age = product.getElementsByTagName('age')[0].textContent;
            const authorSpecial = product.getElementsByTagName('author')[0].textContent;
            const publishing = product.getElementsByTagName('publishing')[0].textContent;
            const bookDesription = product.getElementsByTagName('book-description')[0].textContent;
            const authorDesription = product.getElementsByTagName('author-description')[0].textContent;
            const costSpecial = product.getElementsByTagName('cost')[0].textContent;
            
            if(id == urlId){
                let html = `
                <h1 class="book-title">${name}</h1>
                <div class="book-information">
                    <img src="${image}" alt="book-image" class="book-image">
                    <div class="book-information-inner">
                        <h2 class="info-title">Описание</h2>
                        <div class="info-row">
                            <p class="info-row-title">
                                Год издания
                            </p>
                            <p class="info-row-text">
                                ${year}
                            </p>
                        </div>
                        <div class="info-row">
                            <p class="info-row-title">
                                Страниц
                            </p>
                            <p class="info-row-text">
                                ${pages}
                            </p>
                        </div>
                        <div class="info-row">
                            <p class="info-row-title">
                                Переплет
                            </p>
                            <p class="info-row-text">
                                ${binding}
                            </p>
                        </div>
                        <div class="info-row">
                            <p class="info-row-title">
                                Возрастные ограничения
                            </p>
                            <p class="info-row-text">
                                ${age}
                            </p>
                        </div>
                        <div class="info-row">
                            <p class="info-row-title">
                                Автор
                            </p>
                            <p class="info-row-text">
                                ${authorSpecial}
                            </p>
                        </div>
                        <div class="info-row">
                            <p class="info-row-title">
                                Издательство
                            </p>
                            <p class="info-row-text">
                                ${publishing}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="book-description">
                    <p class="book-description-text">
                        ${bookDesription}
                    </p>
                    <p class="book-description-text">
                        ${authorDesription}
                    </p>
                    <p class="book-cost">
                        Стоимость: ${costSpecial} рублей. 
                    </p>
                </div>
                <a href="form.html?id=${id}" class="order-btn">Купить книгу</a>`

                productContainer.insertAdjacentHTML("beforeend", html);
            }
        }
    }

    loadDataFromXML();
  });
});