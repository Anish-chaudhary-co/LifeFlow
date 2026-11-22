<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Vary: Origin");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed.",
    ]);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Please sign in to delete a request.",
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$requestId = filter_var($data['requestId'] ?? NULL , FILTER_VALIDATE_INT);
$userId = (INT) $_SESSION['user_id'];

if($requestId === false  || $requestId === null){
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "ID is invalid."
    ]);
    exit;
}

require_once __DIR__ . "/../config/dbConnection.php";

$deleteResponse = $conn->prepare("DELETE FROM requestresponse WHERE request_id = ? AND patient_id = ?");

if(!$deleteResponse){
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare delete response."
    ]);
    $conn->close();
    exit;
}

$deleteResponse->bind_param("ii",$requestId, $userId);

$deleteRequest = $conn->prepare("DELETE FROM requestBlood WHERE id = ? AND user_id = ?");


if (!$deleteRequest) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the delete request.",
    ]);
    $conn->close();
    exit;
}



$deleteRequest->bind_param("ii", $requestId, $userId);

if (!$deleteResponse->execute() || !$deleteRequest->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete blood request from request response and request blood table.",
    ]);
} elseif ($deleteResponse->affected_rows > 0 && $deleteRequest->affected_rows > 0) {
    echo json_encode([
        "success" => true,
        "message" => "Blood request deleted successfully.",
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "No blood request found with this ID.",
    ]);
}

$deleteResponse->close();
$deleteRequest->close();
$conn->close();
?>
