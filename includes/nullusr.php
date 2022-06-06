<?php
    $prevdat = (array) json_decode(file_get_contents("../data/usrdat.json"));
    $date = new DateTime("now", new DateTimeZone('Africa/Nairobi'));
    $time = $date->format('Y-m-d H:i:s');
    $nusr = array('Time' => $time);
    array_push($prevdat,$nusr);
    $fp = fopen('../data/usrdat.json', 'w');
    fwrite($fp, json_encode((object) $prevdat, JSON_PRETTY_PRINT));
    fclose($fp);
?>