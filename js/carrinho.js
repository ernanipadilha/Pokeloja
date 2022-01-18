class Carrinho {
    btnCarrinho = document.querySelector('#botao-carrinho');
    btnFecharCarrinho = document.querySelector('#fechar-carrinho');
    clickForaCart = document.querySelector('.open-cart');
    meuStorage = localStorage;
    total = 0;

    constructor() {
        this.btnCarrinho.addEventListener('click', this.abrirCarrinho);
        this.btnFecharCarrinho.addEventListener('click', this.fecharCarrinho);
        this.clickForaCart.addEventListener('click', this.fecharCarrinho);

    }

    abrirCarrinho(event) {
        event.preventDefault();
        window.carrinho.renderCarrinho();
        const openCartClass = 'carrinho-aberto';
        document.body.className.includes(openCartClass) ? document.body.className = '' : document.body.className = openCartClass;
        addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                document.body.className = '';
            } else if (event.key === '!') {
                document.body.className = 'carrinho-aberto';
            }
        });
    }

    removerPokemon(event) {
        event.preventDefault();
        console.log("Clicou aqui")
    }

    fecharCarrinho(event) {
        event.preventDefault();
        document.body.className = '';
    }

    adicionar(pokemon) {
        this.populateStorage(pokemon);
        this.renderCarrinho();
    }

    renderCarrinho() {
        const pokemons = this.getStorage();

        const pokeCar = document.querySelector('.poke-car');
        pokeCar.innerHTML = '';

        const pokeTotais = document.querySelector('.poke-total')
        pokeTotais.innerHTML = '';
        let precoTotal = 0;
        let pokemonsComprados = pokemons.map((itens, index) => {
            const qtdPoke = index + 1;
            precoTotal = precoTotal + parseFloat(itens.precoDesc);
            const pokeItem = document.createElement('div');
            pokeItem.className = 'poke-data';
            pokeItem.innerHTML = `
            <img class="poke-item-car"
            src="${itens.image}"
            alt="${itens.nome}">
            <h4>${itens.nome}</h4>
            <div class="item-value">
            <p class="qtd-item">1</p>
            <button data-id="${itens.id}" class="removerPokemon">Excluir</button>
            </div>
            <p class="price">R$ ${itens.precoDesc}</p>`;
            pokeCar.appendChild(pokeItem);

            const pokeTotal = document.createElement('div');
            pokeTotal.className = 'total-cart';
            pokeTotal.innerHTML = ` 
            <h4>Total itens: ${qtdPoke}</h4>
            <h4>Valor total: R$ ${(precoTotal).toFixed(2)}</h4>`;

            pokeTotais.innerHTML = '';
            pokeTotais.appendChild(pokeTotal);
        });
        const removerPoke = document.querySelectorAll('.removerPokemon');
        removerPoke.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                const id = event.target.getAttribute('data-id');
                console.log("Clicou aqui no pokemon -> " + id);
            });
        });
    }

    populateStorage(pokemon) {
        const pokemons = this.getStorage() || [];
        pokemons.push(pokemon);
        localStorage.setItem("pokemonsNoCarrinho", JSON.stringify(pokemons));
    }

    getStorage() {
        return JSON.parse(localStorage.getItem("pokemonsNoCarrinho"));
    }
}

/*
TODO: 
Calcular total do carrinho ao adicionar pokemon
Render no carrinho ao add
Remover um pokemon
Calcular total do carrinho ao remover e renderizar o carrinho
Abrir o carrinho
*/

window.addEventListener('load', async () => {
    window.carrinho = new Carrinho();
});