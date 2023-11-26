import { render } from './renderFullscreenImg.js';
// import { render } from './renderFullscreenImg copy.js';

const newPhotoTemplate = document.querySelector('#picture').content;
const picturesBlock = document.querySelector('.pictures');
function createPicture(item) {
  const newPhoto = newPhotoTemplate.cloneNode(true);
  const pictureImage = newPhoto.querySelector('.picture__img');
  const pictureLikes = newPhoto.querySelector('.picture__likes');
  const pictureComments = newPhoto.querySelector('.picture__comments');

  pictureImage.src = item.url;
  pictureImage.alt = item.description;

  pictureLikes.textContent = item.likes;

  pictureComments.textContent = item.comments.length;

  return newPhoto;
}

function renderPicturesList(pictures) {

  pictures.forEach((item) => {
    const picture = createPicture(item);
    picturesBlock.appendChild(picture);
    // render(item);
  });
  render(pictures);
}

const clearPicturesList = () => {
  picturesBlock.innerHTML = '';
};

export {renderPicturesList, clearPicturesList};
