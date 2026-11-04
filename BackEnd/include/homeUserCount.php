<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


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

// require_once "../config.dbConnection.php";
require_once __DIR__ . "/../config/dbConnection.php";

$sql = "SELECT COUNT(DISTINCT UserId) AS totalDonors FROM donors";
$result = $conn->query($sql);
if (!$result) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to retrieve donor count.",
    ]);
    $conn->close();
    exit;
}

$row = $result->fetch_assoc();

echo json_encode([
    "success" => true,
    "totalDonors" => $row['totalDonors'],
]);

$conn->close();
?>