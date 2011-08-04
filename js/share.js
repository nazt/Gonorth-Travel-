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
        channelUrl  : 'http://gonorth-phase2.opendream.in.th/sites/all/static/page/fb_channel.php' // Custom Channel URL
      });
      FB.Canvas.setAutoResize(1000);
      FB.Canvas.scrollTo(0,0);

      var type = fsk.come_from_node_type.split("_")[1];
      var app_data = "app_data=" + type + ":" + fsk.come_from_node_nid;
      FB.ui(
        {
          method: 'feed',
          name: fsk.come_from_node_title || " ",
          link: fsk.tab_app_url + "&" + app_data,
          picture: 'http://gonorth-phase2.opendream.in.th/sites/all/themes/clean_profile/images/logo-passport-gonorth.png',
          caption: fsk.come_from_node_teaser || "",
          actions: { name: "สร้างสมุดบันทึการเดินทาง", link: fsk.tab_app_url }
          //description: 'Post to wall Type ' + type
        },
        function(response) {
          if (response && response.post_id) {

          }
          else {

          }
        }
      );
  }
});

var prepare_data_ui = function(to, category, cate_id) {
  var picture_path = 'http://vacation.opendream.in.th/sites/all/modules/custom/fb_util/images/cate-'+cate_id+'.png';
  var data_ui = {
      method: 'feed',
      name: 'ปิดเทอมสร้างสรรค์',
      link: 'http://www.happyschoolbreak.com/',
      picture: picture_path,
      caption: 'หมวดหมู่: '+ category,
      message: 'Enter your idea!',
      description: ' ',
      to: to
    };
  return data_ui;
}
