document.addEventListener('DOMContentLoaded', (event) => {

    fetch('/products.xml')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
    
    let products = data.getElementsByTagName('product');
    let filterButtons = document.querySelectorAll('.filter-button');
    let productContainer = document.querySelector('.products-container');

    function loadDataFromXML(filterParam = null){
        productContainer.innerHTML = '';

        for(let i = 0; products.length; i++){
            const product = products[i];
            
            const id = product.getElementsByTagName('id')[0].textContent;
            const filter = product.getElementsByTagName('filter')[0].textContent;
            const image = product.getElementsByTagName('product-image')[0].textContent;
            const name = product.getElementsByTagName('product-name')[0].textContent;
            const author = product.getElementsByTagName('product-author')[0].textContent;
            const cost = product.getElementsByTagName('product-cost')[0].textContent;

            if(!filterParam || filter === filterParam){
                let html = ` 
                <div class="product">
                    <a href="product.html?id=${id}" class="product-link">
                        <img src="${image}" alt="book" class="product-image">
                        <h2 class="book-title">${name}</h2>
                        <p class="book-author">${author}</p>
                        <div class="book-information">
                            <span class="book-cost">${cost}</span>
                            <a href="form.html?id=${id}" class="book-order-button">Купить</a>
                        </div>
                    </a>
                </div>`

                productContainer.insertAdjacentHTML("beforeend", html);
            }
        }
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterParam = button.innerHTML;

            if (button.classList.contains('active')) {
                button.classList.remove('active');
                activeFilter = null;
            } else {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                activeFilter = filterParam;
            }
            
            loadDataFromXML(activeFilter);
        });
    });

    loadDataFromXML();
  });
});