<?php

if (!defined('INTERNAL')) {
  exit('Direct access unavailable');
}

$bodyData = getBodyData();

if (empty($bodyData['cartID']) || empty($_SESSION['activeCartID'])) {
  throw new Exception('Cart ID missing; cannot place order');
  exit();
}

$cartID = intval($bodyData['cartID']);

if ($cartID <= 0 || $cartID !== intval($_SESSION['activeCartID'])) {
  throw new Exception('Invalid Cart ID: ' . $bodyData['cartID']);
  exit();
}

$selectQuery = "SELECT * FROM `carts` WHERE `id` = {$cartID};";

$selectResult = mysqli_query($conn, $selectQuery);

if (!$selectResult) {
  throw new Exception('Query error; invalid SELECT: ' . mysqli_error($conn));
  exit();
}

if (mysqli_num_rows($selectResult) === 0) {
  throw new Exception('Cart ID: ' . $cartID . ' not found; cannot place order');
  exit();
}

$updateCartQuery = "UPDATE `carts` SET `ordered` = NOW() WHERE `id` = {$cartID};";

$updateCartResult = mysqli_query($conn, $updateCartQuery);

if (!$updateCartResult) {
  throw new Exception('Query error; invalid UPDATE: ' . mysqli_error($conn));
}

if (mysqli_affected_rows($conn) === 0) {
  throw new Exception('Unable to update cart, cannot place order');
}

if (empty($_SESSION['orderedCarts'])) {
  $_SESSION['orderedCarts'] = [];
}

$_SESSION['orderedCarts'][] = intval($_SESSION['activeCartID']);
unset($_SESSION['activeCartID']);

$orderAddOutput = [
  'success' => true,
  'orderedCarts' => $_SESSION['orderedCarts']
];
print(json_encode($orderAddOutput));

?>
