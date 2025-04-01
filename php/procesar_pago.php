<?php
header('Content-Type: application/json');

//  validación
$datos = json_decode(file_get_contents('php://input'), true);

if (
    !empty($datos['tarjeta']) && 
    !empty($datos['nombre']) && 
    !empty($datos['fecha']) && 
    !empty($datos['cvv']) && 
    !empty($datos['monto'])
)
 {
    echo json_encode([
        'exito' => true,
        'mensaje' => '¡Pago exitoso! Se cobraron $' . $datos['monto'] . ' a tu tarjeta.'
    ]);
} else {
    echo json_encode([
        'exito' => false,
        'mensaje' => 'Error: Faltan datos requeridos.'
    ]);
}
?>