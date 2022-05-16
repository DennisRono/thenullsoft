<?php
    require "../db/config.php";
    $err = "";

    if(isset($_POST['sumbit'])){
        $otp = trim($_POST['otp']);

        if(empty($otp)){
            $err = "OTP is required!";
        } else {
            session_start();
            //fetch OTP
            $email = $_SESSION['email'];
            $query = $conn->prepare( "SELECT OTP FROM users WHERE Email=?" );
            $query->execute([$email]);
            $row = $query->fetch(PDO::FETCH_OBJ);
            $db_otp = $row->OTP;

            if($otp == $db_otp){
                $_SESSION['otp'] = random_int(100000, 999999);
                header('Location: resetpass.php');
            } else {
                $err = "incorrect OTP!";
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
    <title>One Time Pin | thenullsoft</title>
    <link rel="manifest" href="../manifest.json" />
    <link rel="shortcut icon" href="../assets/images/icons/favicon.ico" type="image/x-icon">
    <link rel="text/html" href="../assets/fontawesome-5.0.8/css/fontawesome-all.min.css">
    <link rel="text/html" href="../assets/fontawesome-5.0.8/css/fontawesome.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,300;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/globals.css?">
    <link rel="stylesheet" href="../assets/css/login.css?">
</head>
<body>
    <div class="reg">
        <div class="regcontainer">
            <div class="regwrapper">
                <div class="reg-inner-wrapper">
                    <div class="regbox">
                        <h2 class="regtitle">Enter the OTP we sent you</h2>
                        <div class="errbox">
                            <?php if($err != ""){ ?>
                                <div class="therr">
                                    <p><?php echo $err; ?></p>
                                </div>
                            <?php } ?>
                        </div>
                        <br>
                        <form action="otp.php" method="POST" class="regform">
                            <div class="user-input-wrp">
                                <br/>
                                <input id="usrotp" type="text" onkeyup="this.setAttribute('value', this.value); checkotp(this.value);" class="inputText" name="otp" value=""/>
                                <span class="floating-label">OTP *</span>
                            </div>
                            <span id="otp-err"></span>
                            <br>
                            <div class="subflex">
                                <input type="submit" value="submit" name="sumbit" class="register-btn">
                                <div class="logDirect">
                                    <p>
                                        Didn't get an OTP? 
                                        <a href="./login.php">Resend</a>
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
        const checkotp =  (a) => {
            let otpErr = document.getElementById('otp-err');
            if(isNaN(a) || a.length > 6){
                otpErr.innerHTML = "Invalid OTP";
                otpErr.classList.add('id-err')
                document.getElementById('usrotp').classList.add('id-input')
            } else {
                otpErr.innerHTML = "";
                otpErr.classList.remove('id-err')
                document.getElementById('usrotp').classList.remove('id-input')
            }
        }
    </script>
</body>
</html>