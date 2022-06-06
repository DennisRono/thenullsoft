<?php
    $prevdat = (array) file_get_contents("../data/usrdat.json");
    
    var_dump($prevdat);
    $date = new DateTime("now", new DateTimeZone('Africa/Nairobi'));
    $time = $date->format('Y-m-d H:i:s');
    $nusr = array('Time' => $name,'id' => $id,'url' => $url);
    array_push($prevdat,$nusr);
    $fp = fopen('../data/usrdat.json', 'w');
    fwrite($fp, json_encode($prevdat, JSON_PRETTY_PRINT));   // here it will print the array pretty
    fclose($fp);
?>