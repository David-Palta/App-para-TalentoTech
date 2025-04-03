document.getElementById('form-reserva').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const destino = document.getElementById('destino').value;
    const fecha = document.getElementById('fecha').value;
    const personas = document.getElementById('personas').value;
    
    const mensaje = document.getElementById('mensaje-reserva');
    mensaje.textContent = `¡Reserva confirmada! ${personas} personas para ${destino} el ${fecha}.`;
    mensaje.style.display = 'block';
    mensaje.style.backgroundColor = '#d4edda';
    mensaje.style.color = '#155724';
    
    // Limpiar formulario
    document.getElementById('form-reserva').reset();
});
function openDialog() {
    document.getElementById("dialogBox").style.display = "flex";
  }

  function closeDialog() {
    document.getElementById("dialogBox").style.display = "none";
  }

  function goToPayment() {
    window.location.href = "../html/formularioDePago.html";
  }