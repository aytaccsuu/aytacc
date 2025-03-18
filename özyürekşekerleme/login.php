<?php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

$response = ['success' => false, 'message' => '', 'redirect' => ''];

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $remember = isset($_POST['remember']) ? true : false;
        
        // Kullanıcı kontrolü
        $stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['name'];
                
                if ($remember) {
                    setcookie('auth', base64_encode($user['id'].':'.$user['name']), time() + (86400 * 30), "/");
                }
                
                $response['success'] = true;
                $response['message'] = 'Login successful';
                $response['redirect'] = 'profile.html';
            } else {
                $response['message'] = 'Hatalı şifre veya mail';
            }
        } else {
            $response['message'] = 'Kullanıcı bulunamadı';
        }
        
        $stmt->close();
    }
} catch (Exception $e) {
    $response['message'] = 'Sunucu hatası';
    error_log($e->getMessage());
} finally {
    if (isset($conn)) $conn->close();
}

echo json_encode($response);
?>
<!-- HTML Login Form -->
<form method="POST" action="login.php">
    <input type="email" name="email" required />
    <input type="password" name="password" required />
    <button type="submit">Giriş Yap</button>
    <?php if (isset($error)) echo "<p>$error</p>"; ?>
</form>