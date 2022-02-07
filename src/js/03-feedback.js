const formRef = document.querySelector('.feedback-form');
const savedSettings = localStorage.getItem('feedback-form-state');
const parsedSettings = JSON.parse(savedSettings);

if (parsedSettings === null || parsedSettings === undefined) {
  player.setCurrentTime(true);
} else {
  player.setCurrentTime(parsedSettings);
}

formRef.addEventListener('input', addDataToLocalStorageHandler);

function addDataToLocalStorageHandler(e) {
  e.preventDefault();

  const { email, message } = e.currentTarget;
  const data = {
    email: email.value,
    message: message.value,
  };
  console.log(data);

  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}
