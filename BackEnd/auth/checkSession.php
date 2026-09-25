<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

if(isset($_SESSION['user-id'])){
    echo json_encode([
        "loggedIn" => true;
        "user" => [
            "id" =>$_SESSION['user_id'],
            "email" => $_SESSION['email']
        ]
    ]);
}else{
    echo json_encode([
        "loggedIn" => false,
        "user" => "User is not logged in."
    ])
}
?>