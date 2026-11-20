<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");


if($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(204);
    exit;
}

if($_SERVER["REQUEST_METHOD"] !== "GET"){
     http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "method is not allowed"
    ]);
    exit;
}

$userID = (INT) $_SESSION['user_id'];

require_once "../config/dbConnection.php";

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

FROM requestresponse AS rr

INNER JOIN donors AS d
    ON d.UserId = rr.donor_id

WHERE
    rr.donor_id = ?
    AND rr.status IN ('Accepted','Confirm') 

ORDER BY rr.id DESC;";

$stmt = $conn->prepare($sql);
if(!$stmt){
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare sql query.",
    ]);
    exit;
}

$stmt->bind_param("i",$userID);
if(!$stmt->execute()){
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to execute the query.",
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$result = $stmt->get_result();
$acceptedData = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "success" => true,
    "message" => "successfully get the Accepted request data.",
    "acceptedData" => $acceptedData,
]);

$stmt->close();
$conn->close();
?>