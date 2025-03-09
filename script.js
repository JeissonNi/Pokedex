async function buscar() {
  try {
    let imgPokemon = document.getElementById("imgPokemon");
    let entradaPokemon = document.getElementById("entradaPokemon");

    document.getElementById("datosContainer").style.display = "block";

    if (entradaPokemon.value.trim() !== "") {
      let url =
        "https://pokeapi.co/api/v2/pokemon/" +
        entradaPokemon.value.toLowerCase();

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

      // Controlar el botón de sonido
      if (data.cries && data.cries.latest) {
        btnSonido.style.display = "block";
        btnSonido.onclick = () => reproducirSonido(data.cries.latest);
      } else {
        btnSonido.style.display = "none";
      }
    } else {
      alert("No has ingresado un Pokémon válido");
    }
  } catch (error) {
    console.error("Error:", error);
    alert(
      "Hubo un error en la búsqueda. Verifica el nombre e intenta de nuevo."
    );
  }
}

// Función para traducir tipos
async function traducirTipos(tipos) {
  let traducciones = [];
  for (let tipo of tipos) {
    let response = await fetch(tipo.type.url);
    let data = await response.json();
    let nombreEspanol = data.names.find((n) => n.language.name === "es");
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
    let nombreEspanol = data.names.find((n) => n.language.name === "es");
    traducciones.push(
      nombreEspanol ? nombreEspanol.name : habilidad.ability.name
    );
  }
  return traducciones.join(", ");
}

// Función para reproducir sonido con animación
function reproducirSonido(url) {
  let imgPokemon = document.getElementById("imgPokemon");
  let audio = new Audio(url);

  imgPokemon.classList.add("vibrar"); // Agrega la animación

  audio.play().then(() => {
      audio.onended = () => imgPokemon.classList.remove("vibrar"); // Quita la animación al terminar
  }).catch(error => console.error("Error al reproducir el sonido:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  let botonBuscar = document.getElementById("btnBuscar");
  botonBuscar.onclick = buscar;
});
