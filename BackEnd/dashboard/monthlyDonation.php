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
        "message" => "Method not allowed."
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

$donorID = (int) $_SESSION["user_id"];

require_once "../config/dbConnection.php";

$year = date("Y");

$sql = "SELECT 
            MONTH(sd.donation_date) AS monthNumber,
            COUNT(*) AS donations
        FROM successful_donation sd
        INNER JOIN requestresponse rr
            ON sd.response_id = rr.id
        WHERE rr.donor_id = ?
        AND YEAR(sd.donation_date) = ?
        GROUP BY MONTH(sd.donation_date)
        ORDER BY MONTH(sd.donation_date)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare query."
    ]);
    exit;
}

$stmt->bind_param("ii", $donorID, $year);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to fetch donation activity."
    ]);
    exit;
}

$result = $stmt->get_result();

$monthlyCounts = [];

while ($row = $result->fetch_assoc()) {
    $monthlyCounts[(int)$row["monthNumber"]] = (int)$row["donations"];
}

// Create all 12 months, including months with zero donations
$months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

$activityData = [];

foreach ($months as $index => $month) {

    $monthNumber = $index + 1;

    $activityData[] = [
        "month" => $month,
        "donations" => $monthlyCounts[$monthNumber] ?? 0
    ];
}

$stmt->close();
$conn->close();

echo json_encode([
    "success" => true,
    "year" => $year,
    "activityData" => $activityData
]);
?>