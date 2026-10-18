<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed.",
    ]);
    exit;
}

require_once "../config/dbConnection.php";

$sql = "SELECT id, BloodType, period, patientName, unitNeeded, hospitalName, hospitalPhone, address, notes FROM requestBlood";
$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to load patient requests.",
    ]);
    $conn->close();
    exit;
}

$patient = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "success" => true,
    "patient" => $patient,
]);

$result->free();
$conn->close();
?>