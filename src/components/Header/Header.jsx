import { Link } from "react-router-dom";

import "./Header.css";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <h1>Pokeapp</h1>
      </Link>
      <Link to="/search">
        <h3>Search</h3>
      </Link>
    </header>
  );
}
