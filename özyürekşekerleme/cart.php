<?php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

$response = ['success' => false, 'message' => '', 'data' => null];

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    switch ($_POST['action']) {
        case 'add':
            $product_id = (int)$_POST['product_id'];
            $quantity = (int)$_POST['quantity'];
            
            // Ürün kontrolü
            $stmt = $conn->prepare("SELECT * FROM products WHERE id = ? AND status = 'active'");
            $stmt->bind_param("i", $product_id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $product = $result->fetch_assoc();
                
                if ($product['stock'] >= $quantity) {
                    $_SESSION['cart'][$product_id] = [
                        'quantity' => ($quantity + ($_SESSION['cart'][$product_id]['quantity'] ?? 0)),
                        'price' => $product['price'],
                        'name' => $product['name_tr']
                    ];
                    
                    $response['success'] = true;
                    $response['message'] = 'Ürün sepete eklendi';
                    $response['data'] = $_SESSION['cart'];
                }
            }
            break;
            
        case 'remove':
            $product_id = (int)$_POST['product_id'];
            if (isset($_SESSION['cart'][$product_id])) {
                unset($_SESSION['cart'][$product_id]);
                $response['success'] = true;
                $response['message'] = 'Ürün sepetten çıkarıldı';
            }
            break;
            
        case 'update':
            $product_id = (int)$_POST['product_id'];
            $quantity = (int)$_POST['quantity'];
            
            if (isset($_SESSION['cart'][$product_id])) {
                $_SESSION['cart'][$product_id]['quantity'] = $quantity;
                $response['success'] = true;
                $response['message'] = 'Sepet güncellendi';
            }
            break;
            
        case 'get':
            $response['success'] = true;
            $response['data'] = $_SESSION['cart'];
            break;
    }
} catch (Exception $e) {
    $response['message'] = 'Bir hata oluştu';
    error_log($e->getMessage());
}

echo json_encode($response);
?>
