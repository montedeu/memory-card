import '../styles/PokemonCard.css';

export function PokemonCard({ pokemon, onClick }) {
    const official = pokemon.sprites?.other?.["official-artwork"]?.front_default;
    const classic = pokemon.sprites?.front_default;
    const imageUrl = official || classic || "";

    return (
        <div className="pokemon-card" onClick={onClick}>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={pokemon.name}
                    className="pokemon-image"
                />
            )}
            <h3 className="pokemon-name">
                {pokemon.name}
            </h3>
            <p># {pokemon.id}</p>
            <p>Types: {pokemon.types.map(t => t.type.name).join(", ")}</p>
        </div>
    );
}