//Нахождение случайного числа
function getRandomInt (min, max) {
  const lower = Math.ceil(Math.min(min,max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper-lower+1)+lower;

  return Math.floor(result);
}

//Нахождение случайного неповторяющегося числа
function createUniqueIdGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

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
    return 'NaN';
  } else {
    return result;
  }
};

getNumber('ECMASCRIPT 2022');

export {getRandomInt, createUniqueIdGenerator};
