<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once "../config/dbConnection.php";

$data = json_decode(file_get_contents("php://input"), true) ?? [];
$email = trim($data['email'] ?? "");
$password = $data['password'] ?? "";

if (empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Please fill in all required fields."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email address"
    ]);
    exit;
}

if (strlen($password) < 8) {
    echo json_encode([
        "success" => false,
        "message" => "Password must have at least 8 characters"
    ]);
    exit;
}

$checkSql = "SELECT ID, Email, Password FROM registeration WHERE email=?";
$stmt = $conn->prepare($checkSql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    if (password_verify($password, $row['Password'])) {
        $_SESSION['user_id'] = $row['ID'];
        $_SESSION['email'] = $row['Email'];

        echo json_encode([
            "success" => true,
            "message" => "Login Successfully.",
            "user" => [
                "id" =>$row['ID'],
                "email" =>$row['Email']
            ]
        ]);
        exit;
    }

    echo json_encode([
        "success" => false,
        "message" => "Password Incorrect"
    ]);
    exit;
}

echo json_encode([
    "success" => false,
    "message" => "Email not registered"
]);



$stmt->close();
require_once "../config/dbClose.php";
?>

