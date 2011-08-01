<?php
function start_page() {
  session_start();
  header('P3P: CP="NOI ADM DEV COM NAV OUR STP"');
  require_once(drupal_get_path('module', 'fb_startup_kit') . '/lib/php-sdk/src/facebook.php');
  $css_path = drupal_get_path('module', 'fb_startup_kit') . '/css/custom_style.css';
  $js_path  = drupal_get_path('module', 'fb_startup_kit') . '/js/startup.js';
  $js_date_format= drupal_get_path('module', 'fb_startup_kit') . '/js/date.format.minified.js';

  drupal_add_css($css_path);
  drupal_add_js($js_path);
  drupal_set_title(t('สมุดบันทึกนักเดินทาง'));


  $api_key = variable_get('facebook_startup_kit_app_api_key', '');
  $secret_key = variable_get('facebook_startup_kit_app_secret_key', '');
  $app_id = variable_get('facebook_startup_kit_app_id', '');
  $page_id = variable_get('facebook_startup_kit_page_id', '');


  // Create our Application instance (replace this with your appId and secret).
  $facebook = new Facebook(array(
    'appId'  => $app_id,
    'secret' => $secret_key,
  ));

  // Get User ID
  $fb_user = $facebook->getUser();

  // Login or logout url will be needed depending on current user state.
  if ($fb_user) {
    try {
      // Proceed knowing you have a logged in user who's authenticated.
      $_SESSION['fb_access_token'] = $facebook->getAccessToken();
      $user_profile = $facebook->api('/me');
    } catch (FacebookApiException $e) {
      error_log($e);
      $fb_user = null;
    }

    /**
     * Roles 5 = facebook
     */
    $account = array(
            'name' => $user_profile[id],
            'mail' => $user_profile[email],
            'profile_facebook_name' => $user_profile[name],
            'timezone' => variable_get('date_default_timezone', NULL),
            'pass' => md5(md5(time()). print_r($user_profile, 1)) ,
            'init' => $user_profile[email],
            'roles' => array(5 => 'facebook'),
            'status' => 1
          );

    global $user;
    $c = user_load(array('name' => $user_profile['id']));
    if($c == null) {
      $user = user_save('', $account);
    }
    else {
      $user = $c;
    }
    $logoutUrl = $facebook->getLogoutUrl();
  }
  else {
    $redirect_url = variable_get('facebook_startup_kit_redirect_to_page', 'null');
    $loginUrl = $facebook->getLoginUrl(array('scope' => 'email, read_stream', 'redirect_uri' => $redirect_url));
  }

  $fb_kit_data = array('apikey' => $api_key,
                       'appid' => $app_id,
                       'pageid' => $page_id,
                       'loginUrl' => $loginUrl,
                       'logoutUrl' => $logoutUrl,
                       'user' => $fb_user,
                       'uid' => $user->uid,
                      );
  $fb_kit_settings = array('facebook_startup_kit' => $fb_kit_data);
  drupal_add_js($fb_kit_settings, 'setting');

  $signed_request = $facebook->getSignedRequest();
  drupal_set_message('signed--'. print_r($signed_request, 1). '/signed');
  $app_data = $signed_request['app_data'];

  /**
   * Change $_GET['q'] if got app_data from tab apps
   */
  if (arg(2) == null) {
    global $user;
    drupal_goto('facebook/profile/u/' . $user->name);
  }
  else {

  }
  if ($app_data) {
    $data = explode(':', $app_data);
    if ($data[0] == 'uid') {
     // $_GET['q'] = 'facebook/profile/u/'. $data[1];
     drupal_goto('facebook/profile/u/'. $data[1]);
    }
    drupal_set_message(print_r($data, 1));
  }

  $come_from = $_SESSION['gonorth_profile_come_from'] += 1;
  drupal_set_message($_SESSION['gonorth_profile_come_from']);
  drupal_set_message($_SESSION['gonorth_profile_node_nid']);
  drupal_set_message($app_data);
  // hard code -99 is mean come from hook_nodeapi insert content type travel_log
  drupal_add_js(
    array('facebook_startup_kit' =>
      array('come_from' => $_SESSION['gonorth_profile_come_from'])
    ),
    'setting');
  if ($come_from == -99) {
    drupal_add_js(
      array('facebook_startup_kit' =>
        array('come_from_node_nid' => $_SESSION['gonorth_profile_node_nid'])
      ),
      'setting');
  }

  /**
   * GET Facebook UID from argument or drupal user
   *
   */
  $fb_uid = arg(3);
  if ($fb_uid == null) {
    GLOBAL $user;
    $fb_uid = $user->name;
  }
  drupal_add_js(array('facebook_startup_kit' => array('viewing_uid' => $fb_uid)), 'setting');

  /**
   * Check Profile and redirect if empty profile
   */
  $uid = $user->name;
  $have_profile = content_profile_load('content_profile', $user->uid);
  if ($have_profile == false && $uid) {
    drupal_set_title('กรอกข้อมูลส่วนตัว');
    drupal_goto('facebook/profile/edit', 'destination=facebook/profile');
  }
  /**
   * Print out facebook tag
   */
  $output = <<<FBJS
    <div id="fb-root"></div>
    <p class='loading' id='prepare-page'>กรุณารอสักครู่</p>
FBJS;
  return $output;
}

