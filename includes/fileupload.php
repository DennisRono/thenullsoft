<?php
    $files = array_filter($_FILES['upload']['name']); //Use something similar before processing files.
    // Count the number of uploaded files in array
    $total_count = count($_FILES['upload']['name']);
    // Loop through every file
    for( $i=0 ; $i < $total_count ; $i++ ) {
    //The temp file path is obtained
    $tmpFilePath = $_FILES['upload']['tmp_name'][$i];
    //A file path needs to be present
    if ($tmpFilePath != ""){
        //Setup our new file path
        $newFilePath = "./uploadFiles/" . $_FILES['upload']['name'][$i];
        //File is uploaded to temp dir
        if(move_uploaded_file($tmpFilePath, $newFilePath)) {
            //Other code goes here
        }
    }
    }
?>