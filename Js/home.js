const params = new URLSearchParams(window.location.search);
const nameuser = document.getElementById('NameLoged');
const loginReference = document.getElementById('login-reference');
const dashboard = document.getElementById('nav-links');
if (params.get('login') === 'success') {
    console.log("El usuario ha sido redirigido desde el login");
//   nameuser.innerText = 'test';
    loginReference.style = 'display: none;';
    // dashboard.innerHTML = '<a a id="dashboard" href="dashboard.html">Dashboard</a>';
    dashboard.insertAdjacentHTML(
        "beforeend",
        '<a a id="dashboard" href="dashboard.html">Dashboard</a>'
    )
}