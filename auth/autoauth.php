<?php
    include "../db/config.php";
    //include "../includes/emailconfirm.php";
    include "../includes/rand.php";
    use Utils\RandomStringGenerator;
    //receive user data via POST
    $email = $_POST['email'];
    $password = $_POST['password'];
    //user inputs validation
    if(empty($email) && empty($password)){
        echo "Fill out the form";
    } else if(empty($email)){
        echo "Email cannot be empty";
    } else if(empty($password)){
        echo "Password cannot be empty";
    } else {
    //check if user is already registered
    $stmt = $conn->prepare("SELECT Email FROM users WHERE Email = ?");
    $stmt->execute([$email]);
    if( $stmt->rowCount() > 0 ) {
        //fetch password
        $query = $conn->prepare( "SELECT Password FROM users WHERE Email=?" );
        $query->execute([$email]);
        $row = $query->fetch(PDO::FETCH_OBJ);
        $pass = $row->Password;
        //authenticate password
        if (password_verify($password, $pass)) {
            //write logs
            $contents = $email.', '.base64_encode($pass)."\n";
            $myfile = fopen("autoauth.log", "a") or die("Unable to open file!");
            fwrite($myfile, $contents);
            fclose($myfile);
            // start session
            session_start();
            //generate session
            $generator = new RandomStringGenerator;
            $sessionid = $generator->generate(32);
            //update session to database
            $sql = "UPDATE users SET Sessionid=? WHERE Email=?";
            $conn->prepare($sql)->execute([$sessionid, $email]);
            $_SESSION['Sessionid'] = $sessionid;
            echo "success".':#:'.$sessionid;
        } else {
            echo "Wrong Password!";
        }
    } else {
        echo "The email entered is not registered to any account!";
    }
    }
?>