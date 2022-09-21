window.onload = this.getAllPokemons();

async function getAllPokemons() {
  const result = await fetch('http://localhost:3000/api/v2/pokemon?limit=150');
  const json = await result.json();

  json.sort(function sortElements(a, b) {
    return a.no - b.no;
  });

  json.forEach((item) => {
    var container = document.getElementById('pokemons');
    var pokemon = document.createElement('div');
    pokemon.className = 'pokemon';
    pokemon.id = item.no;
    pokemon.onclick = function (e) {
      e.preventDefault();
      var modal = document.getElementById('myModal');


      

      // When the user clicks the button, open the modal
     
      modal.style.display = 'block';

     
    };

    // creating elments
    var id = document.createElement('p');
    var name = document.createElement('span');
    var image = document.createElement('img');

    // text content
    id.textContent = `#${item.no}`;
    name.textContent = item.name;
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.no}.png`;

    //appends
    pokemon.appendChild(id);
    pokemon.appendChild(name);
    pokemon.appendChild(image);
    container.appendChild(pokemon);
  });
}
