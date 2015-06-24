let config = {api: {}};

let production = false;

if (production) {
  config.api.url = 'http://127.0.0.1:8000';
} else{
  config.api.url = 'http://127.0.0.1:8000';
}

module.exports = config;
