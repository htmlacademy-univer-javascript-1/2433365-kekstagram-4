import {resetScale} from './scale.js';
import {
  init as initEffect,
  reset as resetEffect
} from './effect.js';
import { isEscapeKey } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAGS_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};
const submitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING:'Отправляю на сервер...',
};

const form = document.querySelector('#upload-select-image');
const imageInput = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const commentField = form.querySelector('.text__description');
const hashtagField = form.querySelector('.text__hashtags');
const closeButton = form.querySelector('#upload-cancel');
const submitButton = form.querySelector('#upload-submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

const onClickClose = () => {
  onFormClose();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageShown()){
    evt.preventDefault();
    onFormClose();
  }
};

const onImgLoad = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  closeButton.addEventListener('click', onClickClose);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onFormClose () {
  form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  closeButton.removeEventListener('click', onClickClose);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? submitButtonText.SUBMITTING:submitButtonText.IDLE;
};

const normalizeTags = (tagStr) => tagStr
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag)=> VALID_SYMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAGS_COUNT;
const hasUniqueTags = (value) => {
  const lowerTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerTags.length === new Set(lowerTags).size;
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  errorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  errorText.NOT_UNIQUE,
  1,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  errorText.INVALID_PATTERN,
  2,
  true
);

const setOnFormSubmit = (callback) => {
  const onSubmit = async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(form));
      toggleSubmitButton();
    }
  };

  form.addEventListener('submit', onSubmit);
};

imageInput.addEventListener('change', onImgLoad);
initEffect();

export {setOnFormSubmit, onFormClose};
