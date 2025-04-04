
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const emailField = document.getElementById('email');
    const email = emailField.value;
    const password = document.getElementById('password').value;

    //   // Validación simple para detectar errores de escritura en el email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    const writingErrorDiv = document.getElementById('writingError');
    writingErrorDiv.style.display = 'block';
    writingErrorDiv.textContent = 'Error: El correo electrónico parece tener un error de escritura.';
    return;
    } else {
    document.getElementById('writingError').style.display = 'none';
    }
    setTimeout(() => {
        window.location.href = '../html/home.html?login=success';
    }, 10);

});

document.getElementById("btnRecovery").addEventListener('click', function() {
    window.location.href = '../html/recoberypassword.html';
});