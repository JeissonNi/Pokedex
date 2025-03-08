async function buscar() {
  try {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/151");
    let data = await response.json();
    
    let imgPokemon = document.getElementById("imgPokemon");
    //console.log(data["sprites"].front_default);
    imgPokemon.src = data["sprites"].front_default;

  } catch (error) {
    console.error("Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let botonBuscar = document.getElementById("btnBuscar");
  botonBuscar.onclick = buscar;
});
