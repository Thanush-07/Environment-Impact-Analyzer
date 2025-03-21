<?php
$host = "localhost";
$user = "root";  // Default XAMPP username
$pass = "";  // Default XAMPP password (empty)
$db_name = "eia";  // Database name

$conn = new mysqli($host, $user, $pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?> 
