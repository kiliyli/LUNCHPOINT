// Лаба 6: проверка состава ланча при отправке формы + уведомление.
// Использует selected (order.js) и lunchCombos (lunch-options.js).

const has = function (key) { return Boolean(selected[key]); };

// Возвращает текст уведомления или null, если заказ корректный
function getOrderProblem() {
    const chosen = ['soup', 'main', 'salad', 'drink'].filter(has);

    // 1. ничего не выбрано
    if (chosen.length === 0 && !has('dessert')) {
        return 'Ничего не выбрано. Выберите блюда для заказа';
    }

    // заказ подходит под одно из комбо
    const valid = lunchCombos.some(function (combo) {
        return combo.length === chosen.length && combo.every(has);
    });
    if (valid) {
        return null;
    }

    // 2. всё нужное выбрано, кроме напитка
    if (!has('drink')) {
        const withDrink = chosen.concat('drink');
        const needsOnlyDrink = lunchCombos.some(function (combo) {
            return combo.length === withDrink.length && combo.every(function (k) {
                return withDrink.includes(k);
            });
        });
        if (needsOnlyDrink) {
            return 'Выберите напиток';
        }
    }

    // 3. суп есть, но нет главного/салата
    if (has('soup') && !has('main') && !has('salad')) {
        return 'Выберите главное блюдо/салат/стартер';
    }

    // 4. салат есть, но нет супа/главного
    if (has('salad') && !has('soup') && !has('main')) {
        return 'Выберите суп или главное блюдо';
    }

    // 5. выбраны только напиток и/или десерт
    return 'Выберите главное блюдо';
}

function showNotification(text) {
    // не копим уведомления
    const old = document.querySelector('.notification-overlay');
    if (old) {
        old.remove();
    }

    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';

    const box = document.createElement('div');
    box.className = 'notification';

    const message = document.createElement('p');
    message.className = 'notification-text';
    message.textContent = text;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'notification-button';
    button.textContent = 'Окей';
    button.addEventListener('click', function () {
        overlay.remove();
    });

    box.append(message, button);
    overlay.append(box);
    document.body.append(overlay);
}

document.querySelector('.order-form').addEventListener('submit', function (event) {
    const problem = getOrderProblem();
    if (problem) {
        event.preventDefault();
        showNotification(problem);
    }
});
