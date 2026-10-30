// Фильтрация блюд в каждой категории.
// Карточки не пересоздаются, а только скрываются/показываются (атрибут hidden),
// поэтому выбранное блюдо и форма заказа не сбрасываются при смене фильтра.

document.addEventListener('click', function (event) {
    const button = event.target.closest('.filter-button');
    if (!button) {
        return;
    }

    const section = button.closest('section');
    const container = section.querySelector('.dishes');
    const wasActive = button.classList.contains('active');

    // сначала снимаем active со всех кнопок этой категории
    section.querySelectorAll('.filter-button').forEach(function (item) {
        item.classList.remove('active');
    });

    // повторный клик по активному фильтру снимает его (kind = null → показать все)
    let kind = null;
    if (!wasActive) {
        button.classList.add('active');
        kind = button.dataset.kind;
    }

    container.querySelectorAll('.dish').forEach(function (card) {
        card.hidden = kind !== null && card.dataset.kind !== kind;
    });
});
