document.getElementById('formularioPago').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const datosPago = {
        tarjeta: document.getElementById('tarjeta').value,
        nombre: document.getElementById('nombre').value,
        fecha: document.getElementById('fecha').value,
        cvv: document.getElementById('cvv').value,
        monto: document.getElementById('monto').value
    };

    // Configuración de la petición AJAX.
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'procesar_pago.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        const respuesta = JSON.parse(this.responseText);
        const mensaje = document.getElementById('mensaje');
        
        if (this.status === 200 && respuesta.exito) {
            mensaje.innerHTML = respuesta.mensaje;
            mensaje.className = 'exito';
          
            document.getElementById('formularioPago').reset();
        } else {
            mensaje.innerHTML = respuesta.mensaje || 'Error en el pago.';
            mensaje.className = 'error';
        }
    };

    xhr.onerror = function() {
        document.getElementById('mensaje').innerHTML = 'Error de conexión.';
        document.getElementById('mensaje').className = 'error';
    };

    // Enviar JSON.
    xhr.send(JSON.stringify(datosPago));
});