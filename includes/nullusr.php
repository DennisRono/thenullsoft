<?php
    echo file_get_contents("../data/usrdat.json");
    $name = "dennis";
    $id = "1";
    $url = "https://hello.com";
    $date = new DateTime("now", new DateTimeZone('Africa/Nairobi'));
    $time = $date->format('Y-m-d H:i:s');
    $array = array('name' => $name,'id' => $id,'url' => $url);
    $fp = fopen('../data/usrdat.json', 'w');
    fwrite($fp, json_encode($array, JSON_PRETTY_PRINT));   // here it will print the array pretty
    fclose($fp);
?>