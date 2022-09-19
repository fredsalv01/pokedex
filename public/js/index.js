window.onload = this.getAllPokemons();

async function getAllPokemons() {
  const result = await fetch('http://localhost:3000/api/v2/pokemon');
  const json = await result.json();

  json.sort(function sortElements(a, b) {
    return a.no - b.no;
  });

  json.forEach((item) => {
    var pokemon = document.createElement('div');
    pokemon.className = 'pokemon';
    pokemon.id = item.no;
    pokemon.textContent = item.name;
    var id = document.createElement('p');
    id.textContent = `#${item.no}`;
    pokemon.appendChild(id);
    document.getElementById('pokemons').appendChild(pokemon);
  });
}
