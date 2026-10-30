// Массив со всеми блюдами.
// keyword — уникальное название на латинице (уходит на сервер при отправке формы)
// kind — тип блюда для фильтрации (совпадает с data-kind кнопки фильтра)

// ЗАГЛУШКА для фото: серый прямоугольник.
// Когда будут готовы картинки — замените image: PLACEHOLDER на image: 'имя-файла.jpg'
const PLACEHOLDER = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
    '<rect width="100%" height="100%" fill="#e9e3da"/>' +
    '<text x="50%" y="50%" fill="#9a8f84" font-family="sans-serif" font-size="22" ' +
    'text-anchor="middle" dominant-baseline="middle">Фото блюда</text></svg>'
);

const dishes = [
    // ===== Супы (fish / meat / veg — по 2) =====
    { keyword: 'tom-yam-cheese-seafood', name: 'Том-ям с морепродуктами', price: 420, category: 'soup', count: '350 г', kind: 'fish', image: 'images/Том-ям с морепродуктами сверху.png' },
    { keyword: 'creamy-salmon-soup', name: 'Сливочный суп с лососем', price: 380, category: 'soup', count: '350 г', kind: 'fish', image: 'images/суп лосось.png' },
    { keyword: 'chicken-noodle-soup', name: 'Куриный суп с лапшой и зеленью', price: 280, category: 'soup', count: '350 г', kind: 'meat', image: 'images/суп кура.png' },
    { keyword: 'borscht', name: 'Борщ с говядиной и сметаной', price: 320, category: 'soup', count: '350 г', kind: 'meat', image: 'images/борщ.jpeg' },
    { keyword: 'pumpkin-cream-soup', name: 'Крем-суп из тыквы', price: 250, category: 'soup', count: '300 г', kind: 'veg', image: 'images/тыква суп.png' },
    { keyword: 'mushroom-cream-soup', name: 'Грибной крем-суп', price: 270, category: 'soup', count: '300 г', kind: 'veg', image: 'images/суп гриб.png' },

    // ===== Главные блюда (fish / meat / veg — по 2) =====
    { keyword: 'shrimp-ptitim', name: 'Птитим с креветками', price: 480, category: 'main', count: '300 г', kind: 'fish', image: 'images/птитим.jpeg' },
    { keyword: 'baked-cod-vegetables', name: 'Запечённая треска с овощами', price: 460, category: 'main', count: '300 г', kind: 'fish', image: PLACEHOLDER },
    { keyword: 'turkey-steak', name: 'Стейк из индейки с овощами на пару', price: 450, category: 'main', count: '300 г', kind: 'meat', image: 'images/мясо овощи.jpeg' },
    { keyword: 'beef-cutlets-mash', name: 'Говяжьи котлеты с картофельным пюре', price: 400, category: 'main', count: '300 г', kind: 'meat', image: PLACEHOLDER },
    { keyword: 'vegetable-stew', name: 'Овощное рагу с кабачками и баклажанами', price: 330, category: 'main', count: '300 г', kind: 'veg', image: PLACEHOLDER },
    { keyword: 'buckwheat-mushrooms', name: 'Гречка с грибами и жареным луком', price: 310, category: 'main', count: '300 г', kind: 'veg', image: PLACEHOLDER },

    // ===== Салаты и стартеры (fish — 1, meat — 1, veg — 4) =====
    { keyword: 'herring-under-fur-coat', name: 'Сельдь под шубой', price: 290, category: 'salad', count: '250 г', kind: 'fish', image: PLACEHOLDER },
    { keyword: 'chicken-caesar', name: 'Цезарь с курицей', price: 360, category: 'salad', count: '350 г', kind: 'meat', image: 'images/цезарь.jpeg' },
    { keyword: 'vinaigrette', name: 'Жареный камамбер с ягодным конфи', price: 500, category: 'salad', count: '200 г', kind: 'veg', image: "images/Запечённый сыр с ягодным конфитюром и тостами.png" },
    { keyword: 'greek-salad', name: 'Греческий салат', price: 270, category: 'salad', count: '250 г', kind: 'veg', image: PLACEHOLDER },
    { keyword: 'beetroot-goat-cheese-salad', name: 'Салат креветками и руколой', price: 330, category: 'salad', count: '200 г', kind: 'veg', image: "images/Салат с креветками и рукколой.png" },
    { keyword: 'fresh-vegetable-salad', name: 'Салат оливье', price: 190, category: 'salad', count: '200 г', kind: 'veg', image: "images/Домашний салат Оливье в керамической миске.png" },

    // ===== Напитки (cold — 3, hot — 3) =====
    { keyword: 'orange-fresh', name: 'Фреш апельсиновый', price: 300, category: 'drink', count: '300 мл', kind: 'cold', image: 'editing_result_c8a73d43bf0311f1aa9ef2147154faf4-1.jpeg' },
    { keyword: 'milkshake', name: 'Молочный коктейль', price: 250, category: 'drink', count: '300 мл', kind: 'cold', image: 'editing_result_8a0117e6bf0311f18d909a5a92c7838b-1.jpeg' },
    { keyword: 'cherry-blueberry-smoothie', name: 'Смузи вишня-черника', price: 320, category: 'drink', count: '300 мл', kind: 'cold', image: 'editing_result_0d4a1cc2bf0411f18dccfe7d83f47ee4-1.jpeg' },
    { keyword: 'sea-buckthorn-tea', name: 'Облепиховый чай', price: 200, category: 'drink', count: '300 мл', kind: 'hot', image: PLACEHOLDER },
    { keyword: 'cappuccino', name: 'Капучино', price: 220, category: 'drink', count: '250 мл', kind: 'hot', image: PLACEHOLDER },
    { keyword: 'hot-chocolate', name: 'Горячий шоколад', price: 260, category: 'drink', count: '250 мл', kind: 'hot', image: PLACEHOLDER },

    // ===== Десерты (small — 3, medium — 2, large — 1) =====
    { keyword: 'eclair-custard', name: 'Эклер с заварным кремом', price: 150, category: 'dessert', count: '80 г', kind: 'small', image: PLACEHOLDER },
    { keyword: 'panna-cotta-raspberry', name: 'Панна-котта с малиновым соусом', price: 220, category: 'dessert', count: '100 г', kind: 'small', image: PLACEHOLDER },
    { keyword: 'syrniki-sour-cream', name: 'Сырники со сметаной', price: 230, category: 'dessert', count: '120 г', kind: 'small', image: PLACEHOLDER },
    { keyword: 'honey-cake', name: 'Медовик', price: 260, category: 'dessert', count: '170 г', kind: 'medium', image: PLACEHOLDER },
    { keyword: 'new-york-cheesecake', name: 'Чизкейк Нью-Йорк', price: 290, category: 'dessert', count: '170 г', kind: 'medium', image: PLACEHOLDER },
    { keyword: 'napoleon-cake', name: 'Торт «Наполеон»', price: 340, category: 'dessert', count: '250 г', kind: 'large', image: PLACEHOLDER }
];
