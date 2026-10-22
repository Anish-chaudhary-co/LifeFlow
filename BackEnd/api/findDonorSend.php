<?php
session_start();
header("Access-Control-Allow-origin: http://localhost:5137");
header("Access-Control-Allow-Methods: POSt,OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8 ");
header("Vary: Origin");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(204);
    exit;
}
if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405);
    echo json_encode([
        "success" : false,
        "message" : "Method is not allowed"
    ]);
    exit;
}

if(!isset($_SESSION['user_id'])){
    echo json_encode([
        "success" : false,
        "message" : "You have to login first"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"),true);

$email = trim($data['email'])

require_once "../config/dbConnection.php";
?>