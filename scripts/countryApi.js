export class CountryApi {
  constructor() {
    this.baseURL = "https://restcountries.com/v3.1/all";
  }

  async getCountries() {
    try {
      const res = await axios.get("https://restcountries.com/v3.1/all");
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
}
