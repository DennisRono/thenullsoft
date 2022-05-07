<?php
    require "../db/config.php";
    require "../includes/rand.php";
    use Utils\RandomStringGenerator;
    $err = "";

    if(isset($_POST['login'])){
        $emphone = trim($_POST['emphone']);
        $password = trim($_POST['password']);
        //check if email or phone number is entered
        (!filter_var($emphone, FILTER_VALIDATE_EMAIL))?$phone = $emphone:$email = $emphone;

        if(empty($emphone) && empty($password)){
            $err = "please fill out the form";
        } else if(empty($emphone)){
            $err = "Please enter your email or phone number";
        } else if(empty($password)){
            $err = "Please enter your password";
        } else {
            //check if user is registered
            $stmt = $conn->prepare('SELECT Email FROM users WHERE Email=?');
            $stmt->execute([$email]);
            if($stmt->rowCount() > 0){
                //fetch password
                $query = $conn->prepare( "SELECT Password FROM users WHERE Email=?" );
                $query->execute([$email]);
                $row = $query->fetch(PDO::FETCH_OBJ);
                $pass = $row->Password;
                //authenticate password
                if (password_verify($password, $pass)) {
                    // start session
                    session_start();
                    //generate session
                    $generator = new RandomStringGenerator;
                    $sessionid = $generator->generate(32);
                    //update session to database
                    $sql = "UPDATE users SET Sessionid=? WHERE Email=?";
                    $conn->prepare($sql)->execute([$sessionid, $email]);
                    $_SESSION['sessionid'] = $sessionid;
                    //header("Location: ../index.html");
                } else {
                    $err = "invalid details!";
                }
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
    <title>Login | thenullsoft</title>
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
                        <h2 class="regtitle">Login to your account</h2>
                        <div class="errbox">
                            <?php if($err != ""){ ?>
                                <div class="therr">
                                    <p><?php echo $err; ?></p>
                                </div>
                            <?php } ?>
                        </div>
                        <br>
                        <form action="login.php" method="POST" class="regform" id="logform">
                            <div class="user-input-wrp">
                                <br/>
                                <input id="usrcpass" type="text" onkeyup="this.setAttribute('value', this.value); confirmpass(this.value);" class="inputText" name="emphone" value=""/>
                                <span class="floating-label">Email or Phone *</span>
                            </div>
                            <span id="cpass-err"></span>
                            <div class="user-input-wrp" >
                                <br/>
                                <input id="usrpass" type="password" onkeyup="this.setAttribute('value', this.value); passcheck(this.value);" class="inputText" name="password" value=""/>
                                <span class="floating-label">Password *</span>
                            </div>
                            <span id="pass-err"></span>
                            <div class="forgotpass">
                                <a href="forgot.html">forgot password?</a>
                            </div>
                            <div class="termsofservice">
                                <br>
                                <p>By signing in to thenullsoft you opt in to our <a href="../tos.html" >terms of service</a> and our <a href="../privacy.html" >privacy policies</a></p>
                                <br>
                            </div>
                            <div class="subflex">
                                <input id="loginBtn" type="submit" value="sign in" name="login" class="register-btn">
                                <div class="logDirect">
                                    <p>
                                        Don't have an account? 
                                        <a href="./register.html">register here</a>
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
    <script src="../js/libs/jquery.min.js"></script>
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
    <script>
      //get user inputs from forms
      let email = "<?php if(isset($_POST['email'])){echo $_POST['email'];}else{echo "new";} ?>";
      let pass = "<?php if(isset($_POST['password'])){echo $_POST['password'];}else{echo "new";} ?>";
      let cpass = btoa(email+':#:'+pass+':#:login');
    </script>
    <script src="auth.js"></script>
</body>
</html>