<?php

if (!defined('INTERNAL')) {
  exit('Direct access unavailable');
}

$bodyData = getBodyData();

if (empty($bodyData['cartID']) || empty($_SESSION['activeCartID'])) {
  throw new Exception('Cart ID missing; cart item quantity not updated');
  exit();
}

if (empty($bodyData['itemID'])) {
  throw new Exception('Item ID missing; cart item quantity not updated');
  exit();
}

if (empty($bodyData['newQuantity'])) {
  throw new Exception('Item quantity missing; cart item quantity not updated');
  exit();
}

$cartID = intval($bodyData['cartID']);
$itemID = intval($bodyData['itemID']);
$newQuantity = intval($bodyData['newQuantity']);

if ($cartID <= 0 || $cartID !== intval($_SESSION['activeCartID'])) {
  throw new Exception('Invalid Cart ID: ' . $bodyData['cartID']);
  exit();
}

if ($itemID <= 0) {
  throw new Exception('Invalid Item ID: ' . $bodyData['itemID']);
  exit();
}

if ($newQuantity <= 0) {
  throw new Exception('Invalid Quantity: ' . $bodyData['newQuantity']);
  exit();
}

?>
