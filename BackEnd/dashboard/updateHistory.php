<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
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
        "message" => "This method is not allowed.",
    ]);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Please sign in to update a request.",
    ]);
    exit;
}

require_once "../config/dbConnection.php";

$data = json_decode(file_get_contents("php://input"), true) ?? [];
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON payload.",
    ]);
    $conn->close();
    exit;
}

$id = isset($data['id']) ? (int) $data['id'] : 0;
$userId = (int) $_SESSION['user_id'];
$bloodType = trim((string) ($data['BloodType'] ?? ''));
$period = trim((string) ($data['period'] ?? ''));
$patientName = trim((string) ($data['patientName'] ?? ''));
$unitNeeded = isset($data['unitNeeded']) ? (int) $data['unitNeeded'] : 0;
$hospitalName = trim((string) ($data['hospitalName'] ?? ''));
$hospitalPhone = trim((string) ($data['hospitalPhone'] ?? ''));
$address = trim((string) ($data['address'] ?? ''));
$notes = trim((string) ($data['notes'] ?? ''));

if ($id <= 0 || empty($bloodType) || empty($period) || empty($patientName) || $unitNeeded <= 0 || empty($hospitalName) || empty($address)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please fill in all required fields before updating.",
    ]);
    $conn->close();
    exit;
}

$sql = "UPDATE requestBlood SET BloodType = ?, period = ?, patientName = ?, unitNeeded = ?, hospitalName = ?, hospitalPhone = ?, address = ?, notes = ? WHERE id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database query failed.",
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("sssissssii", $bloodType, $period, $patientName, $unitNeeded, $hospitalName, $hospitalPhone, $address, $notes, $id, $userId);

if ($stmt->execute()) {
    $updatedRequest = [
        "id" => $id,
        "BloodType" => $bloodType,
        "period" => $period,
        "patientName" => $patientName,
        "unitNeeded" => $unitNeeded,
        "hospitalName" => $hospitalName,
        "hospitalPhone" => $hospitalPhone,
        "address" => $address,
        "notes" => $notes,
    ];

    echo json_encode([
        "success" => true,
        "message" => "Blood request updated successfully.",
        "updatedRequest" => $updatedRequest,
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to update blood request.",
    ]);
}

$stmt->close();
$conn->close();
?>
