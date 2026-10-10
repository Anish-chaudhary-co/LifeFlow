<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../config/dbConnection.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);


$user_id = $_SESSION["user_id"] ?? null;

if ($user_id) {
    echo json_encode([
        "success" => true,
        $data => $user_id;
    ]);
    exit;
}else{
     echo json_encode([
        "success" => false,
        "message" => "User ID is required"
    ]);
}

$sql = "DELETE FROM bloodrequest WHERE user_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Blood request deleted successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to delete blood request"
    ]);
}

$stmt->close();
$conn->close();

?>