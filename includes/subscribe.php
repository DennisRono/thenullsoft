<?php
    if(isset($_POST['subscribe'])){
        $email = trim($_POST['email']);
        if(empty($email)){
            $err = "email cannot be empty!";
        } else {

            $date = new DateTime("now", new DateTimeZone('Africa/Nairobi'));
            $time = $date->format('Y-m-d H:i:s');
            //save user data to database
            $stmt = $conn->prepare("INSERT INTO users(Email, Time) values(?, ?)");
            $stmt->execute([$email, $time]);
            $stmt=NULL;
        }
    }
?>