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

        const teclaPressionada = addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                document.body.className = '';
            }
        });

    }

    fecharCarrinho(event) {
        event.preventDefault();
        document.body.className = '';
    }

    adicionar(pokemon) {
        this.itens.push(pokemon);

        const pokemonsComprados = this.itens.map(
            function(item, index){
                const qtdPokemons = index + 1;
                console.log(qtdPokemons)
                console.log(item.nome + ' ' + item.image + ' '+item.precoDesc);
                return  `<div>${item.nome}<div>`           
                
            })
            
    }

    //localStorage.setItem();
    /*
    TODO: 
    Calcular total do carrinho ao adicionar pokemon
    Render no carrinho ao add
    Remover um pokemon
    Calcular total do carrinho ao remover e renderizar o carrinho
    Abrir o carrinho
    */

}

window.addEventListener('load', async () => {
    window.carrinho = new Carrinho();
})  
