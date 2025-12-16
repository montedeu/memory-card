const CACHE_KEY = "pokemonCache_v1";
const TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

function loadCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveCache(cache) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {}
}

let cacheObj =  loadCache();

function getFromCache(key) {
    const entry = cacheObj[key];
    if (!entry) return null;
    if (Date.now() - entry.timestamp > TTL_MS) return null;
    return entry.data;
}

function setToCache(key, data) {
    cacheObj[key] = { timestamp: Date.now(), data };
    saveCache(cacheObj);
}

export async function getPokemon(nameOrId) {
    const key = String(nameOrId).toLowerCase();

    const cached = getFromCache(key);
    if (cached) return cached;

    const url = `https://pokeapi.co/api/v2/pokemon/${key}`;
    try {
        console.log(`Fetching Pokemon from ${url}`);
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`API error for ${key}: ${res.status} ${res.statusText}`);
            throw new Error(`Pokemon "${key}" not found (${res.status})`);
        }

        const data = await res.json();
        console.log(`Successfully fetched ${key}:`, data.name);
        setToCache(key, data);
        return data;
    } catch (err) {
        console.error(`Fetch error for ${key}:`, err);
        throw err;
    }
}

export async function getPokemonImageUrl(nameOrId) {
    const data = await getPokemon(nameOrId);
    const official = data.sprites?.other?.["official-artwork"]?.front_default;
    const classic = data.sprites?.front_default;
    return official || classic || null;
}