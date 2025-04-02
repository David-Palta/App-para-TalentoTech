<?php
// login.php
header('Content-Type: application/json');

if($email === 'prueba@ecotur.com' && $password === 'prueba123'){
    echo json_encode(array('success' => true, 'user' => array('id' => 0, 'nombres' => 'Prueba', 'email' => $email)));
    $conn->close();
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // // Recoger datos enviados
    // $email = isset($_POST['email']) ? $_POST['email'] : '';
    // $password = isset($_POST['password']) ? $_POST['password'] : '';

    // // Parámetros de conexión a la base de datos
    // $servername = "localhost";
    // $username = "tu_usuario";         // Reemplaza con tu usuario de la BD
    // $dbpassword = "tu_contraseña";      // Reemplaza con tu contraseña de la BD
    // $dbname = "ecotur";

    // // Crear conexión
    // $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    // Verificar conexión
    // if ($conn->connect_error) {
    //     echo json_encode(array('success' => false, 'message' => 'Error de conexión a la base de datos.'));
    //     exit();
    // }

    // Opción: Permitir el acceso si se usan las credenciales de prueba
    if($email === 'prueba@ecotur.com' && $password === 'prueba123'){
        echo json_encode(array('success' => true, 'user' => array('id' => 0, 'nombres' => 'Prueba', 'email' => $email)));
        $conn->close();
        exit();
    }

    // Consulta preparada para evitar inyecciones SQL
    $stmt = $conn->prepare("SELECT id, nombres, email FROM usersplatform WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $email, $password);

    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0){
        // Usuario encontrado
        $user = $result->fetch_assoc();
        echo json_encode(array('success' => true, 'user' => $user));
    } else {
        // Usuario no encontrado: mensaje con temática de ecoturismo
        echo json_encode(array(
          'success' => false, 
          'message' => '¡Lo sentimos! No hemos encontrado un aventurero en nuestro ecosistema de ecoturismo.'
        ));
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array('success' => false, 'message' => 'Método no permitido.'));
}
?>

