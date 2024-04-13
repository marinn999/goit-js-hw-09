const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

// Отримуємо дані з localStorage, перетворюючи JSON-рядок на об'єкт. Якщо дані не введено або в localStorage
//  не містяться, встановлюємо порожні значення.
let savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const { email, message } = form.elements;

// Перевіряємо, чи містить об'єкт savedData значення для властивості email та message.
// Якщо значення не знайдено, тоді - порожній рядок
email.value = savedData.email || '';
message.value = savedData.message || '';

// Використовуємо локальне сховище, щоб зберегти поточне значення текстового поля під час введення і
// при перезавантаженні сторінки зберігалося введене повідомлення.
form.addEventListener('input', evt => {
  savedData[evt.target.name] = evt.target.value.trim();
  // Зберігаємо оновлений об'єкт savedData у локальному сховищі під ключем 'feedback - form - state'.
  // Щоб зберегти об’єкт у localStorage, перетворюємо об’єкт на рядок методом JSON.stringify.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
});
// Під час сабміту форми виводимo в консоль значення текстового поля та очищаємо форму.
form.addEventListener('submit', evt => {
  evt.preventDefault();
  if (email.value === '' || message.value === '') {
    alert('All fields have to be filled');
    return;
  }
  console.log(savedData);
  form.reset();
  savedData = {};
  // Очищаємо сховище.
  localStorage.removeItem(STORAGE_KEY);
});
