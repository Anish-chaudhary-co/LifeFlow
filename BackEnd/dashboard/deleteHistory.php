<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Vary: Origin");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed.",
    ]);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Please sign in to delete a request.",
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$id = filter_var($data['id'] ?? NULL , FILTER_VALIDATE_INT);

if($id === false  || $id === null){
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "ID is invalid."
    ]);
    exit;
}

require_once __DIR__ . "/../config/dbConnection.php";

$userId = (int) $_SESSION["user_id"];
$sql = "DELETE FROM requestBlood WHERE id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare the delete request.",
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("ii", $id, $userId);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete blood request.",
    ]);
} elseif ($stmt->affected_rows > 0) {
    echo json_encode([
        "success" => true,
        "message" => "Blood request deleted successfully.",
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "No blood request found with this ID.",
    ]);
}

$stmt->close();
$conn->close();
?>
