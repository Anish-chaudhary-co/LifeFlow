<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$conn = new mysqli("localhost", "root", "", "fourthproject");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error,
    ]);
    exit;
}

function ensureRequestBloodTable($conn) {
    $requiredColumns = [
        "BloodType" => "VARCHAR(20)",
        "period" => "VARCHAR(50)",
        "patientName" => "VARCHAR(100)",
        "unitNeeded" => "INT",
        "hospitalName" => "VARCHAR(150)",
        "hospitalPhone" => "VARCHAR(30)",
        "address" => "VARCHAR(255)",
        "notes" => "TEXT",
    ];

    $conn->query("
        CREATE TABLE IF NOT EXISTS requestblood (
            id INT AUTO_INCREMENT PRIMARY KEY,
            BloodType VARCHAR(20),
            period VARCHAR(50),
            patientName VARCHAR(100),
            unitNeeded INT,
            hospitalName VARCHAR(150),
            hospitalPhone VARCHAR(30),
            address VARCHAR(255),
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

    $result = $conn->query("SHOW COLUMNS FROM requestblood");
    $existingColumns = [];

    while ($row = $result->fetch_assoc()) {
        $existingColumns[] = strtolower($row["Field"]);
    }

    foreach ($requiredColumns as $columnName => $columnType) {
        if (!in_array(strtolower($columnName), $existingColumns, true)) {
            $conn->query("ALTER TABLE requestblood ADD COLUMN `$columnName` $columnType");
        }
    }
}

ensureRequestBloodTable($conn);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $action = $_GET['action'] ?? 'list';

    if ($action === 'list') {
        $result = $conn->query("SELECT * FROM requestblood ORDER BY id DESC");
        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode([
            "success" => true,
            "data" => $data,
        ]);
        exit;
    }
}

if ($method === 'POST') {
    $rawInput = file_get_contents("php://input");
    $input = [];

    if (trim($rawInput) !== "") {
        $decodedInput = json_decode($rawInput, true);

        if (json_last_error() === JSON_ERROR_NONE) {
            $input = $decodedInput;
        } else {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Invalid JSON payload.",
            ]);
            exit;
        }
    }

    if (empty($input)) {
        $input = $_POST;
    }

    $action = $input['action'] ?? 'insert';
    $bloodType = trim($input['BloodType'] ?? '');
    $period = trim($input['period'] ?? '');
    $patientName = trim($input['patientName'] ?? '');
    $unitNeeded = intval($input['unitNeeded'] ?? 0);
    $hospitalName = trim($input['hospitalName'] ?? '');
    $hospitalPhone = trim($input['hospitalPhone'] ?? '');
    $address = trim($input['address'] ?? '');
    $notes = trim($input['notes'] ?? '');

    if ($action === 'delete' && !empty($input['id'])) {
        $requestId = intval($input['id']);
        $stmt = $conn->prepare("DELETE FROM requestblood WHERE id = ?");
        $stmt->bind_param("i", $requestId);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Request deleted successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Delete failed."]);
        }

        $stmt->close();
        exit;
    }

    if ($action === 'update' && !empty($input['id'])) {
        $requestId = intval($input['id']);
        $stmt = $conn->prepare("
            UPDATE requestblood
            SET BloodType = ?, period = ?, patientName = ?, unitNeeded = ?, hospitalName = ?, hospitalPhone = ?, address = ?, notes = ?
            WHERE id = ?
        ");

        $stmt->bind_param(
            "sssiisssi",
            $bloodType,
            $period,
            $patientName,
            $unitNeeded,
            $hospitalName,
            $hospitalPhone,
            $address,
            $notes,
            $requestId
        );

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Request updated successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Update failed."]);
        }

        $stmt->close();
        exit;
    }

    if ($action !== 'insert') {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Unsupported action: " . $action,
        ]);
        exit;
    }

    $stmt = $conn->prepare("
        INSERT INTO requestblood (BloodType, period, patientName, unitNeeded, hospitalName, hospitalPhone, address, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "sssiisss",
        $bloodType,
        $period,
        $patientName,
        $unitNeeded,
        $hospitalName,
        $hospitalPhone,
        $address,
        $notes
    );

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Request saved successfully.",
            "id" => $stmt->insert_id,
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Insert failed: " . $stmt->error,
        ]);
    }

    $stmt->close();
    exit;
}

http_response_code(405);
echo json_encode([
    "success" => false,
    "message" => "Method not allowed.",
]);
