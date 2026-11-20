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

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method is not allowed.",
    ]);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "User ID was not found.",
    ]);
    exit;
}

require_once "../config/dbConnection.php";

$data = json_decode(file_get_contents("php://input"), true);
$requestId = filter_var($data["requestId"] ?? null, FILTER_VALIDATE_INT);

if ($requestId === null || $requestId < 1) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "A valid blood request ID is required.",
    ]);
    $conn->close();
    exit;
}

$userId = (int) $_SESSION["user_id"];
$status = "Confirm";

$requestUpdate = $conn->prepare("UPDATE requestblood set status = ? WHERE id = ? AND status = 'Accepted'");
$requestUpdate->bind_param("si",$status,$requestId);

$responseUpdate = $conn->prepare("UPDATE requestresponse set status = ? WhERE request_id = ? AND donor_id = ? AND status = 'Accepted'");
$responseUpdate->bind_param("sii",$status, $requestId, $userId);
if(!$requestUpdate->execute()){
          http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Could not update the request blood table status.",
    ]);
    exit;
}
if(!$responseUpdate->execute()){
          http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Could not update the response request table status.",
    ]);
    exit;
}

$conn->commit();
echo json_encode([
    "success" => true,
    "message" => "Request has been confirm successfully.",
]);
?>