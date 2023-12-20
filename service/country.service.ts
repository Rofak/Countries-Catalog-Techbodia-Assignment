export default class CountryService {
  api = "https://restcountries.com/v3.1";
  loading = useLoading();
  async getListCountry() {
    try {
      this.loading.value = true;
      return await $http.$get(`${this.api}/all`);
    } catch (e) {
    } finally {
      this.loading.value = false;
    }
  }

  async searchByCountryName(countryName: string) {
    try {
      this.loading.value = true;
      if (countryName) {
        return await $http.$get(`${this.api}/name/${countryName}`);
      }
      return this.getListCountry();
    } catch (e) {
    } finally {
      this.loading.value = false;
    }
  }
}
