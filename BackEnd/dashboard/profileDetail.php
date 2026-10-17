<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET,OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
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
        "message" => "Method not allowed."
    ]);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Please sign in to view your personal details."
    ]);
    exit;
}

require_once "../config/dbConnection.php";

$userId = (int) $_SESSION['user_id'];
$sql = "SELECT FullName, Gender, DateOfBirth, BloodGroup, Phone, Address FROM donors WHERE UserId = ? LIMIT 1";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to retrieve your personal details."
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("i", $userId);

$executed = $stmt->execute();
if (!$executed) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to retrieve your personal details."
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$result = $stmt->get_result();

if ($profile = $result->fetch_assoc()) {
    echo json_encode([
        "success" => true,
        "message" => "Profile retrieved successfully.",
        "profile" => $profile
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "No profile is registered for this account."
    ]);
}

$stmt->close();
$conn->close();

?>