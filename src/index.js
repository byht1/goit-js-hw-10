import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import listCountryHTML from './templares/listCountry.hbs';
import cartCountryHTML from './templares/cartCountry.hbs';
import ServersData from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const newServersData = new ServersData();
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(() => {
    newServersData.valueInput = input.value.trim();
    if (newServersData.valueInput === '') {
      deleteContent();
      return;
    }

    visoClass();
  }, DEBOUNCE_DELAY),
);

function visoClass() {
  newServersData
    .fetchCountries()
    .then(howManyElements)
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      return;
    });
}

function howManyElements(element) {
  if (element.length === 1) {
    makingCart(element);
  } else if (element.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else {
    makingList(element);
  }
}

function makingList(clas) {
  const sample = clas.map(listCountryHTML).join('');
  deleteContent();
  list.insertAdjacentHTML('beforeend', sample);
}

function makingCart(clas) {
  const sample = clas.map(cartCountryHTML).join('');
  deleteContent();
  list.insertAdjacentHTML('beforeend', sample);
}

function deleteContent() {
  list.innerHTML = '';
  info.innerHTML = '';
}
