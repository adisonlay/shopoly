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

?>
