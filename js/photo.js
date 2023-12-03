import { openBigPic } from './renderFullscreenImg.js';

const newPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');
function createPicture({comments, description, likes, url}) {
  const newPhoto = newPhotoTemplate.cloneNode(true);
  const pictureImage = newPhoto.querySelector('.picture__img');
  const pictureLikes = newPhoto.querySelector('.picture__likes');
  const pictureComments = newPhoto.querySelector('.picture__comments');

  pictureImage.src = url;
  pictureImage.alt = description;

  pictureLikes.textContent = likes;

  pictureComments.textContent = comments.length;

  return newPhoto;
}

function renderPicturesList(pictures) {

  pictures.forEach((item) => {
    const picture = createPicture(item);
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPic(item);
    });
    picturesBlock.appendChild(picture);
  });
}

export {renderPicturesList};
