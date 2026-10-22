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

$sql = "SELECT rb.id, rb.BloodType, rb.period, rb.patientName, rb.unitNeeded, rb.hospitalName, rb.hospitalPhone, rb.address, rb.notes, d.Gender AS gender, DATE(rb.created_at) AS created_date FROM requestBlood rb INNER JOIN registeration r ON rb.user_id = r.ID INNER JOIN donors d ON r.ID = d.UserId";
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