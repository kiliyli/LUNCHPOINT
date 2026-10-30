// Лаба 6: блок «Доступные варианты ланча».
// Пути к иконкам из icons.zip поправьте под свои файлы.
const lunchKinds = {
    soup:  { title: 'Суп',           icon: 'icons/soup.png' },
    main:  { title: 'Главное блюдо', icon: 'icons/main.png' },
    salad: { title: 'Салат',         icon: 'icons/salad.png' },
    drink: { title: 'Напиток',       icon: 'icons/drink.png' }
};

// 5 допустимых комбо (десерт можно добавить к любому)
const lunchCombos = [
    ['soup', 'main', 'salad', 'drink'],
    ['soup', 'main', 'drink'],
    ['soup', 'salad', 'drink'],
    ['main', 'salad', 'drink'],
    ['main', 'drink']
];

function renderLunchOptions() {
    const grid = document.getElementById('lunch-grid');

    lunchCombos.forEach(function (combo, index) {
        const card = document.createElement('div');
        card.className = 'lunch-card';

        const title = document.createElement('p');
        title.className = 'lunch-card-title';
        title.textContent = 'Вариант ' + (index + 1);
        card.append(title);

        combo.forEach(function (kind) {
            const item = document.createElement('div');
            item.className = 'lunch-item';

            const img = document.createElement('img');
            img.className = 'lunch-item-img';
            img.src = lunchKinds[kind].icon;
            img.alt = lunchKinds[kind].title;

            const caption = document.createElement('p');
            caption.className = 'lunch-item-caption';
            caption.textContent = lunchKinds[kind].title;

            item.append(img, caption);
            card.append(item);
        });

        grid.append(card);
    });
}

renderLunchOptions();
