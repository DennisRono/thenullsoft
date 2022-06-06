<?php
    require "../db/config.php";
    $email = trim($_POST['email']);
    if(empty($email)){
        echo "email cannot be empty!";
    } else {
        $date = new DateTime("now", new DateTimeZone('Africa/Nairobi'));
        $time = $date->format('Y-m-d H:i:s');
        //save user data to database
        $stmt = $conn->prepare("INSERT INTO subscribers(Email, Time) values(?, ?)");
        $stmt->execute([$email, $time]);
        $stmt=NULL;
    }
?>