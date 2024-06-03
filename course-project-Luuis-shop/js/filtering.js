export function addFilteringHtml() {
    // Получение кнопки фильтрации, продукта и отмены
    let filterButtons = document.querySelectorAll('.filter__button');
    let products = document.querySelectorAll('.product__inner');
    let resetBtn = document.querySelector('.close__filter');

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
