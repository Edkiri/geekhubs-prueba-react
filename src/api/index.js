import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2";
const POKEMON_URL = `${API_URL}/pokemon`;
const BERRY_URL = `${API_URL}/berry`;

export async function getAll(currentPage) {
  const { data } = await axios.get(currentPage);
  return data;
}

export async function getPokemonsDetail(pokemons) {
  const promises = pokemons.map((pokemon) => {
    return axios.get(pokemon.url);
  });
  const pokemonsData = await Promise.all(promises);
  return pokemonsData.map(({ data }) => data);
}

export async function getPokemonDetail(pokemonId) {
  const { data } = await axios.get(`${POKEMON_URL}/${pokemonId}`);
  return data;
}

export async function getRandomBerry() {
  const { data } = await axios.get(BERRY_URL);
  const randomBerrys = [];
  while (randomBerrys.length < 3) {
    const randomIndex = Math.floor(Math.random() * 20);
    const berryToPush = data.results[randomIndex];
    const existing = randomBerrys.filter(
      (berry) => berry.name === berryToPush.name
    );
    if (existing.length) continue;
    randomBerrys.push(berryToPush);
  }
  return randomBerrys;
}

export async function findByName(pokemonName) {
  const { data } = await axios.get(`${POKEMON_URL}/${pokemonName}`);
  return data;
}
