const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function createApp({ length = '12', numbers = true, symbols = false, uppercase = false, clipboardError = false } = {}) {
  const submitListeners = [];
  const copyListeners = [];
  const copiedTexts = [];
  const errorClasses = new Set();
  const elements = {
    '#password-form': { addEventListener: (eventName, listener) => submitListeners.push(listener) },
    '#length': { value: length },
    '#password': { textContent: 'Пароль еще не создан' },
    '#copy-button': {
      disabled: true,
      addEventListener: (eventName, listener) => copyListeners.push(listener)
    },
    '#message': {
      textContent: '',
      classList: {
        add: (className) => errorClasses.add(className),
        remove: (className) => errorClasses.delete(className)
      }
    },
    '#include-numbers': { checked: numbers },
    '#include-symbols': { checked: symbols },
    '#include-uppercase': { checked: uppercase }
  };
  const context = {
    document: { querySelector: (selector) => elements[selector] },
    window: {},
    navigator: {
      clipboard: {
        writeText: async (text) => {
          if (clipboardError) throw new Error('Clipboard is unavailable');
          copiedTexts.push(text);
        }
      }
    },
    Uint8Array,
    crypto: { getRandomValues: (values) => { values[0] = 0; return values; } }
  };

  // Загружаем браузерные скрипты в изолированный контекст с простыми DOM-заглушками.
  for (const fileName of ['generator.js', 'app.js']) {
    const source = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
    vm.runInNewContext(source, context, { filename: fileName }); // NOSONAR: запускаются только два фиксированных локальных файла приложения.
  }

  return {
    elements,
    errorClasses,
    copiedTexts,
    submit() {
      submitListeners[0]({ preventDefault() {} });
    },
    async copy() {
      await copyListeners[0]();
    }
  };
}

test('отклоняет длину меньше 6', () => {
  const app = createApp({ length: '5' });

  app.submit();

  assert.equal(app.elements['#password'].textContent, 'Пароль еще не создан');
  assert.match(app.elements['#message'].textContent, /от 6 до 30/);
  assert.equal(app.errorClasses.has('error'), true);
});

test('не генерирует пароль при пустой длине', () => {
  const app = createApp({ length: '' });

  app.submit();

  assert.equal(app.elements['#password'].textContent, 'Пароль еще не создан');
  assert.match(app.elements['#message'].textContent, /от 6 до 30/);
});

test('предупреждает, если сняты все флажки', () => {
  const app = createApp({ numbers: false, symbols: false, uppercase: false });

  app.submit();

  assert.equal(app.elements['#password'].textContent, 'Настройки не выбраны');
  assert.match(app.elements['#message'].textContent, /Выберите хотя бы один тип/);
  assert.equal(app.errorClasses.has('error'), true);
});

test('создает пароль минимальной длины с выбранной категорией', () => {
  const app = createApp({ length: '6', numbers: true });

  app.submit();

  const password = app.elements['#password'].textContent;
  assert.equal(password.length, 6);
  assert.match(password, /\d/);
  assert.equal(app.errorClasses.has('error'), false);
});

test('копирует пароль и показывает подтверждение', async () => {
  const app = createApp();
  app.submit();
  const password = app.elements['#password'].textContent;

  await app.copy();

  assert.deepEqual(app.copiedTexts, [password]);
  assert.equal(app.elements['#message'].textContent, 'Пароль скопирован в буфер обмена.');
});

test('показывает ошибку, если браузер не дает скопировать пароль', async () => {
  const app = createApp({ clipboardError: true });
  app.submit();

  await app.copy();

  assert.match(app.elements['#message'].textContent, /Не удалось скопировать/);
  assert.equal(app.errorClasses.has('error'), true);
  assert.deepEqual(app.copiedTexts, []);
});