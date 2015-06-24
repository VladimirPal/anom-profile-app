import $ from 'jquery';
let config = require('../config');

export default class Application {
  initialize() {
    $(document).ajaxError( (event, jqxhr, settings, thrownError) => {
      if ([401, 403].indexOf(jqxhr.status) !== -1) {
        window.location.replace('#/logout');
      }
    });

    this.setHeaders();

    $.ajaxPrefilter( ( options, originalOptions, jqXHR ) => {
      options.url = config.api.url + options.url;
      return (options);
    });
  }

  setHeaders() {
    let headers = {'X-Requested-With': 'XMLHttpRequest'};
    let token = window.localStorage.accessToken;
    if (token) {
      headers.Authorization = "JWT " + token;
    }
    $.ajaxSetup({
      headers: headers,
      contentType: 'application/json'
    });
  }
}
