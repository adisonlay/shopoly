<?php

if (!defined('INTERNAL')) {
  exit('Direct access unavailable');
}

if (empty($_SESSION['orderedCarts']) || count($_SESSION['orderedCarts']) <= 0) {
  print(json_encode([]));
  exit();
}

foreach ($_SESSION['orderedCarts'] as $value) {
  $value = intval($value);
}
$orderedCarts = implode(', ', $_SESSION['orderedCarts']);

$query = "SELECT ci.`cart_id` AS cartID, ci.`final_price` AS finalPrice, ci.`quantity`,
  pi.`itemID`, pi.`name`, pi.`lotNumber`, pi.`price`, pi.`rent`, pi.`itemGroup`, pi.`images`,
  ca.`ordered`
    FROM (`cart_items` AS ci
      LEFT JOIN (
        SELECT p.`id` AS itemID, p.`name`, p.`lot_number` AS lotNumber, p.`price`, p.`rent`, p.`item_group` AS itemGroup,
          GROUP_CONCAT(i.`url`) AS images
            FROM `items` AS p
            JOIN `images` AS i
              ON p.`id` = i.`item_id`
          GROUP BY p.`id`
      ) AS pi
      ON ci.`item_id` = pi.`itemID`)
    LEFT JOIN `carts` AS ca
    ON ci.`cart_id` = ca.`id`
    WHERE ci.`cart_id` IN ({$orderedCarts});";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('Query error; invalid SELECT: ' . mysqli_error($conn));
  exit();
}

if (mysqli_num_rows($result) === 0) {
  print(json_encode([]));
} else {
  $output = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $row['finalPrice'] = intval($row['finalPrice']);
    $row['quantity'] = intval($row['quantity']);
    $row['lotNumber'] = intval($row['lotNumber']);
    $row['images'] = explode(',', $row['images']);
    $output[] = $row;
  }
  $jsonData = json_encode($output);
  print($jsonData);
}

?>
