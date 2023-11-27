import { isEscapeKey } from './util.js';
function render (item) {
  const miniPicContainer = document.querySelector('.pictures');
  const miniPics = miniPicContainer.querySelectorAll('.picture');

  const bigPictureWindow = document.querySelector('.big-picture');

  const BigPicImg = bigPictureWindow.querySelector('img');
  const imgLikes = bigPictureWindow.querySelector('.likes-count');
  const imgComments = bigPictureWindow.querySelector('.comments-count');
  const imgDesc = bigPictureWindow.querySelector('.social__caption');

  const commentsList = bigPictureWindow.querySelector('.social__comments');

  const closeButton = bigPictureWindow.querySelector('.big-picture__cancel');
  const commentsLoader = bigPictureWindow.querySelector('.comments-loader');

  const commentsCount = bigPictureWindow.querySelector('.social__comment-count');

  const showMoreComments = (evt) => {
    evt.preventDefault();
    let counter;
    if (commentsList.children.length>5){
      counter = 5;
      for (let i=0;i<commentsList.children.length;i++){
        if (commentsList.children[i].classList.contains('hidden')) {
          commentsList.children[i].classList.remove('hidden');
          counter +=5;
        }
      }
      if (commentsList.children.length%5!==0) {
        counter+=commentsList.children.length;
      }
      if (commentsList.children.length<counter) {counter = commentsList.children.length;}
    } else {counter=commentsList.children.length;}
    commentsCount.textContent=`${counter} из ${commentsList.children.length} комментариев`;
  };

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
    commentsLoader.addEventListener('click', showMoreComments);
  }

  function closeBigPic() {
    bigPictureWindow.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    commentsList.innerHTML='';

    document.removeEventListener('keydown', onDocumentKeydown);
    closeButton.removeEventListener('click', onClickClose);
    commentsLoader.removeEventListener('click', showMoreComments);
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

      commentsList.innerHTML='';
      for (let j=0;j<item[i].comments.length;j++) {
        const newComment = document.createElement('li');
        newComment.classList.add('social__comment');
        newComment.classList.add('hidden');

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
        commentsList.appendChild(newComment);
      }
      if (commentsList.children.length>5) {
        commentsCount.textContent=`5 из ${commentsList.children.length} комментариев`;
      } else {commentsCount.textContent=`${commentsList.children.length} из ${commentsList.children.length} комментариев`;}
      for (let j=0; j<5;j++){commentsList.children[j].classList.remove('hidden');}
      imgDesc.textContent=img.alt;
    });
  }
}

export {render};
