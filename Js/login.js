// document.getElementById('loginForm').addEventListener('submit', function(e) {
//     e.preventDefault();
  
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
  
//     // Se realiza la petición POST al archivo PHP
//     fetch('login.php', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
//     })
//     .then(response => response.json())
//     .then(data => {
//       if(data.success) {
//         // Si el usuario existe, redirige a otra página (por ejemplo, dashboard.html)
//         window.location.href = 'dashboard.html';
//       } else {
//         // Muestra un mensaje de error llamativo relacionado con ecoturismo
//         const errorDiv = document.getElementById('errorMessage');
//         errorDiv.style.display = 'block';
//         errorDiv.innerHTML = `<strong>Error Ecoturismo:</strong> ${data.message}`;
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   });
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
    }, 5000);

//   // Realizar la petición POST al archivo PHP para autenticar
//   fetch('login.php', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
//   })
//   .then(response => response.json())
//   .then(data => {
//     if(data.success) {
//       // Si la autenticación es exitosa, redirige a la página principal (por ejemplo, dashboard.html)
//       window.location.href = 'dashboard.html';
//     } else {
//       // Muestra un mensaje de error llamativo
//       const errorDiv = document.getElementById('errorMessage');
//       errorDiv.style.display = 'block';
//       errorDiv.innerHTML = `<strong>Error Ecoturismo:</strong> ${data.message}`;
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

});

// Evento para usar credenciales de prueba
// document.getElementById('testCredentials').addEventListener('click', function() {
//   document.getElementById('email').value = 'prueba@ecotur.com';
//   document.getElementById('password').value = 'prueba123';
// });