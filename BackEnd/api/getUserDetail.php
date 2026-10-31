<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(204);
    exit;
}

if($_SERVER['REQUEST_METHOD'] !== 'GET'){
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method is not allowed"
    ]);
    exit;
}

require_once "../config/dbConnection.php";

$UserID = (INT) $_SESSION['user_id'];

$sql = "SELECT id, request_id, donor_id, patient_id, message, status FROM requestresponse WHERE patient_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i",$UserID);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows > 0){
    $data = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "data" => $data,
        "message" => "successfully get the response of the request",
    ]);
exit;
}

$stmt->close();
$conn->close();
?>