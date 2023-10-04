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

