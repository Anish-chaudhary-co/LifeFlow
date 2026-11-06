<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Vary: Origin");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "This method is not allowed."
    ]);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "User not authenticated."
    ]);
    exit;
}

$patientID = (int) $_SESSION["user_id"];
require_once "../config/dbConnection.php";

$sql = "SELECT COUNT(*) AS successfully_donated
        FROM requestresponse
        WHERE patient_id = ? AND status = 'successfully_donated'";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the query."
    ]);
    exit;
}

$stmt->bind_param("i", $patientID);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to fetch donation record."
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$result = $stmt->get_result();
$data = $result->fetch_assoc();

$stmt->close();
$conn->close();

echo json_encode([
    "success" => true,
    "data" => $data ?? ["successfully_donated" => 0],
    "message" => "Successfully fetched"
]);
?>