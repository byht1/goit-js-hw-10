export default class ServersData {
  constructor() {
    this.valueInput = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v2/name/${this.valueInput}?fields=name,capital,population,flags,languages`;
    return fetch(url)
      .then(response => response.json())
      .then(articles => {
        return articles;
      });
  }

  //   get valueInput() {
  //     return this.valueInput;
  //   }

  //   set valueInput(newValue) {
  //     this.valueInput = newValue;
  //   }
}
