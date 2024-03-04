export class PokemonApi {
  constructor() {
    this.baseURL = "https://pokeapi.co/api/v2/";
    this.pokemon = "pokemon/";
    this.limit = "?limit=100&offset=0";
  }

  async getPokemon() {
    try {
      const url = `${this.baseURL}${this.pokemon}${this.limit}`;
      const response = await axios.get(url);
      return response.data.results;
    } catch {
      console.error("Cannot get pokemon", error);
    }
  }
}
