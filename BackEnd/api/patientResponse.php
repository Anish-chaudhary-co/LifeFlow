<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once "../config/dbConnection.php";


if(!isset($_SESSION['user-id'])){
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Login first to donate blood."
        ]);
        exit;
        };
                
$donorId = (int) $_SESSION['user_id'];


$data = json_decode(file_get_contents("php://input"),true) ?? [];

$patientId = (int) ($data['user_id']);
$message = trim((String) ($data['responseMsg'] ?? ''));


$insetSql = "INSERT INTO requestresponse (request_id, donor_id, message) VALUES (?, ?, ?)";
$stmt = $conn->prepare($insetSql);
$stmt ->bind_param("iis",$patientID,$donorID, $message);


if($stmt -> execute()){
    echo json_encode([
        "insertSuccess" => true,
        "message" => "Successfully send the message to donate blood."
    ]);
    exit;
}

$conn->close();

?>