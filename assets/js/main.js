const listPokemon = document.getElementById("pokemonList")
const loadButton = document.getElementById("loadButton")
const homeButton = document.getElementById("homeButton")
const arrowButton = document.querySelector(".arrow")

let offset = 0;
const limit = 20;
const maxRecords = 649;
 
function loadPokemons(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        listPokemon.innerHTML += pokemons.map((pokemon) => {
            return `
                <li class="pokemon bg-${pokemon.type}">
                    <span class="number">#${pokemon.number.toString().padStart(3,'0')}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="details">
                        <ol class="types ">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>
            `}).join('')
        })

}

loadPokemons(offset,limit)

loadButton.addEventListener('click', () =>{
    offset += limit
    const qtdRecords = offset + limit;
    arrowButton.setAttribute('style', 'display:block');
    arrowButton.addEventListener('click', ()=> window.scrollTo(top))
    if(qtdRecords >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemons(offset, newLimit)
        loadButton.parentElement.replaceChild(homeButton, loadButton)
        homeButton.setAttribute('style', 'display:block');
        homeButton.addEventListener('click', ()=> window.scrollTo(top))
    }else{
        loadPokemons(offset,limit)
    }
    
    
})





