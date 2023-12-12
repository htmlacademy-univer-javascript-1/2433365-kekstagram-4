const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modal = document.querySelector('.img-upload');
const smallButton = modal.querySelector('.scale__control--smaller');
const bigButton = modal.querySelector('.scale__control--bigger');
const scaleInputElement = modal.querySelector('.scale__control--value');
const imageContainer = modal.querySelector('.img-upload__preview img');

const changeImgScale = (value) => {
  imageContainer.style.transform = `scale(${value/100})`;
  scaleInputElement.value=`${value}%`;
};

const onSmallButtonClick = () => {
  changeImgScale(
    Math.max(parseInt(scaleInputElement.value,10)-SCALE_STEP, MIN_SCALE)
  );
};

const onBigButtonClick = () => {
  changeImgScale(
    Math.min(parseInt(scaleInputElement.value,10)+SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = () => changeImgScale(DEFAULT_SCALE);

smallButton.addEventListener('click',onSmallButtonClick);
bigButton.addEventListener('click',onBigButtonClick);

export {resetScale};
