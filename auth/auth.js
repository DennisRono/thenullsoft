//persist on the mode on refresh
/*
    Dennis kibet github: @DennisRono
    Licence: MIT
*/
//set cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkCookie() {
  let userdet = getCookie("thenullsoft");
  if (userdet != "") {
    autologin(userdet);
  } else {
    
  }
}
checkCookie()

//fetch cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//reverse string
function reverseString(str) {
  return str.split("").reverse().join("");
}
cpass = reverseString(cpass);
document.getElementById("loginBtn").addEventListener("click", ()=>{
  var data = $('.sign-in-form').serializeArray().reduce(function(obj, item) {
      obj[item.name] = item.value;
      return obj;
  }, {});
  console.log(data);
  setCookie("thenullsoft", cpass, 5);
});


const sign_in_btn = document.querySelector("#loginBtn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

if (atob(reverseString(getCookie("thenullsoft"))).split(":#:")[2] == "register"){
  container.classList.add("sign-up-mode");
} else {
  container.classList.remove("sign-up-mode");
}


sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  let regperspective = atob(reverseString(getCookie("thenullsoft"))).split(':#:');
  regperspective[2] = "register";
  regperspective = reverseString(btoa(regperspective.join(":#:")));
  setCookie("thenullsoft", regperspective, 5);
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
  let logperspective = atob(reverseString(getCookie("thenullsoft"))).split(':#:');
  logperspective[2] = "login";
  logperspective = reverseString(btoa(logperspective.join(":#:")));
  setCookie("thenullsoft", logperspective, 5);
});

//auto login user
function autologin(userdet){
  userdet = atob(reverseString(userdet)).split(":#:");
  var data = {
    email: userdet[0],
    password: userdet[1]
  };
  if(userdet[0] != "new" || userdet[1] != "new"){
    $.ajax({
        url: 'autoauth.php',
        type: 'POST',
        data: data,

        success: function(result) {
            result = result.split(":#:");
            if(result[0] == "success"){
                window.location.href = "../index.php?Sessionid="+result[1];
            }
        }
    });
  }
}
//delete the cookie
//document.cookie = "thenullsoft=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

