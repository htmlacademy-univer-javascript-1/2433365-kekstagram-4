// import { createdPhotos } from './data.js';
// import { renderPicturesList, clearPicturesList } from './photo.js';
import { isEscapeKey } from './util.js';

const bigPictureWindow = document.querySelector('.big-picture');
const closeButton = bigPictureWindow.querySelector('.big-picture__cancel');

const miniPicContainer = document.querySelector('.pictures');

const BigPicImg = bigPictureWindow.querySelector('.big-picture__img');
const imgLikes = bigPictureWindow.querySelector('.likes-count');
const imgComments = bigPictureWindow.querySelector('.comments-count');
const imgDesc = bigPictureWindow.querySelector('.social__caption');

const CommentsList = bigPictureWindow.querySelector('.social__comments');

function render (item) {

  const onClickClose = (evt) => {
    evt.preventDefault();
    closeBigPic();
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)){
      evt.preventDefault();
      closeBigPic();
    }
  };

  function openBigPic() {
    bigPictureWindow.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
    closeButton.addEventListener('click', onClickClose);
  }

  function closeBigPic() {
    bigPictureWindow.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    CommentsList.innerHTML='';

    document.removeEventListener('keydown', onDocumentKeydown);
    closeButton.removeEventListener('click', onClickClose);
  }

  function getComments(arr) {
    for (let j=0;j<arr.comments.length;j++) {
      const newComment = document.createElement('li');
      newComment.classList.add('social__comment');

      const CommImg = document.createElement('img');
      CommImg.classList.add('social__picture');
      CommImg.src=arr.comments[j].avatar;
      CommImg.alt=arr.comments[j].name;
      CommImg.width='35';
      CommImg.height='35';

      const message = document.createElement('p');
      message.classList.add('social__text');
      message.textContent=item.comments[j].message;

      newComment.appendChild(CommImg);
      newComment.appendChild(message);
      CommentsList.appendChild(newComment);
    }
  }

  function renderBigPic(a) {
    const img = a.querySelector('.picture__img');
    const pictureLikes = a.querySelector('.picture__likes');
    const pictureComments = a.querySelector('.picture__comments');

    BigPicImg.src = img.src;
    BigPicImg.alt = img.alt;

    imgLikes.textContent = pictureLikes.textContent;
    imgComments.textContent = pictureComments.textContent;

    getComments(item);

    imgDesc.textContent=img.alt;

    openBigPic();
  }

  miniPicContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    const target = evt.target.closest('a');
    if (target.nodeName !== 'a') {return;}
    renderBigPic(target);
  });
}

export {render};
