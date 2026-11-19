
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

$userId = (int) $_SESSION["user_id"];

require_once "../config/dbConnection.php";

$sql = $conn->prepare("
    SELECT
        rr.id,
        rr.request_id,
        rr.donor_id,
        rr.patient_id,
        rr.status AS responseStatus,
        rr.created_at AS confirmDate,

        rb.id AS requestBloodID,
        rb.user_id,
        rb.BloodType AS patientBlood,
        rb.patientName,
        rb.unitNeeded AS unit,
        rb.address AS patientAddress,
        rb.hospitalPhone AS patientPhone,

        r.ID AS patientUserID,

        d.UserId AS donorUserID,
        d.FullName AS DonorName,
        d.Gender AS DonorGender,
        d.BloodGroup AS DonorBlood,
        d.Phone AS DonorPhone,
        d.Address AS DonorAddress

    FROM requestresponse rr

    INNER JOIN requestblood rb
        ON rr.request_id = rb.id

    INNER JOIN registeration r
        ON rr.patient_id = r.ID

    INNER JOIN donors d
        ON rr.donor_id = d.UserId

    WHERE rr.patient_id = ?
    AND rr.status = 'Confirm'

    ORDER BY rr.id DESC
");

if (!$sql) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare query.",
        "error" => $conn->error
    ]);
    exit;
}

$sql->bind_param("i", $userId);

if (!$sql->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to execute query."
    ]);
    exit;
}

$result = $sql->get_result();

$confirmData = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "success" => true,
    "message" => "Successfully fetched confirmed donors.",
    "confirmData" => $confirmData
]);

$sql->close();
$conn->close();
?>
