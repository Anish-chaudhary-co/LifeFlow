<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../config/dbConnection.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

// Get JSON data from React
$data = json_decode(file_get_contents("php://input"), true);

// Check whether ID was received
if (!isset($data["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "ID is required"
    ]);
    exit;
}

$id = $data["id"];

// Delete query
$sql = "DELETE FROM requestblood WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    // Check whether a row was actually deleted
    if ($stmt->affected_rows > 0) {

        echo json_encode([
            "success" => true,
            "message" => "Blood request deleted successfully"
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => "No blood request found with this ID"
        ]);
    }

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to delete blood request"
    ]);
}

$stmt->close();
$conn->close();

?>