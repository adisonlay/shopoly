<?php

if (!defined('INTERNAL')) {
  exit('Direct access unavailable');
}

if (empty($_SESSION['activeCartID'])) {
  print(json_encode([]));
  exit();
}

$activeCartID = intval($_SESSION['activeCartID']);

$query = "SELECT ci.`cart_id` AS cartID,
  pi.`itemID`, pi.`name`, pi.`lotNumber`, pi.`price`, pi.`rent`, pi.`itemGroup`, pi.`images`
    FROM `cart_items` AS ci
    LEFT JOIN (
      SELECT p.`id` AS itemID, p.`name`, p.`lot_number` AS lotNumber, p.`price`, p.`rent`, p.`item_group` AS itemGroup,
        GROUP_CONCAT(i.`url`) AS images
          FROM `items` AS p
          JOIN `images` AS i
            ON p.`id` = i.`item_id`
        GROUP BY p.`id`
    ) AS pi
    ON ci.`item_id` = pi.`itemID`
    WHERE ci.`cart_id` = {$activeCartID}";

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
    $row['lotNumber'] = intval($row['lotNumber']);
    $row['images'] = explode(',', $row['images']);
    $output[] = $row;
  }
  $jsonData = json_encode($output);
  print($jsonData);
}

?>
