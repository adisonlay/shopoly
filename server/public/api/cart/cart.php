<?php

define('INTERNAL', true);
require_once('../helper/functions.php');
session_start();
set_exception_handler('handleErrors');
require_once('../../../dbconnection.php');

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    include('cart-get.php');
    break;
  case 'POST':
    include('cart-add.php');
    break;
  case 'DELETE':
    include('cart-delete.php');
    break;
  case 'PATCH':
    include('cart-patch.php');
    break;
}

?>
