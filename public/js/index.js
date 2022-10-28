window.onload = async () => {
  await this.getAllPokemons();
  clickPokemon();
};

async function getAllPokemons() {
  const result = await fetch(
    'https://nestjs-poke.herokuapp.com/api/v2/pokemon?limit=150',
  );
  const json = await result.json();

  json.sort(function sortElements(a, b) {
    return a.no - b.no;
  });

  json.forEach((item) => {
    var container = document.getElementById('pokemons');
    var pokemon = document.createElement('div');
    pokemon.className = 'pokemon';
    pokemon.id = item.no;

    //   modal.style.display = 'block';
    //   // //obtener los elementos dentro del modal para mostrar la data
    //   // var title = document.getElementsByClassName('pokemon-name');
    //   // var numberTag = document.getElementsByClassName('pokemon-number');
    //   // // var desc = document.getElementsByClassName('description');

    //   // title.innerHTML = item.name;
    //   // numberTag.innerHTML = '# ' + item.no;
    //   // // desc.innerHTML = elementData.description;

    //   // When the user clicks the button, open the modal
    //   modal.style.display = 'block';
    // };

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

clickPokemon = () => {
  const pokemon = document.querySelectorAll('.pokemon');
  pokemon.forEach(function (trigger) {
    trigger.addEventListener('click', async function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      console.log(e.target.id);
      const loader = document.getElementById('loading');
      const modal = document.getElementById('myModal');
      //set loader visible
      loader.style.display = 'flex';

      setTimeout(async () => {
        //get data of pokemon
        const pokemonData = await getPokemon(e.target.id);
        //set loader invisible
        loader.style.display = 'none';

        //obtener los elementos dentro del modal para mostrar la data
        var title = document.getElementById('pkmnName');
        var numberTag = document.getElementById('pkmnNumber');
        var desc = document.getElementById('pkmnDesc');

        title.innerHTML = pokemonData.name;
        numberTag.innerHTML = '# ' + pokemonData.id;
        desc.innerHTML = `${pokemonData.flavor_text_entries[3].flavor_text.replace(
          /(\r\n|\n|\r)/gm,
          ' ',
        )}`;

        //set modal visible
        modal.style.display = 'block';
      }, 2000);
    });
  });
};

async function getPokemon(id) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const json = await data.json();
  console.log(json);
  return json;
}
