
const pokeApi = {}

function pokeApiDetailsToPokemon(pokemonApi){
    const pokemon = new Pokemon()
    pokemon.number = pokemonApi.id
    pokemon.name = pokemonApi.name
    const types = pokemonApi.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokemonApi.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then(pokeApiDetailsToPokemon)
}


pokeApi.getPokemons = (offset = 0 , limit = 1000) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((responseBody) => responseBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.error(error))
}