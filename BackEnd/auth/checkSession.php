<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "loggedIn" => false,
        "message" => "Method not allowed.",
    ]);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => false,
        "loggedIn" => false,
        "status" => null,
        "message" => "User is not logged in.",
    ]);
    exit;
}

$donorID = (int) $_SESSION['user_id'];
require_once __DIR__ . "/../config/dbConnection.php";

$sql = "SELECT status FROM requestresponse WHERE donor_id = ? AND status = 'Confirm' ORDER BY id DESC LIMIT 1";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "loggedIn" => true,
        "status" => null,
        "message" => "Unable to check response status.",
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("i", $donorID);
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "loggedIn" => true,
        "status" => null,
        "message" => "Unable to check response status.",
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$result = $stmt->get_result();
$confirmedResponse = $result->fetch_assoc();
$stmt->close();
$conn->close();

$accepted = $confirmedResponse !== null;
echo json_encode([
    "success" => $accepted,
    "loggedIn" => true,
    "status" => $accepted ? $confirmedResponse['status'] : null,
    "message" => $accepted ? "Your response has been accepted." : null,
]);
exit;

?>