import {getRandomInt, createUniqueIdGenerator} from './util.js';

const descriptions = ['Мама сказала что я пион!',
  'Я полезный!',
  'Не кусайте, пожалуйста'
];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = [
  'Артем',
  'Ольга',
  'Андрей',
  'Мария'
];

const createUniqueId = createUniqueIdGenerator(1,25);
const createUniqueUrl = createUniqueIdGenerator(1,25);
const createUniqueCommId = createUniqueIdGenerator(1,10000);

//Функция для нахождения случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

//Создаём комментарии
const createComment = () => ({
  id: createUniqueCommId(),
  avatar: `img/avatar-${getRandomInt(1,6)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

const createdMessages = () => Array.from({length: getRandomInt(0,30)}, createComment);

//Создаём фотографии
const createPhoto = () => ({
  id: createUniqueId(),
  url: `photos/${createUniqueUrl()}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInt(15,200),
  comments: createdMessages()
});

const createdPhotos = () => Array.from({length: 25}, createPhoto);
export {createdPhotos, createdMessages};
