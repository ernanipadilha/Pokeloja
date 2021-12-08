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