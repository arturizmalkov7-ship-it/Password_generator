(function () {
  const CHARACTER_SETS = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()-_=+?',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  };

  // Генерирует пароль из настроек и переданной функции случайного выбора.
  function generatePassword(length, options, getRandomIndex) {
    const characterGroups = [CHARACTER_SETS.lowercase];

    if (options.numbers) characterGroups.push(CHARACTER_SETS.numbers);
    if (options.symbols) characterGroups.push(CHARACTER_SETS.symbols);
    if (options.uppercase) characterGroups.push(CHARACTER_SETS.uppercase);

    const allCharacters = characterGroups.join('');

    // Добавляем по одному символу из каждой включенной группы.
    const passwordCharacters = characterGroups.map((group) => group[getRandomIndex(group.length)]);

    while (passwordCharacters.length < length) {
      passwordCharacters.push(allCharacters[getRandomIndex(allCharacters.length)]);
    }

    // Перемешиваем, чтобы обязательные символы не стояли только в начале.
    for (let index = passwordCharacters.length - 1; index > 0; index -= 1) {
      const otherIndex = getRandomIndex(index + 1);
      [passwordCharacters[index], passwordCharacters[otherIndex]] = [
        passwordCharacters[otherIndex],
        passwordCharacters[index]
      ];
    }

    return passwordCharacters.join('');
  }

  window.PasswordGenerator = { generatePassword };
})();