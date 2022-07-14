import { Notify } from 'notiflix/build/notiflix-notify-aio';


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: '250' });

import { fetchImages } from '../js/fetchImages';
import { resetPage } from '../js/fetchImages';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btn = document.querySelector('.load-more-btn')

form.addEventListener('submit', onFormSubmit);
btn.addEventListener('click', onLoadMoreBtnClick);
btn.classList.add('is-hidden')

async function onFormSubmit(e) {
  e.preventDefault();
  resetCardsGallery();
  resetPage();
  searchText = form.elements.searchQuery.value.trim();
  console.log(searchText)
  const { hits } = await fetchImages(searchText);
  e.target.reset();
  if (hits.length === 0) {
    alertNoImagesFound()
  }
  renderCards(hits);
  lightbox.refresh();
  btn.classList.remove('is-hidden')
}



function createCards(cards) {
  return cards.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `
  
  ).join('');

} 

function renderCards(cards) {
  gallery.insertAdjacentHTML('beforeend', createCards(cards));
}

function resetCardsGallery() {
  gallery.innerHTML = ''; 
}

async function onLoadMoreBtnClick() {
  const { hits } = await fetchImages(searchText);
  renderCards(hits);
  lightbox.refresh();
}

function alertNoImagesFound() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}