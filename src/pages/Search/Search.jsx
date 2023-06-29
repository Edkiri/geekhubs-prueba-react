import { useState } from "react";
import "./Search.css";
import { findByName } from "../../api";
import { PokemonStats, PokemonType } from "../../components";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (searchValue.trim() === "") return;
    setError("");
    try {
      setLoading(true);
      const data = await findByName(searchValue);
      setPokemon(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(`No existe el pokemon '${searchValue}'`);
    }
  };

  return (
    <div className="search-page-container">
      <form onSubmit={handleSumbit}>
        <input value={searchValue} onChange={handleChange} type="text" />
        <button type="submit">Search</button>
      </form>
      {loading && <span>Loading...</span>}
      {error && <span>{error}</span>}
      {pokemon && !error && (
        <div className="pokemon-detail-container">
          <h1>{pokemon.name}</h1>
          <img
            src={pokemon.sprites.front_default}
            alt={`Imagen de ${pokemon.name}`}
          />
          <PokemonType pokeTypes={pokemon.types} />
          <PokemonStats stats={pokemon.stats} />
        </div>
      )}
    </div>
  );
}
