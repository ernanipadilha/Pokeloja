class Pokemon {
    constructor(options) {
        this.name = options.name;
        this.types = options.types.map(typeItens => typeItens.type.name);
        this.abilities = options.abilities.map(abilityType => abilityType.ability.name);
        this.id = options.id;
        this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.id}.png`;
    };
    
    html() {
        const pokeDiv = document.querySelector('.poke-details');
        pokeDiv.innerHTML = `
            <div class="poke-img">
             <img src="${this.image}" alt="${this.name}">
             </div>
             <div class="poke-info">
                    <h1>${this.name}</h1>
                    <hr>
                    <h2>Tipo</h2>
                    <ul>
                        <li>${this.types}</li>  
                    </ul>
                    <hr>
                    <h2>Habilidades</h2>
                    <ul>
                        <li>${this.abilities}</li>
                    </ul>
             </div>`
        return pokeDiv;
    }
}


function getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params
}

async function getPokemonData(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

const fakePromise = () => new Promise((resolve) => setTimeout(resolve, 3000));

window.onload = async function () {
     const { id } = getQueryParams();
    const pokemonDiv = document.querySelector(".poke-details");
        
    try{
        await fakePromise()
        const data = await getPokemonData(id);
        const pokemon = new Pokemon(data);
         pokemon.html();
    }catch(error){
        pokemonDiv.innerHTML = `<div class="error">Pokemon não encontrado!!</div>`
    }
}