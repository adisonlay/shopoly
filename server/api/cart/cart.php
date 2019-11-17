<?php

define('INTERNAL', true);

require_once('functions.php');

session_start();

set_exception_handler('handleErrors');

require_once('dbconnection.php');



?>
