<?php
    require "../db/config.php";
    require "../includes/sendotp.php";

    $err = "";
    if(isset($_POST['forgot'])){
        $email = trim($_POST['email']);
        if(empty($email)){
            $err = "email is required!";
        } else {
            //check if user is registered in database
            //check if user is registered
            $stmt = $conn->prepare('SELECT Email FROM users WHERE Email=?');
            $stmt->execute([$email]);
            if($stmt->rowCount() > 0){
                session_start();
                $_SESSION['email'] = $email;
                $otp = random_int(100000, 999999);
                $sql = "UPDATE users SET OTP=? WHERE Email=?";
                $conn->prepare($sql)->execute([$otp, $email]);
                sendotp($email, $otp);
            } else {
                $err = "Your details did not match our records!";
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password | thenullsoft</title>
    <link rel="manifest" href="../manifest.json" />
    <link rel="shortcut icon" href="../assets/images/icons/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/fontawesome.min.css" integrity="sha512-xX2rYBFJSj86W54Fyv1de80DWBq7zYLn2z0I9bIhQG+rxIF6XVJUpdGnsNHWRa6AvP89vtFupEPDP8eZAtu9qA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,300;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/globals.css?">
    <link rel="stylesheet" href="../assets/css/login.css?">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9696700520011456"
     crossorigin="anonymous"></script>
</head>
<body>
    <div class="back-home" style="position: absolute; top: 30px; right: 30px; z-index: 999;"><a href="../index.php"><i class="fa-solid fa-house"></i></a></div>
    <div class="reg">
        <div class="regcontainer">
            <div class="regwrapper">
                <div class="reg-inner-wrapper">
                    <div class="regbox">
                        <h2 class="regtitle">Request password reset code</h2>
                        <div class="errbox">
                            <?php if($err != ""){ ?>
                                <div class="therr">
                                    <p><?php echo $err; ?></p>
                                </div>
                            <?php } ?>
                        </div>
                        <br>
                        <form action="forgot.php" method="POST" class="regform">
                            <div class="user-input-wrp">
                                <br/>
                                <input id="usrcpass" type="email" onkeyup="this.setAttribute('value', this.value); checkemail(this.value);" class="inputText" name="email" value=""/>
                                <span class="floating-label">Email *</span>
                            </div>
                            <span id="cpass-err"></span>
                            <br>
                            <div class="subflex">
                                <input type="submit" value="get otp" name="forgot" class="register-btn">
                                <div class="logDirect">
                                    <p>
                                        Get to your account? 
                                        <a href="./login.php">login here</a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="regImage">
                        <div class="regImageWrapper">
                            <img src="../assets/svg/open_source.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script typee="text/JavaScript">
        const checkphone = (a) => {
            let phoneErr = document.getElementById('phone-err');
            if(isNaN(a) || a.length >= 10 && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(a)){
                phoneErr.innerHTML = "Invalid Phone number";
                phoneErr.classList.add('id-err')
                document.getElementById('phoneNumber').classList.add('id-input')
            } else {
                phoneErr.innerHTML = "";
                phoneErr.classList.remove('id-err')
                document.getElementById('phoneNumber').classList.remove('id-input')
            }
        }
        const validateEmail = (email) => {
            return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
        const checkemail = (a) => {
            let emailErr = document.getElementById('email-err');
            if(!validateEmail(a)){
                emailErr.innerHTML = "Invalid email address";
                emailErr.classList.add('id-err')
                document.getElementById('emailaddr').classList.add('id-input')
            } else {
                emailErr.innerHTML = "";
                emailErr.classList.remove('id-err')
                document.getElementById('emailaddr').classList.remove('id-input')
            }
        }
    </script>
</body>
</html>