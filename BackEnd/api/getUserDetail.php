<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method is not allowed.",
    ]);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "User ID was not found.",
    ]);
    exit;
}

require_once "../config/dbConnection.php";

$userId = (int) $_SESSION["user_id"];
$sql = "SELECT id, request_id, donor_id, patient_id, message, status FROM requestresponse WHERE patient_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the response query.",
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("i", $userId);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to fetch request responses.",
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$result = $stmt->get_result();
$requestData = $result->fetch_assoc();
$stmt->close();

if (!$requestData) {
    echo json_encode([
        "success" => false,
        "message" => "No response was found for your blood request.",
    ]);
    $conn->close();
    exit;
}

$donorId = (int) $requestData["donor_id"];
$donorSql = "SELECT FullName, Gender, DateOfBirth, BloodGroup, Phone, Address FROM donors WHERE UserId = ?";
$stmt = $conn->prepare($donorSql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the donor query.",
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("i", $donorId);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to fetch donor details.",
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$donorData = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();
$conn->close();

if (!$donorData) {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Donor details were not found.",
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "data" => $requestData,
    "donorDetail" => $donorData,
    "message" => "Successfully fetched the response and donor details.",
]);
?>
