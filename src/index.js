import './js/apiService';
import './css/styles.css';
import LoadMoreBtn from './js/loadMoreBtn';
import NewsApiService from './js/apiService';
import cardTmpl from './templates/object.hbs';
import listTmpl from './templates/list.hbs';

const galleryContainer = document.querySelector('.js-gallery-container');
const searchForm = document.querySelector('.js-search-form');
const cardObject = document.querySelector('.card-name');
const cardList = document.querySelector('.gallery');

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Enter something valid');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearGalleryContainer();
  fetchGallery();
}

function fetchGallery() {
  loadMoreBtn.disable();
  newsApiService.fetchGallery().then(articles => {
    appendGalleryMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendGalleryMarkup(cards) {
  galleryContainer.insertAdjacentHTML('beforeend', cardTmpl(cards));
}

function clearGalleryContainer() {
  galleryContainer.innerHTML = '';
}
