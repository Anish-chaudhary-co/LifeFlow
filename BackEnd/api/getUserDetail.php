<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method is not allowed."
    ]);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "User ID was not found."
    ]);
    exit;
}

require_once "../config/dbConnection.php";

$data = json_decode(file_get_contents("php://input"), true);

$requestId = filter_var(
    $data["requestId"] ?? null,
    FILTER_VALIDATE_INT
);

$userId = (int) $_SESSION["user_id"];

if ($requestId === false || $requestId === null || $requestId < 1) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "A valid blood request ID is required."
    ]);
    $conn->close();
    exit;
}

$sql = "SELECT
            rr.id,
            rr.request_id,
            rr.donor_id,
            rr.patient_id,
            rr.message,
            rr.status,
            d.FullName,
            d.Gender,
            d.DateOfBirth,
            d.BloodGroup,
            d.Phone,
            d.Address
        FROM requestresponse rr
        INNER JOIN donors d
            ON d.UserId = rr.donor_id
        WHERE
            rr.request_id = ?
            AND rr.patient_id = ?
            AND rr.status = 'Pending'
        ORDER BY rr.id DESC";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the response query."
    ]);
    $conn->close();
    exit;
}

// FIX: Bind the session user ID
$stmt->bind_param("ii", $requestId, $userId);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to fetch request responses."
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$result = $stmt->get_result();
$responseData = $result->fetch_all(MYSQLI_ASSOC);

$stmt->close();
$conn->close();

echo json_encode([
    "success" => true,
    "donorDetail" => $responseData,
    "message" => count($responseData) > 0
        ? "Successfully fetched donor responses."
        : "No donors have responded to this request yet."
]);
?>