<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$response = ['success' => false, 'message' => '', 'redirect' => ''];

try {
    $conn = new mysqli("localhost", "root", "", "admin_db");
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed");
    }
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        
        $stmt = $conn->prepare("SELECT id, username, password FROM admins WHERE username = ? LIMIT 1");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $admin = $result->fetch_assoc();
            if (password_verify($password, $admin['password'])) {
                $_SESSION['user_id'] = $admin['id'];
                $_SESSION['username'] = $admin['username'];
                $_SESSION['is_admin'] = true;
                
                $response['success'] = true;
                $response['message'] = 'Login successful';
                $response['redirect'] = 'admin.html'; // Redirect to admin panel
            } else {
                $response['message'] = 'Invalid password';
            }
        } else {
            $response['message'] = 'Admin not found';
        }
        
        $stmt->close();
    }
} catch (Exception $e) {
    $response['message'] = 'Server error';
    error_log($e->getMessage());
} finally {
    if (isset($conn)) $conn->close();
}

echo json_encode($response);
?>

<?php
session_start();
require 'config/db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email    = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $db   = Database::getInstance()->getConnection();
    $stmt = $db->prepare("SELECT id, name, email, password FROM admins WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($admin = $result->fetch_assoc()) {
        if (password_verify($password, $admin['password'])) {
            $_SESSION['admin'] = $admin;
            header("Location: admin.html");
            exit;
        }
    }
    $error = "Hatalı şifre veya mail";
}
?>
<!-- HTML Admin Login Form -->
<form method="POST" action="admin_login.php">
    <input type="email" name="email" required />
    <input type="password" name="password" required />
    <button type="submit">Yönetici Girişi</button>
    <?php if (isset($error)) echo "<p>$error</p>"; ?>
</form>
