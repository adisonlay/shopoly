<?php

if (!defined('INTERNAL')) {
  exit('Direct access unavailable');
}

if (empty($_SESSION['activeCartID'])) {
  throw new Exception('Cart ID missing; item not removed from cart');
  exit();
}

$bodyData = getBodyData();

if (empty($bodyData['itemID'])) {
  throw new Exception('Item ID missing; item not removed from cart');
  exit();
}

$itemID = intval($bodyData['itemID']);

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

?>
