import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPokemonDetail, getRandomBerry } from "../../api";
import { PokemonStats, PokemonType } from "../../components";
import "./PokemonDetail.css";

export default function PokemonDetail() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [berrys, setBerrys] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPokemonDetail(pokemonId);
        setLoading(false);
        setPokemon(data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const berrys = await getRandomBerry();
        setLoading(false);
        setBerrys(berrys);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="detail-page-container">
      {loading && <span>Loading...</span>}
      {pokemon && (
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
      {berrys && (
        <div className="berrys-container">
          <h5>Foods: </h5>
          {berrys.map((berry) => (
            <span key={berry.name}>{berry.name}</span>
          ))}
        </div>
      )}
    </div>
  );
}
