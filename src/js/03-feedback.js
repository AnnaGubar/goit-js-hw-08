import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const savedSettings = localStorage.getItem('feedback-form-state');
const parsedSettings = JSON.parse(savedSettings);

fillForm();

formRef.addEventListener('input', throttle(addDataToLocalStorageHandler, 500));
formRef.addEventListener('submit', clearFormHandler);

// при обновлении не сохраняет значения инпутов
// function fillForm(savedSettings, parsedSettings) {
//   if (savedSettings) {
//     formRef.elements.email.value = parsedSettings.email;
//     formRef.elements.message.value = parsedSettings.message;
//   }
// }

function fillForm() {
  if (savedSettings === null || savedSettings === undefined) return;
  if (savedSettings !== null || savedSettings !== undefined) {
    formRef.elements.email.value = parsedSettings.email;
    formRef.elements.message.value = parsedSettings.message;
  }
}

function addDataToLocalStorageHandler(e) {
  e.preventDefault();

  // выдает ошибку
  // const { email, message } = e.currentTarget;
  // const data = {
  //   email: email.value,
  //   message: message.value,
  // };

  let data = {};
  // const formData = new FormData(e.currentTarget); // выдает ошибку
  const formData = new FormData(formRef);
  formData.forEach((value, name) => {
    data[name] = value;
  });

  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

function clearFormHandler(e) {
  e.preventDefault();

  console.log(parsedSettings);

  // console.log({
  //   email: formRef.elements.email.value,
  //   message: formRef.elements.message.value,
  // });

  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
