// Отображение блюд на странице. Карточки создаются динамически через DOM.

const categoryList = ['soup', 'main', 'salad', 'drink', 'dessert'];

// Создаёт HTML-элемент карточки одного блюда
function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish';
    card.dataset.dish = dish.keyword;
    card.dataset.kind = dish.kind;             // по kind работает фильтрация

    const img = document.createElement('img');
    img.src = dish.image;
    img.alt = dish.name;

    const price = document.createElement('p');
    price.className = 'dish-price';
    price.textContent = dish.price + '₽';

    const name = document.createElement('p');
    name.className = 'dish-name';
    name.textContent = dish.name;

    const weight = document.createElement('p');
    weight.className = 'dish-weight';
    weight.textContent = dish.count;

    const button = document.createElement('button');
    button.className = 'dish-button';
    button.type = 'button';
    button.textContent = 'Добавить';

    card.append(img, price, name, weight, button);
    return card;
}

// Выводит блюда каждой категории (отсортированные по алфавиту) в свою секцию
function renderDishes() {
    categoryList.forEach(function (category) {
        const container = document.getElementById(category + '-dishes');
        const categoryDishes = dishes.filter(function (dish) {
            return dish.category === category;
        });

        categoryDishes.sort(function (a, b) {
            return a.name.localeCompare(b.name, 'ru');
        });

        categoryDishes.forEach(function (dish) {
            container.appendChild(createDishCard(dish));
        });
    });
}

renderDishes();
