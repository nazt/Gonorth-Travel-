function render_display() {

}

window.DEBUG = false;
window.fbAsyncInit = function() {
  FB.init({
    appId  : Drupal.settings.facebook_startup_kit.appid,
    status : true, // check login status
    cookie : true, // enable cookies to allow the server to access the session
    xfbml  : true,  // parse XFBML
    channelUrl  : 'http://www.gonorththailand.com/sites/all/static/page/fb_channel.php' // Custom Channel URL
  });
}

//Ready!
$(function() {
    var doInterval = function() {
      try {
        if (FB._inCanvas) {
          // canvas iframe
          if (!FB.Canvas.isTabIframe()) {
            top.window.location.href = Drupal.settings.facebook_startup_kit.tab_app_url || "http://www.facebook.com/GoNorthThailand?sk=app_246345852043389";
          }
          // tab iframe
          else {

          }
          //finally do.
          if(typeof(console) !== 'undefined' && console != null) {
            console.log('clear Interval');
          }
          //finally do.
          clearInterval(runningInterval);
        }
        // not in canvas.
        else {

        }
      }
      catch (exception) {
        if(typeof(console) !== 'undefined' && console != null) {
          console.log('error', exception);
        }
      }
}
    runningInterval = setInterval(doInterval, 1000);

    (function() {
      var fsk = Drupal.settings.facebook_startup_kit;
      (fsk.loginUrl != null) && (window.top.location = fsk.loginUrl);
    })();
    hide_warning();
});

function hide_warning() {
  var special_length = jQuery('.messages.error li:contains("htmlspecialchars")').hide().length;
  var warning_length = jQuery('.messages.error li').length;
  if (special_length == warning_length) {
   jQuery('.messages.error').hide();
  }
}


jQuery(".share-facebook").live('click', function(e) {
  e.preventDefault();
  var self = $(this);
  display_share_ui();
});

var display_share_ui = function(to, category, cate_id) {
  var fsk = Drupal.settings.facebook_startup_kit;
  var app_data = "app_data=" + 'uid' + ":" + FB.getSession().uid;
  //setTimeout(function() { FB.Canvas.scrollTo(0, 0); }, 350);
  FB.api('/me', function(res) {
    fsk.tab_app_url = typeof fsk.tab_app_url == "object" ? fsk.tab_app_url[0] : fsk.tab_app_url ;
    data_ui = {
            method: 'feed',
            name: fsk.node.title || "สมุดบึกทึกนักเดินทาง",
            link: fsk.tab_app_url + "&" + app_data,
            picture: 'http://www.gonorththailand.com/sites/all/themes/clean_profile/images/logo-passport-gonorth.png',
            caption: "สมุดบันทึกการเดินทางของ " + res.name,
            actions: { name: "สร้างสมุดบันทึนักเดินทาง", link: fsk.tab_app_url }
            //description: 'Post to wall Type ' + type
          };
          var ui_callback = function(response) {
              if (response && response.post_id) { } else { }
              //FB.Canvas.scrollTo(0, 900);
          }
          FB.ui(data_ui, ui_callback);
  });
}

