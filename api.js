// Лаба 7: работа с API.
// ВСТАВЬ СВОЙ API KEY (UUID из СДО Московского Политеха или по временной ссылке из задания).
const API_URL = 'https://web-basics-api-gagashaggy.msk1.amvera.tech';
const API_KEY = '186742e2-f60d-389d-a41f-d857a44044b7';

// Какие блюда показывать: 'default' (стандартные блюда сервера) или 'my' (твои, загруженные через Postman)
const DISHES_SOURCE = 'my';

// Сюда loadDishes() кладёт блюда, пришедшие с сервера
let dishes = [];

// На случай, если сервер называет категории иначе, приводим их к нашим названиям
const CATEGORY_ALIASES = {
    soup: 'soup',
    main: 'main',
    'main-course': 'main',
    main_course: 'main',
    salad: 'salad',
    starter: 'salad',
    drink: 'drink',
    dessert: 'dessert'
};

function normalizeCategory(category) {
    const key = String(category).toLowerCase();
    return CATEGORY_ALIASES[key] || key;
}

// api_key всегда передаётся в строке запроса
function apiUrl(path) {
    return API_URL + path + '?api_key=' + encodeURIComponent(API_KEY);
}

// Загружает блюда с сервера и сохраняет их в массив dishes
async function loadDishes() {
    if (API_KEY.indexOf('ВСТАВЬ') === 0) {
        throw new Error('не указан API key (впиши его в api.js)');
    }

    const response = await fetch(apiUrl('/labs/api/dishes/' + DISHES_SOURCE));
    const data = await response.json().catch(function () { return null; });

    // при ошибке сервер присылает объект с полем error, а не массив
    if (!response.ok || !Array.isArray(data)) {
        throw new Error((data && data.error) || ('сервер ответил ' + response.status));
    }

    dishes = data.map(function (dish) {
        return Object.assign({}, dish, { category: normalizeCategory(dish.category) });
    });
    return dishes;
}
