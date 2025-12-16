import { useState, useEffect } from 'react';
import { getPokemon } from '../api/pokemon';
import { PokemonCard } from './PokemonCard';
import '../styles/PokemonGrid.css';

export function PokemonGrid({ idsOrNames, onCardClick }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;



        async function loadAll() {
            setLoading(true);
            setError(null);

            try {
                const results = await Promise.all(idsOrNames.map(id => getPokemon(id)));
                if (!cancelled) setData(results);
            } catch (err) {
                if (!cancelled) setError(err.message || "Failed to load Pokemon data");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadAll();

        return () => {
            cancelled = true;
        };
    }, [idsOrNames]);

    if (loading) {
        return <div>Loading Pokemon...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="pokemon-grid">
            {data.map(pokemon => (
                <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={() => onCardClick(pokemon.id)}
                />
            ))}
        </div>
    );
}