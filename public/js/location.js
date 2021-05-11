const buscador = document.getElementById('buscador');
const btnBuscar = document.getElementById('btnBuscar');

let lugar = "http://localhost:3000/loc="

btnBuscar.onclick = function(e){
    e.preventDefault();
    
    location.assign(lugar + buscador.value);
}