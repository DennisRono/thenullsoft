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
cpass = reverseString(cpass)
document.getElementById("loginBtn").addEventListener("click", ()=>{
  var data = $('#logform').serializeArray().reduce(function(obj, item) {
      obj[item.name] = item.value;
      return obj;
  }, {});
  setCookie("thenullsoft", cpass, 5); 
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
              console.log("login succesful");
                window.location.href = "../index.html?Sessionid="+result[1];
            }
        }
    });
  }
}
//delete the cookie
//document.cookie = "thenullsoft=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

