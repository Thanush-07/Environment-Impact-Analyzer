<?php

require('../config/conn.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash password

    // Check if email already exists
    $check_email = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($check_email);
    
    if ($result->num_rows > 0) {
        echo "Email already registered. Try logging in.";
    } else {
        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
    
        if ($conn->query($sql) === TRUE) {
            header('Location: ../../frontend/templates/login.html');
            exit();
        } else {
            die("SQL Error: " . $conn->error);
        }
        
    }
}
$conn->close();
?>
