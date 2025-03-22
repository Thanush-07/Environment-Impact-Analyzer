<?php
require('../config/conn.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if all fields are set
    if (!isset($_POST['name'], $_POST['email'], $_POST['password'])) {
        die("All fields are required.");
    }

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash password

    // Check if email already exists
    $check_email = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($check_email);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if (!$result) {
        die("SQL Error: " . $conn->error);
    }

    if ($result->num_rows > 0) {
        echo "Email already registered. Try logging in.";
    } else {
        // Use prepared statements for secure insertion
        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $password);
        
        if ($stmt->execute()) {
            header('Location: ../../frontend/templates/login.html');
            exit();
        } else {
            die("SQL Error: " . $conn->error);
        }
    }

    // Close statement
    $stmt->close();
}

// Close database connection
$conn->close();
?>
