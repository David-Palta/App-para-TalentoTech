// main.js - Funciones comunes
function cerrarModal(idModal) {
    document.getElementById(idModal).style.display = 'none';
}

function abrirModal(idModal) {
    document.getElementById(idModal).style.display = 'block';
}

// Event listeners para cerrar modales
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cerrar-modal') || e.target.classList.contains('modal')) {
        e.target.closest('.modal').style.display = 'none';
    }
});

// Actualizar UI según el estado del usuario
function actualizarUIUsuario(usuario) {
    const btnRegistro = document.getElementById('btn-registro');
    const btnLogin = document.getElementById('btn-login');
    
    if (usuario) {
        btnRegistro.style.display = 'none';
        btnLogin.textContent = 'Mi Cuenta';
        // Aquí puedes agregar más lógica para mostrar el menú del usuario
    } else {
        btnRegistro.style.display = 'inline-block';
        btnLogin.textContent = 'Iniciar Sesión';
    }
}

// Verificar si hay un usuario logueado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const usuario = JSON.parse(localStorage.getItem('user'));
    actualizarUIUsuario(usuario);
});