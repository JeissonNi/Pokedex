async function buscar() {
    try {
      let imgPokemon = document.getElementById("imgPokemon");
      let entradaPokemon = document.getElementById("entradaPokemon");

  
      if (entradaPokemon.value.trim() !== "") {
          let url = "https://pokeapi.co/api/v2/pokemon/" + entradaPokemon.value.toLowerCase(); 
          
          let response = await fetch(url);
  
          if (!response.ok) {
            throw new Error("Pokémon no encontrado");
          }
  
          let data = await response.json();
          
          //Agregar imagen
          imgPokemon.src = data.sprites.front_default;
          
          //Agregar nombre 
          document.getElementById("nombrePokemon").textContent = data.name;

          //Agregar datos
          document.getElementById("pokemonNumero").textContent = data.id;
          document.getElementById("pokemonTipo").textContent = data.types.map(t => t.type.name).join(", ");
          document.getElementById("pokemonHabilidades").textContent = data.abilities.map(a => a.ability.name).join(", ");
          document.getElementById("pokemonPeso").textContent = data.weight / 10;
          document.getElementById("pokemonAltura").textContent = data.height / 10;

          // Reproducir sonido del Pokémon (si está disponible)
          if (data.cries && data.cries.latest) {
            let audio = new Audio(data.cries.latest);
            audio.play();
        }

      } else {
          alert("No has ingresado un Pokémon válido");
      }
  
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error en la búsqueda. Verifica el nombre e intenta de nuevo.");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    let botonBuscar = document.getElementById("btnBuscar");
    botonBuscar.onclick = buscar;
  });
  