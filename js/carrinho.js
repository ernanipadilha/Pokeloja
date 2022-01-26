class Carrinho {
  btnCarrinho = document.querySelector('#botao-carrinho')
  btnFecharCarrinho = document.querySelector('#fechar-carrinho')
  clickForaCart = document.querySelector('.open-cart')
  //meuStorage = this.getStorage();
  total = 0

  constructor() {
    this.btnCarrinho.addEventListener('click', this.abrirCarrinho)
    this.btnFecharCarrinho.addEventListener('click', this.fecharCarrinho)
    this.clickForaCart.addEventListener('click', this.fecharCarrinho)
    this.meuStorage = this.getStorage()
  }

  abrirCarrinho(event) {
    event.preventDefault()
    window.carrinho.renderCarrinho()
    const openCartClass = 'carrinho-aberto'
    document.body.className.includes(openCartClass)
      ? (document.body.className = '')
      : (document.body.className = openCartClass)
    addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        document.body.className = ''
      } else if (event.key === '!') {
        document.body.className = 'carrinho-aberto'
        window.carrinho.renderCarrinho()
      }
    })
  }

  fecharCarrinho(event) {
    event.preventDefault()
    document.body.className = ''
  }

  adicionar(pokemon) {
    this.populateStorage(pokemon)
    document.body.className = 'carrinho-aberto'
    this.renderCarrinho()
  }

  renderCarrinho() {
    const pokemonsNoCarrinho = this.getStorage()

    const pokeCar = document.querySelector('.poke-car')
    pokeCar.innerHTML = ''

    const pokeTotais = document.querySelector('.poke-total')
    pokeTotais.innerHTML = ''
    let precoTotal = 0
    const pokemonsAlreadyAdded = []

    if (pokemonsNoCarrinho) {
      pokemonsNoCarrinho.map((itens) => {
        const pokemonExist = pokemonsAlreadyAdded.find(
          (pokemon) => pokemon.id == itens.id,
        )
        if (pokemonExist) {
          pokemonExist.qtd = pokemonExist.qtd + 1
          pokemonsAlreadyAdded.push(pokemonExist)
          this.updatePokemonQtd(pokemonExist.id, pokemonExist.qtd)
        } else {
          pokemonsAlreadyAdded.push({ id: itens.id, qtd: 1 })
          pokeCar.appendChild(this.createPokemonItem(itens))
        }

        precoTotal = precoTotal + parseFloat(itens.precoDesc)
      })

      pokeTotais.appendChild(
        this.addDetails(pokemonsNoCarrinho.length, precoTotal),
      )
    }
  }

  updatePokemonQtd(pokemonId, pokemonQtd) {
    const qtdElement = document.querySelector(`.qtd-item-${pokemonId}`)
    qtdElement.innerHTML = pokemonQtd
  }

  removePokemonItem(pokemonId) {
    const pokemonsNoCarrinho = this.getStorage()
    const findPoke = pokemonsNoCarrinho.filter(
      (pokemonsNoCarrinho) => pokemonsNoCarrinho.id != pokemonId,
    )

    this.deleteStorage(findPoke)
    this.renderCarrinho()
  }

  createPokemonItem(item) {
    const pokeItem = document.createElement('div')
    pokeItem.className = 'poke-data'
    pokeItem.innerHTML = `
        <img class="poke-item-car"
        src="${item.image}"
        alt="${item.nome}">
        <h4>${item.nome}</h4>
        <div class="item-value">
        <p class="qtd-item qtd-item-${item.id}">1</p>
        <button  onClick="window.carrinho.removePokemonItem(${item.id})" class="removerPokemon">Excluir</button>
        </div>
        <p class="price">R$ ${item.precoDesc}</p>`

    return pokeItem
  }

  addDetails(totalItens, precoTotal) {
    const pokeTotal = document.createElement('div')
    pokeTotal.className = 'total-cart'
    pokeTotal.innerHTML = ` 
        <h4>Total itens: ${totalItens}</h4>
        <h4>Valor total: R$ ${precoTotal.toFixed(2)}</h4>`

    return pokeTotal
  }

  deleteStorage(findPoke) {
    localStorage.setItem('pokemonsNoCarrinho', JSON.stringify(findPoke))
  }

  populateStorage(pokemon) {
    const pokemons = this.getStorage() || []
    pokemons.push(pokemon)
    localStorage.setItem('pokemonsNoCarrinho', JSON.stringify(pokemons))
  }

  getStorage() {
    return JSON.parse(localStorage.getItem('pokemonsNoCarrinho'))
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
  window.carrinho = new Carrinho()
})
