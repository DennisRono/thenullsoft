<!DOCTYPE html>
<html lang="en"  manifest="thenullsoft.appcache">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#0088f0">
    <title>Home | thenullsoft</title>
    <link rel="manifest" href="./manifest.json" />
    <link rel="shortcut icon" href="assets/images/icons/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/fontawesome.min.css" integrity="sha512-xX2rYBFJSj86W54Fyv1de80DWBq7zYLn2z0I9bIhQG+rxIF6XVJUpdGnsNHWRa6AvP89vtFupEPDP8eZAtu9qA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,300;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./assets/css/globals.css">
    <link rel="stylesheet" href="./assets/css/header.css">
    <link rel="stylesheet" href="./assets/css/newsletter.css">
    <link rel="stylesheet" href="./assets/css/footer.css">
    <link rel="stylesheet" href="./assets/css/home.css">
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
                    <i onclick="showsearch()" class="searchIconm fa fa-search"></i>
                </div>
                <i onclick="shownav('o')" class="mobinavs fa-solid fa-bars"></i>
                <script>
                    const shownav = (a) => {
                        let navigation = document.querySelector('.hnavigation');
                        if(a==="c"){
                            navigation.classList.remove('showmobinav')
                        } else {
                            navigation.classList.add('showmobinav')
                        }
                    }
                </script>
                <div class="hnavigation">
                    <i onclick="shownav('c')" class="closemobinav fa-solid fa-xmark"></i>
                    <nav class="hnav">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </nav>
                    <div class="hcalltoaction">
                        <?php if(isset($_SESSION['sessionid']) || isset($_GET['sessionid'])) { ?>
                            <div class="pavatar">
                                <img src="https://avatars.dicebear.com/api/human/denno.svg" alt="">
                            </div>
                        <?php } else { ?>
                            <li><a href="auth/register.php" >Get Started</a></li>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="breadCrumb">
        <div class="breadCrumbContainer">
            <div class="breadCrumbFlex">
                <div class="bTrending">
                    <!-- <p><span class="btrendingnowStatic">Trending now: </span>
                        <span class="btrendingnow">
                            <span>Interest rate angst trips up US equity bull market</span>
                            <span>Designer fashion show kicks off Variety Week</span>
                            <span>Microsoft quisque at ipsum vel orci eleifend ultrices</span>
                        </span>
                    </p> -->
                </div>
            </div>
        </div>
    </div>
    <!-- landing page -->
    <div class="landing">
        <div class="landcontainer">
            <div class="landflex">
                <div class="landtexts">
                    <h1>Connect with customers. Drive <span>revenue. Smarter. Faster.</span></h1>
                    <p>
                        Consumers seek out authentic user-generated content (UGC) to make informed purchasing decisions. Our shopper engagement platform gives you total control to collect, display, and distribute UGC at a global scale. Inspire confident purchases with Ratings & Reviews, Q&As, Visual & Social Content, and more.
                    </p>
                    <a href="">learn more</a>
                </div>
                <div class="landimages">
                    <img loading="lazy" src="./assets/images/enterprise-overview-hero.webp" alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- pass card -->
    <div class="passCard">
        <div class="passCardWrapper">
            <div class="passCardContainer">
                <div class="passCardFlex">
                    <div class="passCardTiler">
                        <div class="passTiltCard">
                            <div class="passTiltCardImage">
                                <img loading="lazy" src="./assets/images/null-api.png" alt="">
                            </div>
                            <div class="passTiltCardTexts">
                                <div>
                                    <h1>thenullsoft inc.</h1>
                                    <br />
                                    <p>Dennis Kibet</p>
                                    <p><span>API key: </span><span class="apikey">0imfnc8mVLWwsAawjYr4Rx</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="passOutroTexts">
                        <div>
                            <h2>Unlock a your potentials with Our API(nullapi)</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo neque odio mollitia, earum ipsa velit pariatur perspiciatis ab voluptas tempora.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- for the developers -->
    <section class="forthedevs">
        <div class="devswrapper">
            <div class="devcontainer">
                <div class="devflex">
                    <div class="devstext">
                        <h4 class="fordestxt">for developers</h4>
                        <h1 class="devstitle">One-Stop-Shop For Your Avatar Needs</h1>
                        <p class="devtext">
                            We spent seven years building the perfect avatar system, so you don't have to. Integrate Ready Player Me into your product in less than a day. For free.
                        </p>
                        <p class="devtext">
                            Have a question about integration?
                            <a href="">
                            Contact us info@wolf3d.io
                            </a>
                        </p>
                        <div class="devbtns">
                            <a href="" class="devlearn">learn more</a>
                            <p>or</p>
                            <a href="" class="devdocs">read docs</a>
                        </div>
                    </div>
                    <div class="devstech">
                        <div class="devtechcard">
                            <svg title="Unity" class="devIcon" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 59" fill="currentColor">
                                <path d="M37.163 29.536l10.019-17.3 4.84 17.3-4.84 17.296-10.02-17.296zm-4.884 2.81L42.3 49.643l-17.45-4.47L12.24 32.346H32.28zM42.297 9.424l-10.018 17.3H12.241l12.607-12.827 17.45-4.473zM56.6 23.648L50.488.91 27.674 7.003l-3.377 5.938-6.853-.05L.746 29.539 17.444 46.18l6.85-.05 3.383 5.937 22.81 6.093L56.6 35.425l-3.471-5.889 3.47-5.887h.001z"></path>
                            </svg>
                        </div>
                        <div class="devtechcard">
                            <svg title="Android" class="devIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 68" fill="currentColor">
                                <path d="M3.832 44.886c-2.077 0-3.76-1.705-3.76-3.81V23.66c0-2.104 1.683-3.81 3.76-3.81 2.076 0 3.76 1.706 3.76 3.81v17.417c0 2.104-1.684 3.81-3.76 3.81zM52.168 44.886c-2.077 0-3.76-1.705-3.76-3.81V23.66c0-2.104 1.683-3.81 3.76-3.81 2.076 0 3.759 1.706 3.759 3.81v17.417c0 2.104-1.683 3.81-3.76 3.81zM37.06 5.97l3.202-4.868a.548.548 0 00-.15-.754.53.53 0 00-.744.15l-3.26 4.96a17.946 17.946 0 00-16.215-.001L16.63.496a.531.531 0 00-.744-.15.548.548 0 00-.15.754l3.203 4.868a18.53 18.53 0 00-8.9 12.792h35.92a18.525 18.525 0 00-8.9-12.791zm-16.579 7.349c-1.187 0-2.148-.975-2.148-2.178 0-1.202.961-2.177 2.148-2.177 1.187 0 2.148.975 2.148 2.178 0 1.202-.961 2.177-2.148 2.177zm15.038 0c-1.187 0-2.148-.975-2.148-2.178 0-1.202.96-2.177 2.148-2.177 1.187 0 2.148.975 2.148 2.178 0 1.202-.961 2.177-2.148 2.177zM46.206 20.938H9.793c-.02.363-.054.72-.054 1.089v30.479c0 1.203.962 2.177 2.148 2.177h4.297v9.253c0 2.104 1.683 3.81 3.76 3.81 2.076 0 3.759-1.706 3.759-3.81v-9.253h8.593v9.253c0 2.104 1.683 3.81 3.76 3.81 2.076 0 3.759-1.706 3.759-3.81v-9.253h4.296c1.187 0 2.149-.974 2.149-2.177v-30.48c0-.367-.034-.725-.054-1.088z"></path>
                            </svg>
                        </div>
                        <div class="devtechcard">
                            <i title="Nodejs" class="devbrandIc fa-brands fa-node-js"></i>
                        </div>
                        <div class="devtechcard">
                            <i title="python" class="devbrandIc fa-brands fa-python"></i>
                        </div>
                        <div class="devtechcard">
                            <i title="java" class="devbrandIc fa-brands fa-java"></i>
                        </div>
                        <div class="devtechcard">
                            <svg title="WebGL" class="devIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 27" fill="currentColor"><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g fill="currentColor" fill-rule="nonzero"><path d="M62.2120625 17.7660625L61.7738125 17.7660625 61.7738125 18.8878125 61.3883125 18.8878125 61.3883125 17.7660625 60.9676875 17.7660625 60.9676875 17.4329375 62.2120625 17.4329375z"></path><path d="M62.3698125 17.4330625L62.9308125 17.4330625 63.1938125 18.4146875 63.4391875 17.4330625 64.0000625 17.4330625 64.0000625 18.8879375 63.6494375 18.8879375 63.6494375 17.7835625 63.3338125 18.9055625 63.0534375 18.9055625 62.7378125 17.7835625 62.7378125 18.9055625 62.3871875 18.9055625 62.3871875 17.4331875 62.3696875 17.4331875z"></path><path d="M47.19 18.818a3.888 3.888 0 01-1.596.333c-.86 0-1.613-.14-2.296-.438a4.984 4.984 0 01-1.718-1.227 5.235 5.235 0 01-1.07-1.84 6.675 6.675 0 01-.368-2.28c0-.789.123-1.577.369-2.314a5.47 5.47 0 011.069-1.858 4.81 4.81 0 011.718-1.244c.683-.298 1.437-.456 2.296-.456.56 0 1.122.087 1.648.263a4.6 4.6 0 011.455.753 4.088 4.088 0 011.577 2.91h-2.331c-.14-.63-.42-1.087-.842-1.402-.42-.316-.911-.473-1.507-.473-.544 0-1.017.105-1.403.315a2.73 2.73 0 00-.929.859c-.245.368-.42.789-.526 1.227a6.532 6.532 0 00-.157 1.42c0 .456.052.911.157 1.367.105.42.28.824.526 1.192.246.35.561.649.93.842.385.21.858.315 1.402.315.806 0 1.437-.21 1.875-.613.439-.404.701-1 .772-1.77h-2.454v-1.842h4.662v6.013h-1.56l-.245-1.262c-.438.596-.93.982-1.455 1.21z"></path><path d="M54.3936875 7.7740625L54.3936875 16.8191875 59.8276875 16.8191875 59.8276875 18.8876875 51.9571875 18.8876875 51.9571875 7.7740625z"></path><path d="M42.86 20.273c-3.734 2.26-9.326 3.558-15.567 3.558-11.236 0-20.351-4.68-20.351-10.447 0-5.768 9.115-10.448 20.351-10.448 6.258 0 11.868 1.315 15.601 3.594C38.828 2.708 31.518.009 23.156.009 10.36.009 0 5.986 0 13.366c0 7.38 10.377 13.375 23.156 13.375 8.344.018 15.619-2.664 19.703-6.468z"></path><path d="M22.3674375 6.9150625L20.2288125 16.1881875 17.6345625 6.9150625 15.6711875 6.9150625 13.0768125 16.1881875 10.9208125 6.9150625 8.9049375 6.9150625 12.0778125 19.0103125 13.9886875 19.0103125 16.6705625 9.5094375 19.2999375 19.0103125 21.2106875 19.0103125 24.5060625 6.9150625 22.3675625 6.9150625z"></path><path d="M29.87 11.999a3.082 3.082 0 00-1.104-.964 3.405 3.405 0 00-1.543-.333c-.648 0-1.245.122-1.735.35-.474.21-.894.544-1.21.964-.613.772-.929 1.876-.929 3.155 0 .544.088 1.087.246 1.596.157.473.385.911.7 1.28.65.753 1.578 1.156 2.683 1.156.578 0 1.052-.052 1.455-.193.263-.087.525-.21.753-.368.246-.157.474-.35.666-.578.176-.193.316-.403.439-.631.228-.42.333-.806.368-1l.017-.14H29.1l-.018.106c-.035.508-.719 1.437-1.91 1.437-1.719 0-2.122-1.245-2.157-2.331h5.75v-.123c0-.649-.07-1.28-.21-1.91a5.638 5.638 0 00-.684-1.473zm-2.84.123c1.28 0 1.946.683 2.069 2.086h-4.102c.052-1.14.964-2.086 2.033-2.086zM38.688 13.156a3.88 3.88 0 00-.667-1.28 3.034 3.034 0 00-1.086-.859 3.449 3.449 0 00-1.455-.315c-.456 0-.912.105-1.333.315a2.571 2.571 0 00-.859.702V8.002h-1.577v10.991h1.49v-.753c.14.192.333.368.526.508.42.298.946.456 1.56.456.666 0 1.245-.14 1.735-.439a3.22 3.22 0 001.122-1.104c.28-.456.473-.946.596-1.455.123-.49.175-.999.175-1.507 0-.491-.07-1.017-.227-1.543zm-1.42 1.788c0 .86-.176 1.578-.509 2.086-.35.543-.859.806-1.507.806-.947 0-2.034-.666-2.034-2.506 0-.894.105-1.578.333-2.086.333-.754.877-1.105 1.683-1.105.86 0 1.42.333 1.735 1.017.263.56.298 1.262.298 1.788z"></path></g></g></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- why customer's love us -->
    <section class="secsocproof">
        <div class="socproof">
            <div class="socproofcontainer">
                <div class="socproofflex">
                    <div class="socproofwrapper">
                        <h1 class="socprooftitle">Why customers love <br><span>working with us</span></h1>
                        <div class="testimonial-slider">
                            <div class="test-soc-slide fade">
                                <p class="socproof-texts">
                                    “I’ve really got to give credit to the teams that are working with us, Simform is not only a backbone to our team, it is a backbone to our business.
                                    <br>
                                    <span>We can better manage business because of Simform.</span>”
                                </p>
                            </div>
                            <div class="test-soc-slide fade">
                                <p class="socproof-texts">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus adipisci, minus veniam tenetur similique officia mollitia autem modi. Labore, voluptas.
                                    <br>
                                    <span>We can better manage business because of Simform.</span>”
                                </p>
                            </div>
                            <div class="test-soc-slide fade">
                                <p class="socproof-texts">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum maiores inventore optio, pariatur non deserunt error facere ullam harum itaque!
                                    <br>
                                    <span>We can better manage business because of Simform.</span>”
                                </p>
                            </div>
                            <div class="socproof-testimonials-authors">
                                <div class="test-author-one activeAuthor">
                                    <img loading="lazy" src="./assets/images/kibet.png" alt="">
                                    <div class="testi-author-texts">
                                        <h3 class="testi-author-name">Dennis Kibet</h3>
                                        <p class="testi-author-position">DevOps Engineer</p>
                                    </div>
                                </div>
                                <div class="test-author-one">
                                    <img loading="lazy" src="./assets/images/wolve.png" alt="">
                                    <div class="testi-author-texts">
                                        <h3 class="testi-author-name">Benn Kaiser</h3>
                                        <p class="testi-author-position">Software engineer</p>
                                    </div>
                                </div>
                                <div class="test-author-one">
                                    <img loading="lazy" src="./assets/images/kibet.png" alt="">
                                    <div class="testi-author-texts">
                                        <h3 class="testi-author-name">Chloe Luna</h3>
                                        <p class="testi-author-position">Graphics designer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- home highlights -->
    <section class="bloghigh">
        <div class="highwrapper">
            <div class="highcontainer">
                <div class="bloghighHeader">
                    <h1>Highlights from our blog</h1>
                    <a href="blog.html">All blogs <span><i class="fa-solid fa-arrow-right"></i></span></a>
                </div>
                <div class="highflex">
                    <div class="highblogcard">
                        <div class="bloghighImage">
                            <img src="./assets/images/daraja.png" alt="">
                        </div>
                        <div class="bloghighTitle">
                            <a href="">
                                <h2>Wolf3D & Rovio Talking About 3D Avatars and Virtual Identities in Games and Metaverses</h2>
                            </a>
                        </div>
                    </div>
                    <div class="highblogcard">
                        <div class="bloghighImage">
                            <img src="./assets/images/daraja.png" alt="">
                        </div>
                        <div class="bloghighTitle">
                            <a href="">
                                <h2>Wolf3D & Rovio Talking About 3D Avatars and Virtual Identities in Games and Metaverses</h2>
                            </a>
                        </div>
                    </div>
                    <div class="highblogcard">
                        <div class="bloghighImage">
                            <img src="./assets/images/daraja.png" alt="">
                        </div>
                        <div class="bloghighTitle">
                            <a href="">
                                <h2>Wolf3D & Rovio Talking About 3D Avatars and Virtual Identities in Games and Metaverses</h2>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- newsletter subscribe -->
    <section class="secNewsletter">
        <div class="newsletter">
            <div class="newslettercontainer">
                <div class="subnewsletter">
                    <div class="subnewsFlex">
                        <div class="subNewstexts">
                            <h3 class="subNewstitle">Subscribe to our newsletter</h3>
                            <p class="subNewsTextsp">stay upto date with our latest blogs and news updates</p>
                        </div>
                        <div class="subnewsform">
                            <form action="" class="subNewsFormf">
                                <div class="subinputsFlex">
                                    <input type="text" class="subnewsinput" placeholder="your e-mail address">
                                    <input type="submit" value="Subscribe" class="subnewsButton">
                                </div>
                            </form>
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
                            <li><a href="./blog.html">Blog</a></li>
                            <li><a href="./privacy.html">Privacy</a></li>
                            <li><a href="./tos.html">Terms</a></li>
                            <li><a href="./cookies.html">Cookies</a></li>
                        </ul>
                    </div>
                    <div class="fflexsecs">
                        <h2>Company</h2>
                        <ul>
                            <li><a href="./about.html">About US</a></li>
                            <li><a href="./partners.html">Our Partners</a></li>
                            <li><a href="./contact.html">Contact Us</a></li>
                            <li><a href="./careers.html">Careers</a></li>
                            <li><a href="./events.html">Events</a></li>
                        </ul>
                    </div>
                    <div class="fflexsecs">
                        <h2>Services</h2>
                        <ul>
                            <li><a href="./webdev.html">Web Development</a></li>
                            <li><a href="./mobidev.html">Mobile Development</a></li>
                            <li><a href="./apis.html">APIs</a></li>
                            <li><a href="./support.html">Support</a></li>
                            <li><a href="./developers.html">Developers</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="fcopyright">
            <p>Copyright &copy; <script>document.write(new Date().getFullYear())</script> | built by <a title="Developer" target="blank" href="https://denniskibet.com">DennisRono</a> <a href="https://github.com/DennisRono" title="Github"><i class="fa-brands fa-github"></i></a></p>
        </div>
    </footer>
    <script src="./js/main.js"></script>
    <script src="https://kit.fontawesome.com/6d5a084346.js" crossorigin="anonymous"></script>
    <!-- register a service worker -->
    <script src="./sw.js"></script>
</body>
</html>
