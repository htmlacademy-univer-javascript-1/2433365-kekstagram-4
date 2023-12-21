import { getFilteredPic, initializeFilters } from './filters.js';
import { renderPicturesList } from './photo.js';
import { showAlert, debounce } from './util.js';

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const METHOD = {
  GET: 'GET',
  POST: 'POST',
};
const ERROR_MESSAGE = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = async(route, errorMessage, method = METHOD.GET, body = null) =>
  await fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch (() => {
      throw new Error(errorMessage);
    });

const getData = () => load(ROUTE.GET_DATA, ERROR_MESSAGE.GET_DATA);

const sendData = (body) => load(ROUTE.SEND_DATA, ERROR_MESSAGE.SEND_DATA, METHOD.POST, body);

const setDataFromServer = () => {
  getData()
    .then((pictures) => {
      const debouncedPicturesList = debounce(renderPicturesList);
      initializeFilters(pictures, debouncedPicturesList);
      renderPicturesList(getFilteredPic());
    })
    .catch((err) => {
      showAlert(err.message);
    });
};

export {setDataFromServer, sendData};
