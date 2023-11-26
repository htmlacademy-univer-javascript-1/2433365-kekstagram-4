import { isEscapeKey } from './util.js';
function render (item) {
  const miniPicContainer = document.querySelector('.pictures');
  const miniPics = miniPicContainer.querySelectorAll('.picture');

  const bigPictureWindow = document.querySelector('.big-picture');

  const BigPicImg = bigPictureWindow.querySelector('img');
  const imgLikes = bigPictureWindow.querySelector('.likes-count');
  const imgComments = bigPictureWindow.querySelector('.comments-count');
  const imgDesc = bigPictureWindow.querySelector('.social__caption');

  const CommentsList = bigPictureWindow.querySelector('.social__comments');

  const closeButton = bigPictureWindow.querySelector('.big-picture__cancel');

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

  for (let i=0; i<miniPics.length;i++) {
    miniPics[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      const img = miniPics[i].querySelector('.picture__img');
      const pictureLikes = miniPics[i].querySelector('.picture__likes');
      const pictureComments = miniPics[i].querySelector('.picture__comments');

      openBigPic();

      BigPicImg.src = img.src;
      BigPicImg.alt = img.alt;

      imgLikes.textContent = pictureLikes.textContent;
      imgComments.textContent = pictureComments.textContent;

      for (let j=0;j<item[i].comments.length;j++) {
        const newComment = document.createElement('li');
        newComment.classList.add('social__comment');

        const CommImg = document.createElement('img');
        CommImg.classList.add('social__picture');
        CommImg.src=item[i].comments[j].avatar;
        CommImg.alt=item[i].comments[j].name;
        CommImg.width='35';
        CommImg.height='35';

        const message = document.createElement('p');
        message.classList.add('social__text');
        message.textContent=item[i].comments[j].message;

        newComment.appendChild(CommImg);
        newComment.appendChild(message);
        CommentsList.appendChild(newComment);
      }

      imgDesc.textContent=img.alt;
    });
  }

  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPictureWindow.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

}

export {render};
