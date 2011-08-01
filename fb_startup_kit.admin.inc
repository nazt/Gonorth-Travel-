<?php

/**
  * Settings Form
  */
function facebook_startup_kit_settings_form() {
    $form['facebook_startup_kit_app_id'] = array(
      '#type' => 'textfield',
      '#title' => t('App id'),
      '#description' => t('Enter your app id'),
      '#default_value' => variable_get('facebook_startup_kit_app_id', 'null')
      );

    $form['facebook_startup_kit_app_api_key'] = array(
      '#type' => 'textfield',
      '#title' => t('API key'),
      '#description' => t('Enter your app api key'),
      '#default_value' => variable_get('facebook_startup_kit_app_api_key', 'null'),
    );

    $form['facebook_startup_kit_app_secret_key'] = array(
        '#type' => 'textfield',
        '#title' => t('Secret Key'),
        '#description' =>  t('Enter your secret key'),
        '#default_value' => variable_get('facebook_startup_kit_app_secret_key', 'null'),
    );


    $form['facebook_startup_kit_login_url'] = array(
        '#type' => 'textfiled',
        '#title' => t('login url'),
        '#description' => t('Enter login url and permission'),
        '#default_value' => variable_get('facebook_startup_kit_login_url', 'http://'),
      );

    $form['facebook_startup_kit_page_id'] = array(
        '#type' => 'textfield',
        '#title' => t('Page ID'),
        '#description' =>  t('Enter your secret key'),
        '#default_value' => variable_get('facebook_startup_kit_page_id', '153305968014537')
    );

    $form['facebook_startup_kit_redirect_to_page'] = array(
        '#type' => 'textfield',
        '#title' => t('Redirect URL'),
        '#description' => 'Enter target url (After login)',
        '#default_value' => variable_get('facebook_startup_kit_redirect_to_page', 'http://'),
    );

  return system_settings_form($form);
}
