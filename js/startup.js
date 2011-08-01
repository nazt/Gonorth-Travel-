function render_display() {

}

window.DEBUG = false;
window.fbAsyncInit = function() {
  FB.init({
    appId  : Drupal.settings.facebook_startup_kit.appid,
    status : true, // check login status
    cookie : true, // enable cookies to allow the server to access the session
    xfbml  : true  // parse XFBML
  });

}

//Ready!
$(function() {
    (function() {
      var fsk = Drupal.settings.facebook_startup_kit;
      (fsk.loginUrl != null) && (window.top.location = fsk.loginUrl);
    })();
});

