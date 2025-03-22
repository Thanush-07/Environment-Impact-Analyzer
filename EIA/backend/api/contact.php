<?php
// Database connection
$host = "localhost";
$username = "root"; // Default XAMPP MySQL user
$password = ""; // Default XAMPP MySQL password (empty by default)
$database = "eia"; // Use your existing database 'eia'

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $message = trim($_POST['message']);

    // Validate input
    if (!empty($name) && !empty($email) && !empty($phone) && !empty($message)) {
        // Prevent SQL Injection
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $phone, $message);

        // Execute the query
        if ($stmt->execute()) {
            echo "<script>alert('Message sent successfully!'); window.location.href='contact.html';</script>";
        } else {
            echo "<script>alert('Error! Try again later.');</script>";
        }

        $stmt->close();
    } else {
        echo "<script>alert('All fields are required!');</script>";
    }
}

// Close connection
$conn->close();
?>
