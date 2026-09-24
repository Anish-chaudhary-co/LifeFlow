<?php
$server = "localhost";
$username = "root";
$password = "";
$database = "FourthProject";

$conn = mysqli_connect($server, $username, $password, $database);

if($conn->connect_error){
    die("Database connection failed: ". $conn->connect_error);
}

?>