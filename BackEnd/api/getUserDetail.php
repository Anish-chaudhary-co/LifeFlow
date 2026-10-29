<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Allow-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST,GET,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
header("Vary: Origin");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(204);
    exit;
}

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method is not allowed"
    ]);
    exit;
}

require_once "../config/dbConnection.php";


if(!isset($_SESSION['user-id'])){
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Login first to donate blood."
        ]);
        exit;
        }else{
            echo json_encode([
                "success" => true,
                "message" => "Your are eligible to donate blood to this patient."
                ]);
                };
                
$donorId = (int) $_SESSION['user_id'];
$sql = "SELECT UserId, FullName, Gender, DateOfBirth, BloodGroup, Phone, Address FROM donors WHERE UserId =? ";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i",$userId);
$stmt->execute();
$userData = $stmt->get_result();

if($userData->num_rows >0 ){
    $row = $userData->fetch_assoc();
    print_r($row);
}

$stmt->close();

?>