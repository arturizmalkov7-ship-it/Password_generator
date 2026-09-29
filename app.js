const form = document.querySelector('#password-form');
const lengthInput = document.querySelector('#length');
const passwordOutput = document.querySelector('#password');
const message = document.querySelector('#message');
const { generatePassword } = window.PasswordGenerator;

function getRandomIndex(max) {
  const randomValue = new Uint8Array(1);
  const limit = Math.floor(256 / max) * max;

  do {
    crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= limit);

  return randomValue[0] % max;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const length = Number(lengthInput.value);
  if (!Number.isInteger(length) || length < 6 || length > 30) {
    message.textContent = 'Длина должна быть от 6 до 30 символов.';
    message.classList.add('error');
    return;
  }

  const options = {
    numbers: document.querySelector('#include-numbers').checked,
    symbols: document.querySelector('#include-symbols').checked,
    uppercase: document.querySelector('#include-uppercase').checked
  };

  if (!options.numbers && !options.symbols && !options.uppercase) {
    passwordOutput.textContent = 'Настройки не выбраны';
    message.textContent = 'Выберите хотя бы один тип символов.';
    message.classList.add('error');
    return;
  }

  passwordOutput.textContent = generatePassword(length, options, getRandomIndex);
  message.textContent = 'Строчные буквы используются всегда.';
  message.classList.remove('error');
});