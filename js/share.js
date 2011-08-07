jQuery(document).ready(function($) {
  $.facebox.settings.closeImage = '/sites/all/modules/gonorth/facebook_startup_kit/js/facebox-src/images/closelabel.png';
  $.facebox.settings.loadingImage = '/sites/all/modules/gonorth/facebook_startup_kit/js/facebox-src/images/loading.gif';

  //$('.share-node').facebox();
  //$('.share-node').trigger('click');

  var fsk = Drupal.settings.facebook_startup_kit;
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
      //FB.Canvas.scrollTo(0,0);
      var data_ui = prepare_data_ui();
      var ui_callback = function(response) {
          if (response && response.post_id) { } else { }
      }
      FB.ui(data_ui, ui_callback);
  }
});

var prepare_data_ui = function(to, category, cate_id) {
  var fsk = Drupal.settings.facebook_startup_kit;
  var type = fsk.come_from_node_type.split("_")[1];
  var app_data = "app_data=" + type + ":" + fsk.come_from_node_nid;
  fsk.tab_app_url = typeof fsk.tab_app_url == "object" ? fsk.tab_app_url[0] : fsk.tab_app_url;
  data_ui = {
          method: 'feed',
          name: fsk.come_from_node_title || " ",
          link: fsk.tab_app_url + "&" + app_data,
          picture: 'http://www.gonorththailand.com/sites/all/themes/clean_profile/images/logo-passport-gonorth.png',
          caption: fsk.come_from_node_teaser || "",
          actions: { name: "สร้างสมุดบันทึนักเดินทาง", link: fsk.tab_app_url }
          //description: 'Post to wall Type ' + type
        };
  return data_ui;
}
