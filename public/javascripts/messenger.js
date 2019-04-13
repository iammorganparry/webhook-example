/**
 *  This File initializes the Facebook SDK
 *  We then check on page load if the user is logged in.. if so the send to messneger button will display!
 * 
 * This is where we can display the login button if the user is not logged in! J
 * ust need to dynamically append it to the DOM
 */

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = function() {
      FB.init({
      appId      : '1251666588315299', // Replace with your APP ID
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
      })
  
      FB.AppEvents.logPageView()
      FB.getLoginStatus(function(response) {
      console.log(response)
      });
    }
      
function checkLoginState () {
  FB.getLoginStatus(function(response) {
    console.log(response)
    });
    }