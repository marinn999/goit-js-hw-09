const form = document.querySelector('.feedback-form');

// Отримуємо дані з localStorage, перетворюючи JSON-рядок на об'єкт. Якщо дані не введено або в localStorage
//  не містяться, встановлюємо порожні значення.
const savedData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
const savedInLocalStorageEmail = form.elements.email;
const savedInLocalStorageMessage = form.elements.message;

// Перевіряємо, чи містить об'єкт savedData значення для властивості email та message.
// Якщо значення не знайдено, тоді - порожній рядок
savedInLocalStorageEmail.value = savedData.email || '';
savedInLocalStorageMessage.value = savedData.message || '';

// Використовуємо локальне сховище, щоб зберегти поточне значення текстового поля під час введення і
// при перезавантаженні сторінки зберігалося введене повідомлення.
form.addEventListener('input', evt => {
  savedData[evt.target.name] = evt.target.value;

  // Зберігаємо оновлений об'єкт savedData у локальному сховищі під ключем 'feedback - form - state'.
  // Щоб зберегти об’єкт у localStorage, перетворюємо об’єкт на рядок методом JSON.stringify.
  localStorage.setItem('feedback-form-state', JSON.stringify(savedData));
});
// Під час сабміту форми виводимo в консоль значення текстового поля та очищаємо форму.
form.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log('email', evt.target.elements.email.value);
  console.log('message', evt.target.elements.message.value);
  form.reset();
  // Очищаємо сховище.
  localStorage.removeItem('feedback-form-state');
});
