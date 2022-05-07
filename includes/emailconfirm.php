<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    require '../vendor/autoload.php';
    function retry($email){
        emailconfirm($email);
    }
    function emailconfirm($email){
        $message = '<strong>Welcome to Dennis Kibet Team</strong> <br><br>Confirm your Email Address <br><a href="https://denniskibet.com/auth/verify.php?email='.$email.'">Confirm</a>';
        $mail = new PHPMailer();
        $mail->SMTPDebug = 0;
        $mail->Host = 'localhost';
        $mail->Port = 25;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->SMTPAuth = false;
        $mail->Username = 'support@denniskibet.com';
        $mail->Password = '@neron27finn';
        $mail->setFrom('support@denniskibet.com', 'denniskibet Team');
        $mail->addAddress($email);
        $mail->Subject = 'You have a new Message From denniskibet.com';
        $mail->msgHTML($message);
        $mail->AltBody = $message;
        if (!$mail->send()) {
        } else {
            retry($email);
        }
    }
?>