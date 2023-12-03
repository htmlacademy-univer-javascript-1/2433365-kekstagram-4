import { isEscapeKey } from './util.js';

const bigPictureWindow = document.querySelector('.big-picture');

const commentsCount = bigPictureWindow.querySelector('.social__comment-count');
const commentsList = bigPictureWindow.querySelector('.social__comments');
const commentsLoader = bigPictureWindow.querySelector('.comments-loader');
const closeButton = bigPictureWindow.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const COMMENTS_PER_CLICK = 5;
let commentsShown=0;
let comments=[];

const createComments = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent=message;

  return comment;
};

const renderComments = () => {
  commentsShown+=COMMENTS_PER_CLICK;
  if (commentsShown>= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown=comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComments(comments[i]);
    fragment.append(comment);
  }

  commentsList.innerHTML='';
  commentsList.appendChild(fragment);
  commentsCount.textContent=`${commentsShown} из ${comments.length} комментариев`;
};

const onCommentsLoaderClick = () => renderComments();

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

const renderPictureDetails = ({url, likes, description}) => {
  bigPictureWindow.querySelector('.big-picture__img img').src=url;
  bigPictureWindow.querySelector('.big-picture__img img').alt=description;
  bigPictureWindow.querySelector('.likes-count').textContent=likes;
  bigPictureWindow.querySelector('.social__caption').textContent=description;
};

function openBigPic(data) {
  bigPictureWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onClickClose);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  renderPictureDetails(data);
  comments=data.comments;
  if (comments.length>0){renderComments();}
}

function closeBigPic() {
  bigPictureWindow.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsList.innerHTML='';
  commentsShown=0;

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onClickClose);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

export {openBigPic};
