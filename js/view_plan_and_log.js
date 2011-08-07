jQuery(document).ready(function($) {
  //jQuery(".share-facebook").hide();
  var fsk = Drupal.settings.facebook_startup_kit;

  var doInterval = function() {
      try {
        if (!FB._inCanvas) {
          var fsk = Drupal.settings.facebook_startup_kit;
          var type = fsk.node.type.split("_")[1];
          var app_data = "app_data=" + type + ":" + fsk.node.nid;
          var url_to_page = fsk.tab_app_url + "&" + app_data;
          if(typeof(console) !== 'undefined' && console != null) {
            console.log('url_to_page', url_to_page);
          }
          window.top.location.href = url_to_page;
        }
        else {
         clearInterval(runningInterval);
        }
      }
      catch (exception) {
        console.log('error', exception);
      }
  }
  var runningInterval = setInterval(doInterval, 600);


});

window.fbAsyncInit = function() {
   FB.Canvas.setSize({height: 2000}); // Live in the past
    FB.init({
      appId  : fsk && fsk.appid || '246345852043389',
      status : true, // check login status
      cookie : true, // enable cookies to allow the server to access the session
      xfbml  : true,  // parse XFBML
      channelUrl  : 'http://www.gonorththailand.com/sites/all/static/page/fb_channel.php' // Custom Channel URL
    });
    FB.Canvas.setAutoResize(1000);
    FB.Canvas.scrollTo(0,0);
}

jQuery(".share-facebook").live('click', function(e) {
  e.preventDefault();
  var self = $(this);
  var data_ui = prepare_view_data_ui();
  var ui_callback = function(response) {
      if (response && response.post_id) { } else { }
  }
  FB.ui(data_ui, ui_callback);
});

var prepare_view_data_ui = function(to, category, cate_id) {
  var fsk = Drupal.settings.facebook_startup_kit;
  var type = fsk.node.type.split("_")[1];
  var app_data = "app_data=" + type + ":" + fsk.node.nid;
  data_ui = {
          method: 'feed',
          name: fsk.node.title || " ",
          link: fsk.tab_app_url + "&" + app_data,
          picture: 'http://www.gonorththailand.com/sites/all/themes/clean_profile/images/logo-passport-gonorth.png',
          caption: fsk.node.teaser || "",
          actions: { name: "สร้างสมุดบันทึนักเดินทาง", link: fsk.tab_app_url }
          //description: 'Post to wall Type ' + type
        };
  return data_ui;
}

