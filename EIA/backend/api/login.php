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
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            echo "Login successful. Welcome, " . $row['name'];
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No account found with this email.";
    }
}
$conn->close();
?>
