<?php

if (!defined(INTERNAL)) {
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



?>
