import { Route, Routes } from "react-router-dom";

import { Header } from "./components";
import { Home, NotFound, PokemonDetail, Search } from "./pages";

export default function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
