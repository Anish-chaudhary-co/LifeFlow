<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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
        "message" => "Please sign in to save your personal details."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);


$fullName = trim((string) ($data['fullname'] ?? ''));
$dob = trim((string) ($data['DOB'] ?? ''));
$gender = trim((string) ($data['gender'] ?? ''));
$address = trim((string) ($data['address'] ?? ''));
$bloodGroup = strtoupper(trim((string) ($data['bloodGroup'] ?? '')));
$contact = trim((string) ($data['contact'] ?? ''));




require_once "../config/dbConnection.php";

$userId = (int) $_SESSION['user_id'];
$sql = "INSERT INTO donors (UserId, FullName, Gender, DateOfBirth, BloodGroup, Phone, Address) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the personal details for saving."
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("issssss", $userId, $fullName, $gender, $dob, $bloodGroup, $contact, $address);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Successfully set the profile.",
        "userId" =>$userId
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to save personal details."
    ]);
}

$stmt->close();
$conn->close();
?>
