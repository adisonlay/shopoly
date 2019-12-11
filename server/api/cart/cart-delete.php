<?php

if (!defined('INTERNAL')) {
  exit('Direct access unavailable');
}

$bodyData = getBodyData();

if (empty($bodyData['cartID']) || empty($_SESSION['activeCartID'])) {
  throw new Exception('Cart ID missing; item not removed from cart');
  exit();
}

if (empty($bodyData['itemID'])) {
  throw new Exception('Item ID missing; item not removed from cart');
  exit();
}

$cartID = intval($bodyData['cartID']);
$itemID = intval($bodyData['itemID']);

if ($cartID <= 0 || $cartID !== intval($_SESSION['activeCartID'])) {
  throw new Exception('Invalid Cart ID: ' . $bodyData['cartID']);
  exit();
}

if ($itemID <= 0) {
  throw new Exception('Invalid Item ID: ' . $bodyData['itemID']);
  exit();
}

$selectQuery = "SELECT * FROM `items` WHERE `id` = {$itemID};";

$selectResult = mysqli_query($conn, $selectQuery);

if (!$selectResult) {
  throw new Exception('Query error; invalid SELECT: ' . mysqli_error($conn));
  exit();
}

if (mysqli_num_rows($selectResult) === 0) {
  throw new Exception('Item ID: ' . $itemID . ' not found; item not removed from cart');
  exit();
}

$deleteCartItemQuery = "DELETE FROM `cart_items` WHERE `item_id` = {$itemID} AND `cart_id` = {$cartID}";

$deleteCartItemResult = mysqli_query($conn, $deleteCartItemQuery);

if (!$deleteCartItemResult) {
  throw new Exception('Query error; invalid DELETE: ' . mysqli_error($conn));
  exit();
}

if (mysqli_affected_rows($conn) === 0) {
  throw new Exception('Unable to delete from cart, item not removed');
  exit();
}

$cartDeleteOutput = [
  'success' => true,
  'cartID' => $cartID,
  'itemID' => $itemID
];
print(json_encode($cartDeleteOutput));

?>
