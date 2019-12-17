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

if ($newQuantity <= 0 || $newQuantity > 4) {
  throw new Exception('Invalid Quantity: ' . $bodyData['newQuantity']);
  exit();
}

$selectQuery = "SELECT * FROM `items` WHERE `id` = {$itemID};";

$selectResult = mysqli_query($conn, $selectQuery);

if (!$selectResult) {
  throw new Exception('Query error; invalid SELECT: ' . mysqli_error($conn));
  exit();
}

if (mysqli_num_rows($selectResult) === 0) {
  throw new Exception('Item ID: ' . $itemID . ' not found; cart item quantity not updated');
  exit();
}

$updateCartItemQuery = "UPDATE `cart_items` SET `quantity` = {$newQuantity} WHERE `item_id` = {$itemID} AND `cart_id` = {$cartID};";

$updateCartItemResult = mysqli_query($conn, $updateCartItemQuery);

if (!$updateCartItemResult) {
  throw new Exception('Query error; invalid UPDATE: ' . mysqli_error($conn));
  exit();
}

if (mysqli_affected_rows($conn) === 0) {
  throw new Exception('Unable to update cart item, cart item quantity unchanged');
  exit();
}

$cartPatchOutput = [
  'success' => true,
  'cartID' => $cartID,
  'itemID' => $itemID,
  'newQuantity' => $newQuantity
];
print(json_encode($cartPatchOutput));

?>
