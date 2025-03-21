<?php
// include '../connection.php';
$host = "localhost";
$user = "root";  // Default XAMPP username
$pass = "";  // Default XAMPP password (empty)
$db_name = "eia";  // Database name

$conn = new mysqli($host, $user, $pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
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
            echo "Registration successful. <a href='index.html'>Login here</a>";
        } else {
            echo "Error: " . $conn->error;
        }
    }
}
$conn->close();
?>
