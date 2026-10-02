<?php
    session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // http_response_code(204);
    exit;
}

require_once "../config/dbConnection.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => false,
        "loggedIn" => false,
        "message" => "Please login first"
    ]);
    require_once "../config/dbClose.php";
    exit;
}

$data = json_decode(file_get_contents("php://input"), true) ?? [];

if (!is_array($data)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON payload."
    ]);
    exit;
}

$bloodType = trim((string)($data['BloodType'] ?? ''));
$period = trim((string)($data['period'] ?? ''));
$patientName = trim((string)($data['patientName'] ?? ''));
$unitNeeded = isset($data['unitNeeded']) ? (int)$data['unitNeeded'] : 0;
$hospitalName = trim((string)($data['hospitalName'] ?? ''));
$hospitalPhone = trim((string)($data['hospitalPhone'] ?? ''));
$address = trim((string)($data['address'] ?? ''));
$notes = trim((string)($data['notes'] ?? ''));

if (empty($bloodType) || empty($period) || empty($patientName) || $unitNeeded <= 0 || empty($hospitalName) || empty($address)) {
    echo json_encode([
        "success" => false,
        "message" => "Please fill all required fields."
    ]);
    require_once "../config/dbClose.php";
    exit;
}

$userId = (int) $_SESSION['user_id'];
$sql = "INSERT INTO requestBlood (user_id, BloodType, period, patientName, unitNeeded, hospitalName, hospitalPhone, address, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Database query failed."
    ]);
    require_once "../config/dbClose.php";
    exit;
}

$stmt->bind_param("isssissss", $userId, $bloodType, $period, $patientName, $unitNeeded, $hospitalName, $hospitalPhone, $address, $notes);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Successfully submitted."
    ]);
    $stmt->close();
    require_once "../config/dbClose.php";
    exit;
}

echo json_encode([
    "success" => false,
    "message" => "Unable to save request."
]);

$stmt->close();
require_once "../config/dbClose.php";
?>