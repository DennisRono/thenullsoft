<?php
    if(isset($_POST['subscribe'])){
        $email = trim($_POST['email']);
        if(empty($email)){
            $err = "email cannot be empty!";
        } else {
            //save user data to database
            $stmt = $conn->prepare("INSERT INTO users(Email, Time) values(?, ?)");
            $stmt->execute([$email, $time]);
            $stmt=NULL;
        }
    }
?>