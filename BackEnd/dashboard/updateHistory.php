<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");

if($_SERVER['REQUEST_METHOD'] === "OPTIONS"){
    exit;
}

if($_SERVER['REQUEST_METHOD'] === "GET"){
    echo json_encode([
        "success" => false,
        "message" => "This method is not allowed"
    ]);
}

$userId = $_SESSION['user_id'];

require_once "../config/dbConnection.php";

$date = json_decode(file_get_contents("php://input"),true);
$bloodType = $data['BloodType'];
$period = $data['period'];
$patientName = $data['patientName'];
$unitNeeded = $data['unitNeeded'];
$hospitalName = $data['hospitalName'];
$hospitalPhone = $data['hospitalPhone'];
$address = $data['address'];
$notes = $data['notes'];

$sql = "UPDATE requestBlood SET BloodType, period, patientName, unitNeeded, hospitalName, hospitalPhone, address, notes WHERE user_id = ?";
$stmt = $conn->prepare($sql);
if(!$stmt){
    echo json_encode([
        "success" => false,
        "message" => "Database query failed"
    ])
}
$stmt->bind_param("isssissss", $userId, $bloodType, $period, $patientName, $unitNeeded, $hospitalName, $hospitalPhone, $address, $notes);
if($stmt->execute()){
    echo json_encode([
        "success" => true,
        "message" => "Successfully update blood request state."
    ])
}else{
    echo json_encode([
        "success" => false,
        "message" = "Failed to update state"
    ])
}

$stmt->close();
$conn->close();

?>