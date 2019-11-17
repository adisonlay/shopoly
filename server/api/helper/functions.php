<?php

if (!function_exists('handleErrors')) {
  function handleErrors($errorObj) {
    http_response_code(500);
    $output = [
      'success' => false,
      'error' => $errorObj->getMessage()
    ];
    $jsonOutput = json_encode($output);
    print($jsonOutput);
  }
}

if (!function_exists('startup')) {
  function startup(){
    header("Content-type:application/json");
  }
}

?>
