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

          // Obtener tipos y habilidades en español
          let tipos = await traducirTipos(data.types);
          let habilidades = await traducirHabilidades(data.abilities);

          // Agregar datos traducidos
          document.getElementById("pokemonNumero").textContent = data.id;
          document.getElementById("pokemonTipo").textContent = tipos;
          document.getElementById("pokemonHabilidades").textContent = habilidades;
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

  // Función para traducir tipos
async function traducirTipos(tipos) {
  let traducciones = [];
  for (let tipo of tipos) {
      let response = await fetch(tipo.type.url);
      let data = await response.json();
      let nombreEspanol = data.names.find(n => n.language.name === "es");
      traducciones.push(nombreEspanol ? nombreEspanol.name : tipo.type.name);
  }
  return traducciones.join(", ");
}

// Función para traducir habilidades
async function traducirHabilidades(habilidades) {
  let traducciones = [];
  for (let habilidad of habilidades) {
      let response = await fetch(habilidad.ability.url);
      let data = await response.json();
      let nombreEspanol = data.names.find(n => n.language.name === "es");
      traducciones.push(nombreEspanol ? nombreEspanol.name : habilidad.ability.name);
  }
  return traducciones.join(", ");
}
  
  document.addEventListener("DOMContentLoaded", () => {
    let botonBuscar = document.getElementById("btnBuscar");
    botonBuscar.onclick = buscar;
  });
  