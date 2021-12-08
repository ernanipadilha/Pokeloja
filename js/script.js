class Pokemon {
    constructor(nome, url) {
        this.nome = nome;
        this.url = url;
        this.id = this.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
        this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.id}.png`;
        this.preco = Math.floor(Math.random() * 100);
    }
    html() {
        const pokeDiv = document.createElement('div');
        pokeDiv.className = 'poke';
        pokeDiv.innerHTML = `<img src="${this.image}" alt="${this.nome}">
        <p>${this.nome}</p>
        <p class="oldValue">R$ ${this.preco}</p>
        <p>R$ ${(this.preco * 0.8).toFixed(2)}</p>
        <button>Comprar</button>`;

        return pokeDiv;
    }
}
let page = 0;
async function getPokemons(page) {
    const limit = 20;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${limit * page}`);
    const json = await response.json();
    const pages = Math.ceil(json.count / limit);
    
    return json;
}

async function calcPages(page){
    const results = await getPokemons();
    const pages = Math.ceil(results.count /20);
    const pags = document.querySelector('.pages');
    pags.innerHTML = `${page+1}/${pages}`
}

function temAnterior(page) {
    const btnAnt = document.querySelector('.btn-ant');
    if (page === 0){
     btnAnt.style.visibility = 'hidden';
    }else {
        btnAnt.style.visibility = 'visible'
    }
}

function btnProx() {
    const btnProx = document.querySelector('.btn-prox');

    btnProx.onclick = async () => {
        const response = await getPokemons(page += 1);
        listaPokemons(response.results);
        temAnterior(page);
        calcPages(page)
    }
}

function btnAnt(){
    const btnAnt = document.querySelector('.btn-ant');

    btnAnt.onclick = async () => {
        const response = await getPokemons(page -= 1);
        listaPokemons(response.results);
        temAnterior(page)
        calcPages(page)
    }
}

function listaPokemons(pokemonsApi) {
    const pokeList = document.querySelector('.content');
    pokeList.innerHTML = '';
    const pokemons = pokemonsApi.map((pokemon) => new Pokemon(pokemon.name, pokemon.url));

    pokemons.forEach((pokemon) => {
        const html = pokemon.html();
        pokeList.appendChild(html)
    }
    )
}

// Executa quando a página termina de carregar.
window.onload = async () => {
    const response = await getPokemons(page);
    listaPokemons(response.results);
    temAnterior(page);
    calcPages(page);
    btnProx();
    btnAnt()
}