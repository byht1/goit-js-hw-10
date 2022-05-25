import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import listCountryHTML from './templares/listCountry.hbs';
import cartCountryHTML from './templares/cartCountry.hbs';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
let value = null;

input.addEventListener(
  'input',
  debounce(() => {
    value = input.value.trim();
    if (value === '') {
      deleteContent();
    }
    fetchCountries(value);
  }, DEBOUNCE_DELAY),
);

function fetchCountries(name) {
  fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
    .then(arr => {
      if (arr.length === 1) {
        makingCart(arr);
      } else if (arr.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      } else {
        makingList(arr);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function makingList(clas) {
  const abc = clas.map(listCountryHTML).join('');
  deleteContent();
  list.insertAdjacentHTML('beforeend', abc);
}

function makingCart(clas) {
  const abc = clas.map(cartCountryHTML).join('');
  deleteContent();
  list.insertAdjacentHTML('beforeend', abc);
}

function deleteContent() {
  list.innerHTML = '';
  info.innerHTML = '';
}
