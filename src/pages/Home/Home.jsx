import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAll, getPokemonsDetail } from "../../api";
import { PokemonType } from "../../components";
import "./Home.css";

const FIRST_PAGE_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_URL);
  const [nextPage, setNextPage] = useState(null);
  const [prviusPage, setPreviusPage] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getAll(currentPage);
        setNextPage(data.next);
        setPreviusPage(data.previous);
        setLoading(false);
        setPokemons(data.results);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [currentPage]);

  useEffect(() => {
    if (pokemons.length) {
      (async () => {
        try {
          const data = await getPokemonsDetail(pokemons);
          setLoading(false);
          setPokemonsData(data);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      })();
    }
  }, [pokemons]);

  const handleNextPage = () => {
    setCurrentPage(nextPage);
  };
  const handlePreviusPage = () => {
    setCurrentPage(prviusPage);
  };

  return (
    <section className="home-container">
      <h1>Poke prueba</h1>

      <div className="buttons">
        {prviusPage && (
          <button className="nav-button" onClick={handlePreviusPage}>
            Back
          </button>
        )}
        {nextPage && (
          <button className="nav-button" onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>

      {loading && <span>Loading...</span>}

      <div className="pokemon-list">
        {pokemonsData &&
          pokemonsData.map((pokemon) => (
            <div key={pokemon.name} className="pokemon-card">
              <img
                src={pokemon.sprites.front_default}
                alt={`Imagen de ${pokemon.name}`}
              />
              <h3>{pokemon.name}</h3>
              <PokemonType pokeTypes={pokemon.types} />
              <Link to={`/pokemon/${pokemon.id}`}>Ver detalle</Link>
            </div>
          ))}
      </div>
    </section>
  );
}
