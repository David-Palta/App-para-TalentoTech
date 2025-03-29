const images = document.querySelectorAll('.carousel img');
let index = 0;

setInterval(() => {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
}, 4000);

function toggleMenu() {
    document.getElementById('nav-links').classList.toggle('active');
}


const Sqlite3 = BasedeDatos( "Basededatos.db");


const Btn_Agregar = document.getElementsByid ("agregar");
    Btn_Agregar.AddEventlistener ( "Clik", function CrearNombre(params) {
        
    })//Estructura para crear formulario dinamico, insertar datos desde HTMl a Sql.//

function newFunction() {
    const Sqlite3;
    return Sqlite3;
}
