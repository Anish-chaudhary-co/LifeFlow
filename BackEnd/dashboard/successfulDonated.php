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

$successfulData = json_decode(file_get_contents("php://input"), true);

$data = $successfulData['successfulData'] ?? null;
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON data."
    ]);
    exit;
}

$requestId = filter_var(
    $data['request_id'] ?? null,
    FILTER_VALIDATE_INT
);

$responseId = filter_var(
    $data['response_id'] ?? null,
    FILTER_VALIDATE_INT
);

$UnitDonated = filter_var(
    $data['unit_donated'] ?? null,
    FILTER_VALIDATE_INT
);

$confirmDate = $data['confirmDate'] ?? null;

if (
    $requestId === false || $requestId <= 0 ||
    $responseId === false || $responseId <= 0 ||
    $UnitDonated === false || $UnitDonated <= 0
) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid donation details."
    ]);
    exit;
}

$status = "Successfully Donated";
$userID = (INT) $_SESSION['user_id'];

require_once __DIR__ . "/../config/dbConnection.php";

$sql = "INSERT INTO successful_donation
        (request_id, response_id, units_donated, donation_date, confirmed_at, status)
        VALUES (?, ?, ?, NOW(), ?, ?)";

$updateSuccessful = $conn->prepare($sql);

if (!$updateSuccessful) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the query."
    ]);
    exit;
}

$updateSuccessful->bind_param(
    "iiiss",
    $requestId,
    $responseId,
    $UnitDonated,
    $confirmDate,
    $status
);

$requestUpdate = $conn->prepare("UPDATE requestblood SET status = ? WHERE id = ? AND user_id = ?");
$requestUpdate->bind_param("sii",$status, $requestId, $userID);


$responseUpdate = $conn->prepare("UPDATE requestresponse SET status = ? WHERE id = ? AND request_id = ? AND patient_id = ?");
$responseUpdate->bind_param("siii",$status, $responseId, $requestId, $userID);

if (!$updateSuccessful->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to save donation."
    ]);
    $updateSuccessful->close();
    $conn->close();
    exit;
}
if (!$requestUpdate->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to update request status."
    ]);
    $requestUpdate->close();
    $conn->close();
    exit;
}

if (!$responseUpdate->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to update response status."
    ]);
    $responseUpdate->close();
    $conn->close();
    exit;
}

echo json_encode([
    "success" => true,
    "messageForSuccessful_Donation" => "Donation successfully confirmed.",
    "requestUpdate" => "successfully update requestblood table status."
]);

$updateSuccessful->close();
$requestUpdate->close();
$responseUpdate->close();
$conn->close();
?>