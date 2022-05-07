<?php
    require "../db/config.php";
    require "../includes/rand.php";
    include "../includes/emailconfirm.php";
    use Utils\RandomStringGenerator;
    $err = "";
    if(isset($_POST['register'])){
        $fullname = trim($_POST['fullname']);
        $email = trim($_POST['email']);
        $phone = trim($_POST['phoneno']);
        $password = trim($_POST['password']);
        $cpassword = trim($_POST['cpassword']);

        if(empty($fullname) && empty($email) && empty($password) && empty($cpassword)){
            $err = "please fill out the form";
        } else if(empty($fullname)){
            $err = "User Name is required";
        } else if(empty($email)){
            $err = "Email is required";
        } else if(empty($password)){
            $err = "Password is required";
        } else if(empty($cpassword)){
            $err = "You must confirm your password!";
        } else if($password != $cpassword){
            $err = "passwords mismatch!";
        } else if(!preg_match("/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im", $phone)){
            $err = "invalid phone number!";
        } else {
            //check if user is already registered
            $stmt = $conn->prepare('SELECT Email FROM users WHERE Email=?');
            $stmt->execute([$email]);
            if($stmt->rowCount > 0){
                $err = "Email already in use";
            } else {
                $pass = password_hash($password, PASSWORD_DEFAULT);

                //generate sessionID userID
                $generator = new RandomStringGenerator;
                $sessionid = $generator->generate(10);
                $generator = new RandomStringGenerator;
                $userid = $generator->generate(8);
               
                echo $sessionid.'    '.$userid;

                //save user data to database
                $stmt = $conn->prepare("INSERT INTO users(FullName, Email, Phone, Password, SessionID, UserID) values(?, ?, ?, ?, ?, ?)");
                $stmt->execute([$fullname, $email, $phone, $pass, $sessionid, $userid]);
                $stmt=NULL;

                //send confirmation email
                emailconfirm($email);

                //redirect user to homepage
                header("Location: login.php");
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
    <title>Register | thenullsoft</title>
    <link rel="manifest" href="../manifest.json" />
    <link rel="shortcut icon" href="../assets/images/icons/favicon.ico" type="image/x-icon">
    <link rel="text/html" href="../assets/fontawesome-5.0.8/css/fontawesome-all.min.css">
    <link rel="text/html" href="../assets/fontawesome-5.0.8/css/fontawesome.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,300;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/globals.css?">
    <link rel="stylesheet" href="../assets/css/register.css?">
</head>
<body>
    <div class="reg">
        <div class="regcontainer">
            <div class="regwrapper">
                <div class="reg-inner-wrapper">
                    <div class="regbox">
                        <h2 class="regtitle">create an account</h2>
                        <div class="errbox">
                            <?php if($err != ""){ ?>
                                <div class="therr">
                                    <p><?php echo $err; ?></p>
                                </div>
                            <?php } ?>
                        </div>
                        <form action="register.php" method="POST" class="regform">
                            <div class="user-input-wrp">
                                <br/>
                                <input id="id-input" type="text" onkeyup="this.setAttribute('value', this.value);" class="inputText" name="fullname" value=""/>
                                <span class="floating-label">Your Full Name *</span>
                            </div>
                            <span id="id-err"></span>
                            <div class="cont-gr-flex">
                                <div class="contPut">
                                    <div class="user-input-wrp">
                                        <br/>
                                        <input id="emailaddr" type="email" onkeyup="this.setAttribute('value', this.value); checkemail(this.value);" class="inputText" name="email" value=""/>
                                        <span class="floating-label">Your Email *</span>
                                    </div>
                                    <span id="email-err"></span>
                                </div>
                                <div class="contPut">
                                    <div class="user-input-wrp">
                                        <br/>
                                        <input id="phoneNumber" type="text" onkeyup="this.setAttribute('value', this.value); checkphone(this.value);" class="inputText" name="phoneno" value=""/>
                                        <span class="floating-label">Your Phone Number</span>
                                    </div>
                                    <span id="phone-err"></span>
                                </div>
                            </div>
                            <div class="user-input-wrp" >
                                <br/>
                                <input id="usrpass" type="password" onkeyup="this.setAttribute('value', this.value); passcheck(this.value);" class="inputText" name="password" value=""/>
                                <span class="floating-label">Password *</span>
                            </div>
                            <span id="pass-err"></span>
                            <div class="user-input-wrp">
                                <br/>
                                <input id="usrcpass" type="password" onkeyup="this.setAttribute('value', this.value); confirmpass(this.value);" class="inputText" name="cpassword" value=""/>
                                <span class="floating-label">Confirm Password *</span>
                            </div>
                            <span id="cpass-err"></span>
                            <div class="termsofservice">
                                <br>
                                <p>By signing up to thenullsoft you opt in to our <a href="../tos.html" >terms of service</a> and our <a href="../privacy.html" >privacy policies</a></p>
                                <br>
                            </div>
                            <div class="subflex">
                                <input type="submit" value="sign up" name="register" class="register-btn">
                                <div class="logDirect">
                                    <p>
                                        Already have an account? 
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
        const passcheck = (a) => {
            const passerr = document.getElementById('pass-err');
            let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
            if(a.length !== 0){
                if(strongPassword.test(a) || a.length > 10) {
                    passerr.innerHTML = "<span class='passwarn' style='background-color: #3cff87;'></span>".repeat(8);
                } else if(mediumPassword.test(a) || a.length > 6) {
                    passerr.innerHTML = "<span class='passwarn' style='background-color: #ffea71;'></span>".repeat(8);
                } else {
                    passerr.innerHTML = "<span class='passwarn' style='background-color: #fe7979;'></span>".repeat(8);
                }
            }
        }
        const confirmpass = (a) => {
            let usrpassw = document.getElementById('usrpass').value;
            let cpassErr = document.getElementById('cpass-err');
            if(a.length >= usrpassw.length){
                if(a !== usrpassw){
                    cpassErr.innerHTML = "passwords do not match!";
                    cpassErr.classList.add('id-err')
                    document.getElementById('usrcpass').classList.add('id-input')
                } else {
                    cpassErr.innerHTML = "";
                    cpassErr.classList.remove('id-err')
                    document.getElementById('usrcpass').classList.remove('id-input')
                }
            }
        }
    </script>
</body>
</html>