const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("buscar");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pikachu.png");
            document.getElementById('nombre').value='';
            document.getElementById('tipo').value='';
            eliminarContenidoEstadistica();
            eliminarContenidoMovimientos();


        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);

            let pokeNombre = data.name;
            console.log(pokeNombre);
            pokemonNombre(pokeNombre);

            let pokeTipo=data.types[0].type.name;
            console.log(pokeTipo);
            pokemonTipo(pokeTipo);
            eliminarContenidoEstadistica();
            eliminarContenidoMovimientos();

            let stadistc=data.stats;
           
            for(var i=0;i<stadistc.length;i++){
                agregarEstadisticas(stadistc[i].stat.name,stadistc[i].base_stat);
            }

            let movimientos = data.moves;
            for(var j = 0; j < movimientos.length; j++)
            {

                agregarMovimientos(movimientos[j].move.name);
                
            }
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("bosque");
    pokePhoto.src = url;
}
const pokemonNombre= (nombre) => {
    const Nombre = document.getElementById("nombre");
    Nombre.value = nombre;
}

const pokemonTipo=(tipo)=>{
    const contenedorTipo=document.getElementById("tipo");
    contenedorTipo.value=tipo;
}
const agregarEstadisticas = (nameStat,valueStat) => {
    var targetDiv = document.getElementById('Estadistica');
   targetDiv.insertAdjacentHTML('beforeend', `<p>${nameStat}: ${valueStat}</p>`);
  // targetDiv.innerHTML = `${nameStat}: ${valueStat} <br>`;
  
}

const agregarMovimientos = (value) => {
    var movimientoDiv = document.getElementById('movimientos');
    //movimientoDiv.insertAdjacentHTML('afterend', `${value} <br>` );
    movimientoDiv.insertAdjacentHTML('beforeend', `<label>${value} </label>`);
}


function eliminarContenidoEstadistica() {
    document.getElementById('Estadistica').innerHTML='';
   }

 function eliminarContenidoMovimientos() {
    document.getElementById('movimientos').innerHTML='';
   }
   


