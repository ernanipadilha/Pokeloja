let page = 0;

async function getPokemons(page) {    
    const limit = 20;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${limit * page}`);
    const json = await response.json();
    const pages = Math.ceil(json.count / limit);

    return json;
}

async function calcPages(page) {
    const results = await getPokemons();
    const pages = Math.ceil(results.count / 20);
    const pags = document.querySelector('.pages');
    pags.innerHTML = `${page + 1}/${pages}`
}

async function temAnterior(page) {
    const results = await getPokemons();
    const pages = Math.ceil(results.count / 20);
    const btnAnt = document.querySelector('.btn-ant');
    const btnProx = document.querySelector('.btn-prox');
    if (page === 0) {
        btnAnt.style.visibility = 'hidden';
    } else {
        btnAnt.style.visibility = 'visible'
    }

    if (page === pages -1){
        btnProx.style.visibility = 'hidden'
    } else{
        btnProx.style.visibility = 'visible'
    }
}

function btnProx() {
    const btnProx = document.querySelector('.btn-prox');

    btnProx.onclick = async () => {
        const response = await getPokemons(page += 1);
        listaPokemons(response.results);
        window.scroll({
            top: 100,
            behavior: "smooth"
        })
        temAnterior(page);
        calcPages(page)
    }
}

function btnAnt() {
    const btnAnt = document.querySelector('.btn-ant');
    btnAnt.onclick = async () => {
        const response = await getPokemons(page -= 1);
        listaPokemons(response.results);
        window.scroll({
            top: 100,
            behavior: "smooth"
        })
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
    const pokeList = document.querySelector('.content');
    pokeList.innerHTML = '<div>Carregando Pokemons....</div>';

    carrinho();
    const response = await getPokemons(page);
    listaPokemons(response.results);
    temAnterior(page);
    calcPages(page);
    btnProx();
    btnAnt();
}