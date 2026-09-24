<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once "../config/dbConnection.php";

$data = json_decode(file_get_contents("php://input"), true) ?? [];
$fullname = trim($data['fullName'] ?? "");
$email = trim($data['email'] ?? "");
$password = $data['password'] ?? "";
$conPassword = $data['conformPassword'] ?? "";
$role = trim($data['role'] ?? "");

if (empty($fullname) || empty($email) || empty($password) || empty($conPassword) || empty($role)) {
    echo json_encode([
        "success" => false,
        "message" => "Please fill in all required fields."
    ]);
    exit;
}

if(strlen($password)<8){
    echo json_encode([
        "success" => false,
        "message" => "Password must have at least 8 character"
    ]);
    exit;
}

if ($password !== $conPassword) {
    echo json_encode([
        "success" => false,
        "message" => "Passwords do not match."
    ]);
    require_once "../config/dbClose.php";
    exit;
}

$checkSql = "SELECT ID FROM registeration WHERE email=?";

$stmt = $conn->prepare($checkSql);
$stmt->bind_param("s",$email);
$stmt->execute();

 $stmt->store_result();
// $row = $result->fetch_assoc();  // fetch assoc is used when i want to print actual value of the array.

if($stmt->num_rows>0){
    echo json_encode([
        "success" => false,
        "message" => "Email address is already register! Please try new email."
    ]);
    exit;
}

$stmt->close();



$sql = "INSERT INTO registeration (FullName, Email, Password, Role) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Database query prepare failed."
    ]);
    require_once "../config/dbClose.php";
    exit;
}
$hashPassword = password_hash($password,PASSWORD_DEFAULT);
$stmt->bind_param("ssss", $fullname, $email, $hashPassword, $role);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Registration successful."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Registration failed.",
        "error" => $stmt->error
    ]);
}

$stmt->close();
require_once "../config/dbClose.php";
?>

