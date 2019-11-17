<?php

require_once('functions.php');
set_exception_handler('handleErrors');
startup();
require_once('../../dbconnection.php');

$idIncluded = false;
$query = "SELECT p.`id`, p.`name`, p.`lot_number`, p.`price`, p.`rent`, p.`item_group`,
  GROUP_CONCAT(i.`url`) AS images
    FROM `items` AS p
    JOIN `images` AS i
      ON p.`id` = i.`item_id`
  GROUP BY p.`id`;";

if (!empty($_GET['id'])) {
  if (is_numeric($_GET['id'])) {
    $idIncluded = true;
    $query = "SELECT p.`id`, p.`name`, p.`lot_number`, p.`price`, p.`rent`, p.`item_group`, p.`description1`, p.`description2`,
      GROUP_CONCAT(i.`url`) AS images
        FROM `items` AS p
        JOIN `images` AS i
          ON p.`id` = i.`item_id`
        WHERE p.`id` = {$_GET['id']}
      GROUP BY p.`id`;";
  } else {
    throw new Exception('Item ID must be a number');
    exit();
  }
}

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('Query error ' . mysqli_error($conn));
  exit();
}

if ($idIncluded && mysqli_num_rows($result) === 0) {
  throw new Exception('Invalid ID: ' . $_GET['id']);
  exit();
}

if ($idIncluded && mysqli_num_rows($result) === 1) {
  $itemDetailObj = mysqli_fetch_assoc($result);
  $itemDetailObj['lot_number'] = intval($itemDetailObj['lot_number']);
  $itemDetailObj['images'] = explode(',', $itemDetailObj['images']);
  $itemDetailObjOutput = json_encode($itemDetailObj);
  print($itemDetailObjOutput);
} else {
  $output = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $row['lot_number'] = intval($row['lot_number']);
    $row['images'] = explode(',', $row['images']);
    $output[] = $row;
  }
  $jsonData = json_encode($output);
  print($jsonData);
}

?>
