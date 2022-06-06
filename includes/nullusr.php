<?php
    $name = "dennis";
    $id = "1";
    $url = "https://hello.com";
    $array = array('name' => $name,'id' => $id,'url' => $url);
    $fp = fopen('../data/usrdat.json', 'w');
    fwrite($fp, json_encode($array, JSON_PRETTY_PRINT));   // here it will print the array pretty
    fclose($fp);
?>