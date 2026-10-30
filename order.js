// Выбор блюд, блок «Ваш заказ» и подсчёт стоимости.

const categories = {
    soup:    { emptyText: 'Блюдо не выбрано',  textId: 'order-soup',    inputId: 'input-soup' },
    main:    { emptyText: 'Блюдо не выбрано',  textId: 'order-main',    inputId: 'input-main' },
    salad:   { emptyText: 'Блюдо не выбрано',  textId: 'order-salad',   inputId: 'input-salad' },
    drink:   { emptyText: 'Напиток не выбран', textId: 'order-drink',   inputId: 'input-drink' },
    dessert: { emptyText: 'Блюдо не выбрано',  textId: 'order-dessert', inputId: 'input-dessert' }
};

// Здесь хранятся выбранные блюда (по одному на категорию)
const selected = { soup: null, main: null, salad: null, drink: null, dessert: null };

const emptyBlock = document.getElementById('order-empty');
const detailsBlock = document.getElementById('order-details');
const totalBlock = document.getElementById('order-total');
const totalValue = document.getElementById('order-total-value');

// Перерисовывает блок «Ваш заказ» по текущему выбору
function updateOrder() {
    let total = 0;
    let hasAny = false;

    Object.keys(categories).forEach(function (key) {
        const config = categories[key];
        const dish = selected[key];
        const text = document.getElementById(config.textId);
        const input = document.getElementById(config.inputId);

        if (dish) {
            text.textContent = dish.name + ' ' + dish.price + '₽';
            input.value = dish.keyword;           // на сервер уйдёт keyword
            total += dish.price;
            hasAny = true;
        } else {
            text.textContent = config.emptyText;
            input.value = '';
        }
    });

    emptyBlock.hidden = hasAny;
    detailsBlock.hidden = !hasAny;
    totalBlock.hidden = !hasAny;
    totalValue.textContent = total + '₽';
}

// Один обработчик на весь документ: ловим клики по кнопкам «Добавить»
document.addEventListener('click', function (event) {
    const button = event.target.closest('.dish-button');
    if (!button) {
        return;
    }

    const card = button.closest('.dish');
    const dish = dishes.find(function (item) {
        return item.keyword === card.dataset.dish;   // ищем блюдо по data-атрибуту
    });

    selected[dish.category] = dish;

    // рамка только у выбранной карточки в своей категории
    card.parentElement.querySelectorAll('.dish').forEach(function (item) {
        item.classList.remove('dish-selected');
    });
    card.classList.add('dish-selected');

    updateOrder();
});

// Кнопка «Сбросить» очищает и выбор блюд
document.querySelector('.order-form').addEventListener('reset', function () {
    Object.keys(selected).forEach(function (key) {
        selected[key] = null;
    });
    document.querySelectorAll('.dish-selected').forEach(function (item) {
        item.classList.remove('dish-selected');
    });
    updateOrder();
});

updateOrder();
