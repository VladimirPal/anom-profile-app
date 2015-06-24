import React from 'react';
import Router from '../common/router';

import authCheck from '../common/auth-check';

import loginPage from './login/component';
import profilesPage from './profiles/component';

import SidebarActions from './base/sidebar/actions';

export default Router.extend({
  routes: {
    "":                     "profilesPageRoute",
    "profiles":             "profilesPageRoute",
    "login":                "loginPageRoute",
    "logout":               "logoutPageRoute"
  },

  loginPageRoute() {
    App.appRoot.setProps({layout: loginPage()});
  },

  logoutPageRoute() {
    window.localStorage.removeItem('accessToken');
    window.location.replace('#/login');
  },

  profilesPageRoute() {
    if (authCheck()) {
      App.appRoot.setProps({layout: profilesPage("profiles")});
    }
  }
});
