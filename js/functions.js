const isFit = function (string, length) {
  return string.length<=length;
};
isFit('абвгдеж', 10);

const IsPalindrome = function (string) {
  let reversedString = '';
  const correctString = string.replaceAll(' ', '').toLowerCase();
  reversedString = [...correctString].reverse().join('');
  return correctString===reversedString;
};
IsPalindrome('Кекс');

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
  if (result===''){
    return NaN;
  } else {
    return result;
  }
};

console.log(getNumber('2023 год'));            // 2023
console.log(getNumber('ECMAScript 2022'));     // 2022
console.log(getNumber('1 кефир, 0.5 батона')); // 105
console.log(getNumber('агент 007'));           // 7
console.log(getNumber('а я томат'));           // NaN

