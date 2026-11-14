<?php
session_start();

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

$userId = $_SESSION['user_id'] ?? null;

$sql = "SELECT * FROM donors";

if ($userId !== null) {
    $sql .= " WHERE UserId <> ?";
}

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the findDonor query.",
        "donors" => []
    ]);
    $conn->close();
    exit;
}

if ($userId !== null) {
    $stmt->bind_param("i", $userId);
}

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to load find Donor page.",
        "donors" => []
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$result = $stmt->get_result();
$donors = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "success" => true,
    "donors" => $donors
]);

$result->free();
$stmt->close();
$conn->close();
?>
