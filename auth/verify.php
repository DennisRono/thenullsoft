<?php
    if(isset($_GET['email']) && isset($_GET['tk'])){
        $email = $_GET['email'];
        $token = $_GET['tk'];

        //fetch token
        $query = $conn->prepare( "SELECT Token FROM users WHERE Email=?" );
        $query->execute([$email]);
        $row = $query->fetch(PDO::FETCH_OBJ);
        $tk = $row->Token;

        if($token == $tk){
            //update the database
            $sql = "UPDATE users SET Verified=? WHERE Email=?";
            $conn->prepare($sql)->execute([1, $email]);
            header('Location: login.php');
        } else {
            header('Location: err.html');
        }
    } else {
        header('Location: err.html');
    }
?>