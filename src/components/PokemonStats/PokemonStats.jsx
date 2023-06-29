import "./PokemonStats.css";

export default function PokemonStats({ stats }) {
  return (
    <div className="stats-table">
      <h2>Stats</h2>
      {stats.map((stat) => (
        <div key={stat.stat.name} className="row-table">
          <strong>{stat.stat.name}: </strong>
          <span>{stat.base_stat}</span>
        </div>
      ))}
    </div>
  );
}
