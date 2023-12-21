const PICTURES_PER_FILTER = 10;
const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
let currentFilter = FILTERS.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (firstPicture, secondPicture) => secondPicture.comments.length-firstPicture.comments.length;

const getFilteredPic = () => {
  switch (currentFilter) {
    case FILTERS.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_PER_FILTER);
    case FILTERS.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (cb) => {
  const onFilterClick = (evt) => {
    const clickedElement = evt.target;
    if(!clickedElement.classList.contains('img-filters__button')){
      return;
    }

    if(clickedElement.id === currentFilter){
      return;
    }

    const activeButton = filtersElement.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    clickedElement.classList.add('img-filters__button--active');
    currentFilter = clickedElement.id;
    cb(getFilteredPic());
  };

  filtersElement.addEventListener('click', onFilterClick);
};

const initializeFilters = (loadedPictures, cb) => {
  filtersElement.classList.remove('img-filters--inactive');
  pictures=[...loadedPictures];
  setOnFilterClick(cb);
};

export {initializeFilters, getFilteredPic};
