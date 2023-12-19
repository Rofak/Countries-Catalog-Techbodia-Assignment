export default class CountryService {
  api = "https://restcountries.com/v3.1";
  async getListCountry() {
    return await $http.$get(`${this.api}/all`);
  }

  async searchByCountryName(countryName: string) {
    if (countryName) {
      return await $http.$get(`${this.api}/name/${countryName}`);
    }
    return this.getListCountry();
  }
}
