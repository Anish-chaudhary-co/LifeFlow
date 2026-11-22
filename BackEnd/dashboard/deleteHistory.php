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

$requestId = filter_var($data['requestId'] ?? NULL , FILTER_VALIDATE_INT);
$userId = (INT) $_SESSION['user_id'];
$status = "Cancel";

if($requestId === false  || $requestId === null){
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "ID is invalid."
    ]);
    exit;
}

require_once __DIR__ . "/../config/dbConnection.php";

$conn->begin_transaction();
try {

    // $deleteResponse = $conn->prepare("DELETE FROM requestresponse WHERE request_id = ? AND patient_id = ?");
    // $deleteResponse->bind_param("ii",$requestId, $userId);
    $deleteResponse = $conn->prepare("UPDATE requestresponse SET status = ? WHERE request_id = ? AND patient_id = ?");
    $deleteResponse->bind_param("sii",$status, $requestId, $userId);
    $deleteResponse->execute();

    // $deleteRequest = $conn->prepare("DELETE FROM requestBlood WHERE id = ? AND user_id = ?");
    // $deleteRequest->bind_param("ii", $requestId, $userId);
    $deleteRequest = $conn->prepare("UPDATE requestBlood SET status = ? WHERE id = ? AND user_id = ?");
    $deleteRequest->bind_param("sii",$status, $requestId, $userId);
    $deleteRequest->execute();

    // if($deleteRequest->affected_rows === 0){
    //     $conn->rollback();
    //     http_response_code(401);

    //     echo json_encode([
    //         "success" => false,
    //         "message" => "Blood request not found"
    //     ]);
    //     exit;
    // }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Blood request and response request both deleted successfully",
    ]);

    $deleteRequest->close();
    $deleteResponse->close();

} catch (Throwable $error) {
    
    $conn->rollback();
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to delete blood request",
    ]);
}

$conn->close();

?>
