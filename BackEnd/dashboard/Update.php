<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");

if($_SERVER['REQUEST_METHOD'] === "OPTIONS"){
    exit;
}

if($_SERVER['REQUEST_METHOD'] === "GET"){
    echo json_encode([
        "success" => false,
        "message" => "This method is not allowed"
    ]);
}

require_once "../config/dbConnection.php";

$date = json_decode(file_get_contents("php://input"),true);


?>