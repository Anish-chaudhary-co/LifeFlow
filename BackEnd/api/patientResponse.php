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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed.",
    ]);
    exit;
}

require_once "../config/dbConnection.php";

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Login first to respond to a patient request.",
    ]);
    $conn->close();
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON payload.",
    ]);
    $conn->close();
    exit;
}

$requestId = (filter_var($data["requestId"]) ?? null, FILTER_VALIDATE_INT);
$patientId = (filter_var($data["patientId"]) ?? null, FILTER_VALIDATE_INT);
$message =trim($data["responseMsg"] ?? "");

if ($requestId === false || $requestId < 1 || $patientId === false || $patientId < 1 || $message === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "A valid patient request and response message are required.",
    ]);
    $conn->close();
    exit;
}

$donorId = (int) $_SESSION["user_id"];
$sql = "INSERT INTO requestresponse (request_id, donor_id, patient_id, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the patient response.",
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("iiis", $requestId, $donorId, $patientId, $message);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to save the patient response.",
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$stmt->close();
$conn->close();

echo json_encode([
    "success" => true,
    "message" => "Successfully sent the response to the patient.",
]);