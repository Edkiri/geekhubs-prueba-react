import "./PokemonType.css";

export default function PokemonType({ pokeTypes }) {
  const typeLabel = pokeTypes.length > 1 ? "Types: " : "Type: ";
  return (
    <div className="types-container">
      <strong>{typeLabel}</strong>
      {pokeTypes.map(({ slot, type }) => (
        <div key={slot} className="type-container">
          <strong>{type.name}</strong>
        </div>
      ))}
    </div>
  );
}
