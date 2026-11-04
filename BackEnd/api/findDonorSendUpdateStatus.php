<?php
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
require_once "../config/dbConnection.php";

$data = json_decode(file_get_contents("php://input"),true);
$id = (INT) $data['id'];

$status = "Confirm";

$sql = "UPDATE requestresponse SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the response query.",
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("si",$status,$id);
$stmt->execute();

echo json_encode([
    "success" => true,
    "message" => "Successfully conform the response.",
]);

$conn->close();

?>