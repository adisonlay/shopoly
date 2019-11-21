<?php

require_once('functions.php');
set_exception_handler('handleErrors');
startup();
require_once('../../dbconnection.php');

$idIncluded = false;
$getDetailsQueryModifiers = array(
  'fields' => '',
  'whereClause' => ''
);

if (!empty($_GET['id'])) {
  if (is_numeric($_GET['id'])) {
    $idIncluded = true;
    $getDetailsQueryModifiers['fields'] = 'p.`description1`, p.`description2`,';
    $getDetailsQueryModifiers['whereClause'] = "WHERE p.`id` = {$_GET['id']}";
  } else {
    throw new Exception('Item ID must be a number');
    exit();
  }
}

$query = "SELECT p.`id` AS itemID, p.`name`, p.`lot_number` AS lotNumber, p.`price`, p.`rent`, p.`item_group` AS itemGroup, {$getDetailsQueryModifiers['fields']}
  GROUP_CONCAT(i.`url`) AS images
    FROM `items` AS p
    JOIN `images` AS i
      ON p.`id` = i.`item_id`
    {$getDetailsQueryModifiers['whereClause']}
  GROUP BY p.`id`;";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('Query error; invalid SELECT: ' . mysqli_error($conn));
  exit();
}

if ($idIncluded && mysqli_num_rows($result) === 0) {
  throw new Exception('Invalid Item ID: ' . $_GET['id']);
  exit();
}

if ($idIncluded && mysqli_num_rows($result) === 1) {
  $itemDetailObj = mysqli_fetch_assoc($result);
  $itemDetailObj['lotNumber'] = intval($itemDetailObj['lotNumber']);
  $itemDetailObj['images'] = explode(',', $itemDetailObj['images']);
  $itemDetailObjOutput = json_encode($itemDetailObj);
  print($itemDetailObjOutput);
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
