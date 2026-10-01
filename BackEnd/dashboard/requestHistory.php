<?php
session_start();
    header("Allow-Control-Access-Origin: http://localhost:5173/");
    header("Allow-Control-Access-Credentials: true");
    header("Allow-Control-Access-Methods: POST, Get, OPTIONS");
    header("Allow-Control-Access-Headers: Content-Type");
    header("Content-Type: application/json");

    
    if($_SERVER['REQUEST_METHOD'] ===  'OPTIONS'){
        exit;
        }
        require_once "../config/dbConnection.php";

 $userId = $_SESSION['user_id'];
    $sql = "SELECT BloodType, period, patientName, unitNeeded, hospitalName, hospitalPhone, address, notes FROM requestblood  WHERE user_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s",$userID);
    $stmt -> execute();

    $result = $stmt->get_result();

    if($result->num_rows > 0){
        $user = $result->fetch_assoc();

        echo json_encode([
            "success" => true,
            "message" => $user
        ])
    }
    else{
        echo json_encode([
            "success" => false,
            "message" => "Request is not found in the database."
        ])
    }
    $stmt->close();
    $conn->close();


?>
