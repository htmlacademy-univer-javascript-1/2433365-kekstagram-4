const newPhotoTemplate = document.querySelector('#picture').content;

const data = [
  { url: './img/logo-background-2.jpg', description: 'Desc1', likes: 5, comments: 2 },
  { url: './img/logo-background-1.jpg', description: 'Desc2', likes: 10, comments: 3 },
];

function createPicture(item) {
  const newPhoto = newPhotoTemplate.cloneNode(true);
  const pictureImage = newPhoto.querySelector('.picture__img');
  const pictureLikes = newPhoto.querySelector('.picture__likes');
  const pictureComments = newPhoto.querySelector('.picture__comments');

  pictureImage.src = item.url;
  pictureImage.alt = item.description;

  pictureLikes.textContent = item.likes;

  pictureComments.textContent = item.comments;

  return newPhoto;
}

function renderPictures(pictures) {
  const picturesBlock = document.querySelector('.pictures');

  pictures.forEach((item) => {
    const picture = createPicture(item);
    picturesBlock.appendChild(picture);
  });
}

renderPictures(data);
