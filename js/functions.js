const isFit = function (string, length) {
  return string.length<=length;
};

// Cтрока короче 20 символов
console.log(isFit('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(isFit('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(isFit('проверяемая строка', 10)); // false

const IsPalindrome = function (string) {
  let reversedString = '';
  const correctString = string.replaceAll(' ', '').toLowerCase();
  for (let i = correctString.length-1; i>=0; i--) {
    reversedString+=correctString[i];
  }
  return correctString===reversedString;
};

// Строка является палиндромом
console.log(IsPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(IsPalindrome('ДовОд')); // true
// Это не палиндром
console.log(IsPalindrome('Кекс'));  // false
// Это палиндром
console.log(IsPalindrome('Лёша на полке клопа нашёл ')); // true

const getNumber = function (string) {
  string=string.toString();
  let result = '';
  for (let i=0; i<string.length; i++){
    string=string.replaceAll(' ','');
    if (!isNaN(string[i])){
      const number = parseInt(string[i], 10);
      result+=number;
    }
  }
  if (result==='') {
    return 'NaN';
  } else {
    return result;
  }
};

console.log(getNumber('2023 год'));            // 2023
console.log(getNumber('ECMAScript 2022'));     // 2022
console.log(getNumber('1 кефир, 0.5 батона')); // 105
console.log(getNumber('агент 007'));           // 7
console.log(getNumber('а я томат'));           // NaN
console.log(getNumber(2023)); // 2023
console.log(getNumber(-1));   // 1
console.log(getNumber(1.5));  // 15

