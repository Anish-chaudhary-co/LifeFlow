<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");

if($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(204);
    exit;
}

if($_SERVER["REQUEST_METHOD"] !== "POST"){
    http_response_code(204);
    echo json_encode([
        "success" => false,
        "message" => "Method is not allowed"
    ]);
    exit;
}
$patientID = (INT) $_SESSION['user_id'];
require_once "../config/dbConnection.php";

$data = json_decode(file_get_contents("php://input"),true);
$requestID = (INT) $data['id'];
 
$status = "Accepted";

$responseUpdate = $conn->prepare("UPDATE requestresponse SET status = ? WHERE request_id = ? AND patient_id = ?");

$responseUpdate->bind_param("sii",$status,$requestID,$patientID);

$requestUpdate = $conn->prepare("UPDATE requestblood SET status = ? WHERE id = ?");

$requestUpdate->bind_param("si",$status,$requestID);

if(!$responseUpdate->execute()  || !$requestUpdate->execute()){
        http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Could not update the request blood table status.",
    ]);
    exit;
}

$conn->commit();
echo json_encode([
    "success" => true,
    "message" => "Request accepted successfully.",
]);



?>