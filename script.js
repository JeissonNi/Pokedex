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
          imgPokemon.src = data.sprites.front_default;
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
  