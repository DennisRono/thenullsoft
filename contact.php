<?php
    require "./db/config.php";
    $err = "";

    if(isset($_POST['contact'])){
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $phone = trim($_POST['phone']);
        $website = trim($_POST['website']);
        $brief = trim($_POST['brief']);

        if(empty($name) && empty($email) && empty($phone) && empty($website) && empty($brief)){
            $err = "please fill in the form!";
        } else if(empty($name)){
            $err = "Please enter your name!";
        } else if(empty($email)){
            $err = "please enter your email!";
        } else if(empty($phone)){
            $err = "please enter your phone number!";
        } else if(empty($website)){
            $err = "Please enter your website's URL!";
        } else if(empty($brief)){
            $err = "Please describe your project briefly!";
        } else {
            $date = new DateTime("now", new DateTimeZone('Africa/Nairobi'));
            $time = $date->format('Y-m-d H:i:s');
            //save Contact data to database
            $stmt = $conn->prepare("INSERT INTO contact(Name, Email, Phone, Website, Description, Time) values(?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $email, $phone, $website, $brief, $time]);
            $stmt=NULL;
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#0088f0">
        <title>contact | thenullsoft</title>
        <link rel="manifest" href="./manifest.json" />
        <link rel="shortcut icon" href="assets/images/icons/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/fontawesome.min.css" integrity="sha512-xX2rYBFJSj86W54Fyv1de80DWBq7zYLn2z0I9bIhQG+rxIF6XVJUpdGnsNHWRa6AvP89vtFupEPDP8eZAtu9qA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,300;1,500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="./assets/css/globals.css?">
        <link rel="stylesheet" href="./assets/css/header.css?">
        <link rel="stylesheet" href="./assets/css/footer.css?">
        <link rel="stylesheet" href="./assets/css/contact.css">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9696700520011456"
     crossorigin="anonymous"></script>
    </head>
<body>
    <header class="header">
        <div class="hcontainer">
            <div class="hflex">
                <div class="hlogo">
                    <img loading="lazy" src="assets/images/icons/windows11/Square44x44Logo.scale-125.png" alt="thenullsoft" aria-label="thenullsoft">
                    <div class="bSearch">
                        <form class="bSearchForm">
                            <div class="bsgroup">
                                <input type="text" class="bscontrol" placeholder="Search">
                                <button type="submit"><i class="fa fa-search"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="hnavigation">
                    <nav class="hnav">
                        <li><a href="index.php">Home</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="about.html">About Us</a></li>
                        
                        <li><a href="contact.php">Contact</a></li>
                    </nav>
                    <div class="hcalltoaction">
                        <li><a href="auth/register.php" >Get Started</a></li>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section class="contactsec">
        <div class="contact">
            <div class="contactwrapper">
                <div class="contactFlex">
                    <div class="contactSidebar">
                        <h1 class="contSideTitle">What will happen next?</h1>
                        <p class="cttchild">
                            You are a step closer to building great software
                        </p>
                        <div class="contsidesteps">
                            <h3>1. connect with the development team</h3>
                            <p>
                                Over a series of calls, our tech team discusses how different technologies and frameworks will bring your vision to life.
                            </p>
                        </div>
                        <div class="contsidesteps">
                            <h3>2. Onboarding the team</h3>
                            <p>
                                As soon as you sign-off on the team, they’ll be ready to integrate into your team—just like in-house employees.
                            </p>
                        </div>
                    </div>
                    <div class="contactPlayarea">
                        <div class="contPlayBack"></div>
                        <div class="contPlayMain">
                            <div class="contactTitle">
                                <img src="./assets/svg/contact-heading-icon.svg" alt="">
                                <h1>Get in touch to discuss your project, share knowledge or even to just talk</h1>
                            </div>
                            <div class="contFormSec">
                                <form action="contact.php" method="POST">
                                    <h3>1. Tell us about yourself</h3>
                                    <div class="cont-group">
                                        <div class="user-input-wrp">
                                            <br/>
                                            <input id="id-input" type="text" onkeyup="this.setAttribute('value', this.value);" class="inputText" name="name" value=""/>
                                            <span class="floating-label">Your Name *</span>
                                        </div>
                                        <span id="id-err"></span>
                                        <div class="cont-gr-flex">
                                            <div class="contPut">
                                                <div class="user-input-wrp">
                                                    <br/>
                                                    <input id="id-input" type="text" onkeyup="this.setAttribute('value', this.value);" class="inputText" name="email" value=""/>
                                                    <span class="floating-label">Your Email *</span>
                                                </div>
                                                <span id="id-err"></span>
                                            </div>
                                            <div class="contPut">
                                                <div class="user-input-wrp">
                                                    <br/>
                                                    <input id="id-input" type="text" onkeyup="this.setAttribute('value', this.value);" class="inputText" name="phone" value=""/>
                                                    <span class="floating-label">Your Phone Number</span>
                                                </div>
                                                <span id="id-err"></span>
                                            </div>
                                        </div>
                                        <div class="user-input-wrp">
                                            <br/>
                                            <input id="id-input" type="text" onkeyup="this.setAttribute('value', this.value);" class="inputText" name="website" value=""/>
                                            <span class="floating-label">Company Website</span>
                                        </div>
                                        <span id="id-err"></span>
                                    </div>
                                    
                                    <h3>2. What are you looking to work on?</h3>
                                    <div class="cont-group">
                                        <div class="user-input-wrp">
                                            <br/>
                                            <textarea id="id-input" type="text" onkeyup="this.setAttribute('value', this.value);" class="inputText" name="brief" value="" style="min-height: 100px;"></textarea>
                                            <span class="floating-label">Describe your project briefly *</span>
                                        </div>
                                        <span id="id-err"></span>
                                        <div class="input-field-row">
                                            <div class="input-file-row">
                                                <label for="project_brief" class="project_brief">
                                                    <div class="file-content">
                                                        <div class="icon">
                                                            <img src="./assets/svg/icon-download.svg" alt="">
                                                        </div>
                                                        <div class="content-label">
                                                            Drag or browse your project brief
                                                        </div>
                                                    </div>
                                                    <div class="row-wrap">
                                                        <div id="filePush" class="button">upload</div>
                                                    </div>
                                                </label>
                                                <input class="file-field" type="file" accept="application/pdf, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint" name="upload[]" multiple="multiple">
                                            </div>
                                            <span id="id-err fileErr"></span>
                                        </div>
                                    </div>
                                    <input type="submit" value="submit" name="contact" class="contact-btn">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer class="footer">
        <div class="fcontainer">
            <div class="fdet">
                <div class="fdetflex">
                    <div class="fflexsecs">
                        <div class="flogo">
                            <img src="./assets/images/icons/favicon-32x32.png" alt="">
                            <h3>nullchemy</h3>
                        </div>
                        <div class="fsocials">
                            <i class="fa fa-facebook"></i>
                            <i class="fa fa-twitter"></i>
                            <i class="fa fa-linkedin"></i>
                            <i class="fa fa-youtube"></i>
                        </div>
                        <div class="siteProtection">
                            <img src="./assets/images/google-page-speed.png" alt="Google lite speed badge">
                            <img src="./assets/images/dmca-badge.png" alt="DMCA badge">
                        </div>
                    </div>
                    <div class="fflexsecs">
                        <h2>Resources</h2>
                        <ul>
                            <li><a href="">Success Stories</a></li>
                            <li><a href="">Blog</a></li>
                            <li><a href="">Case Studies</a></li>
                        </ul>
                    </div>
                    <div class="fflexsecs">
                        <h2>Company</h2>
                        <ul>
                            <li><a href="">About US</a></li>
                            <li><a href="">Our Partners</a></li>
                            <li><a href="">Contact Us</a></li>
                            <li><a href="">Careers</a></li>
                            <li><a href="">Events</a></li>
                        </ul>
                    </div>
                    <div class="fflexsecs">
                        <h2>Services</h2>
                        <ul>
                            <li><a href="">Web Development</a></li>
                            <li><a href="">Mobile Development</a></li>
                            <li><a href="">APIs</a></li>
                            <li><a href="">Support</a></li>
                            <li><a href="">Developers</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="fcopyright">
            <p>Copyright &copy; <script>document.write(new Date().getFullYear())</script> | built by <a title="Developer" target="blank" href="https://denniskibet.com">DennisRono</a> <a href="https://github.com/DennisRono" title="Github"><i class="fa-brands fa-github"></i></a></p>
        </div>
    </footer>
    <script src="./js/libs/jquery.min.js"></script>
    <script src="./js/fileupload.js"></script>
    <script src="./js/main.js"></script>
    <script src="https://kit.fontawesome.com/6d5a084346.js" crossorigin="anonymous"></script>
</body>
</html>