<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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
        "donors" => []
    ]);
    exit;
}

require_once "../config/dbConnection.php";

$sql = "SELECT r.ID, d.UserId, r.FullName, d.Gender, d.DateOfBirth, d.BloodGroup, d.Phone, d.Address
        FROM registration r
        INNER JOIN donors d ON r.UserId = d.UserId
        WHERE r.Role = 'donor'";

$result = $conn->query($sql);
$donors = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $donors[] = $row;
    }

    echo json_encode([
        "success" => true,
        "donors" => $donors,
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to get donor details.",
        "donors" => [],
    ]);
}

$conn->close();
?>