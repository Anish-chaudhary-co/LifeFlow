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

$sql = "SELECT COUNT(*) AS successfully_donated, MAX(created_at) AS createDate
        FROM requestresponse
        WHERE patient_id = ? AND status = 'Successfully Donated'";

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

if ($data["createDate"] !== null) {

    $lastDonation = new DateTime($data["createDate"]);

    $nextEligibleDate = clone $lastDonation;
    $nextEligibleDate->modify("+60 days");

    $today = new DateTime("today");

    if ($today < $nextEligibleDate) {

        $remainingDays = $today->diff($nextEligibleDate)->days;

        $eligibilityStatus = "Not Eligible";

    } else {

        $remainingDays = 0;
        $eligibilityStatus = "Eligible";
    }

    $data["remainingDays"] = $remainingDays;
    $data["nextEligibleDate"] = $nextEligibleDate->format("Y-m-d");
    $data["eligibilityStatus"] = $eligibilityStatus;

} else {

    $data["remainingDays"] = 0;
    $data["nextEligibleDate"] = null;
    $data["eligibilityStatus"] = "Eligible";
}


$stmt->close();
$conn->close();

echo json_encode([
    "success" => true,
    "remainingDays"=> $remainingDays,
    "eligibilityStatus"=> $eligibilityStatus,
    "nextEligibleDate"=> $nextEligibleDate,
    "data" => $data ?? ["Successfully Donated" => 0],
    "message" => "Successfully fetched"
]);
?>