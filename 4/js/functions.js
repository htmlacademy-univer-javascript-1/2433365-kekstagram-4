const isFit = function (string, length) {
  return string.length<=length;
};

const IsPalindrome = function (string) {
  let reversedString = '';
  const correctString = string.replaceAll(' ', '').toLowerCase();
  for (let i = correctString.length-1; i>=0; i--) {
    reversedString+=correctString[i];
  }
  return correctString===reversedString;
};

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
