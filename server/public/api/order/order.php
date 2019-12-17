<?php

define('INTERNAL', true);
require_once('../helper/functions.php');
session_start();
set_exception_handler('handleErrors');
require_once('../../../dbconnection.php');

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    include('order-get.php');
    break;
  case 'POST':
    include('order-add.php');
    break;
}

?>
