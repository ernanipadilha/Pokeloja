class Carrinho {
    btnCarrinho = document.querySelector('#botao-carrinho');
    btnFecharCarrinho = document.querySelector('#fechar-carrinho');
    clickForaCart = document.querySelector('.open-cart');
    itens = [];
    total = 0;
    constructor() {
        this.btnCarrinho.addEventListener('click', this.abrirCarrinho);
        this.btnFecharCarrinho.addEventListener('click', this.fecharCarrinho);
        this.clickForaCart.addEventListener('click', this.fecharCarrinho);
    }
    abrirCarrinho(event) {
        event.preventDefault();
        const openCartClass = 'carrinho-aberto'
        document.body.className.includes(openCartClass) ? document.body.className = '' : document.body.className = openCartClass;
        addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                document.body.className = '';
            } else if (event.key === '!') {
                document.body.className = 'carrinho-aberto';
            }
        });

    }

    fecharCarrinho(event) {
        event.preventDefault();
        document.body.className = '';
    }

    adicionar(pokemon) {
        this.itens.push(pokemon);
        this.renderCarrinho(pokemon);
    }

    renderCarrinho(pokemon) {
        let pokeCar = document.querySelector('.poke-car');
        pokeCar.innerHTML = '';

        let pokeTotais = document.querySelector('.poke-total')
        pokeTotais.innerHTML = '';
        let precoTotal = 0;
        let pokemonsComprados = this.itens.map(function (pokemon, index) {
            const qtdPoke = index + 1;
             precoTotal = precoTotal + parseFloat(pokemon.precoDesc);
            console.log(precoTotal)
            const pokeItem = document.createElement('div');
            pokeItem.className = 'poke-data'
            pokeItem.innerHTML = `
            <img class="poke-item-car"
            src="${pokemon.image}"
            alt="${pokemon.nome}">
            <h4>${pokemon.nome}</h4>
            <div class="item-value">
            <p class="qtd-item">1</p>
            <button>Excluir</button>
            </div>
            <p class="price">R$ ${ pokemon.precoDesc}</p>
            `
            pokeCar.appendChild(pokeItem);
                        
            const pokeTotal = document.createElement('div');
            pokeTotal.className = 'total-cart';
            pokeTotal.innerHTML = ` 
            <h4>Total itens: ${qtdPoke}</h4>
            <h4>Valor total: R$ ${(precoTotal).toFixed(2)}</h4>
        `
            
            pokeTotais.innerHTML = '';
            pokeTotais.appendChild(pokeTotal);
        });

        // localStorage.setItem("Carrinho", pokemonsComprados);
        // console.log(localStorage);

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

})  
