async function obtenerDatos() {
    try {
      let response = await fetch('https://pokeapi.co/api/v2/pokemon/151');
      let data = await response.json();
      console.log(data["name"]);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  obtenerDatos();
  