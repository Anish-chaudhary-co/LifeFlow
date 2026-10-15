<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type/Authorization");
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHODS'] === 'OPTIONS'){
    exit;
}

require_once "../config/dbConnection.php";

$data = json_decode(file_get_contents("php://input"),true) ?? [];
?>