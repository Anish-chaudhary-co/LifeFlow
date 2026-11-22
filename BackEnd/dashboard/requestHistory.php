<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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
    ]);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Please sign in to view request history.",
    ]);
    exit;
}

require_once "../config/dbConnection.php";

$userId = (int) $_SESSION['user_id'];

///// this query for the fetch data which status is pending in the request response table.
// $sql = "SELECT 
//             rr.request_id,
//             rr.status AS response_status,
//             rb.id,
//             rb.BloodType,
//             rb.period,
//             rb.patientName,
//             rb.unitNeeded,
//             rb.hospitalName,
//             rb.hospitalPhone,
//             rb.address,
//             rb.notes
//         FROM requestresponse AS rr
//         INNER JOIN requestblood AS rb 
//             ON rr.request_id = rb.id
//         WHERE rr.status = 'Pending'
//           AND rr.patient_id = ?";


$sql = "SELECT id,BloodType, period, patientName, unitNeeded, hospitalName, hospitalPhone, address, notes FROM requestBlood WHERE status IN ('in-progress','Pending') AND user_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to load request history.",
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$requests = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "success" => true,
    "requests" => $requests,
]);

$stmt->close();
$conn->close();
?>