<?php

if (!defined(INTERNAL)) {
  exit('Direct access unavailable');
}

$bodyData = getBodyData();

if (empty($bodyData['itemID'])) {
  throw new Exception('Item ID not found; item not added to cart');
}

$itemID = intval($bodyData['itemID']);

if ($itemID <= 0) {
  throw new Exception('Invalid Item ID: ' . $bodyData['itemID']);
}

if (!empty($_SESSION['activeCartID'])) {
  $activeCartID = $_SESSION['activeCartID'];
} else {
  $activeCartID = false;
}

$selectQuery = "SELECT * FROM `items` WHERE `id` = {$itemID};";

$selectResult = mysqli_query($conn, $selectQuery);

if ($selectResult) {
  throw new Exception('Query error; invalid SELECT: ' . mysqli_error($conn));
}

if (mysqli_num_rows($selectResult) === 0) {
  throw new Exception('Invalid Item ID: ' . $itemID);
}

$itemData = mysqli_fetch_assoc($selectResult);

$transactionResult = mysqli_query($conn, 'START TRANSACTION');

if (!$transactionResult) {
  throw new Exception('Unable to start transaction: ' . mysqli_error($conn));
}

if (!$activeCartID) {
  $insertCartQuery = "INSERT INTO `carts` (`created`) VALUES (NOW());";
  $insertCartResult = mysqli_query($conn, $insertCartQuery);
  if (!$insertCartResult) {
    throw new Exception('Query error; invalid INSERT: ' . mysqli_error($conn));
  }
  if (mysqli_affected_rows($conn) === 0) {
    throw new Exception('Unable to create cart');
  }
  $activeCartID = $_SESSION['activeCartID'] = mysqli_insert_id($conn);
}

foreach ($bodyData as $field => $value) {
  $bodyData[$field] = intval($value);
}

$insertCartItemsQuery = "INSERT INTO `cart_items` (`cart_id`, `item_id`, `final_price`, `quantity`, `added`)
  VALUES ({$activeCartID}, {$bodyData[$itemID]}, {$bodyData[$finalPrice]}, {$bodyData[$quantity]}, NOW())
  ON DUPLICATE KEY UPDATE `quantity` = `quantity` + {$bodyData[$quantity]};";

$insertCartItemsResult = mysqli_query($conn, $insertCartItemsQuery);

if (!$insertCartItemsResult) {
  throw new Exception('Query error; invalid INSERT: ' . mysqli_error($conn));
}

if (mysqli_affected_rows($conn) === 0) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('Unable to add to cart');
}

$transactionResult = mysqli_query($conn, 'COMMIT');

?>
