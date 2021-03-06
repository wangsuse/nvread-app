/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'nvread-app',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    apiHost: '',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    moment: {
     includeLocales: true
    },
    'ember-index': {
       output: 'index.jsp',
       content: [{
         key: '1',
         file: 'example1.txt',
         includeInIndexHtml: true,
         includeInOutput: false
       },{
         key: '2',
         file: 'example2.txt',
         includeInIndexHtml: false,
         includeInOutput: true
       }]
     }
  };


  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
     ENV.APP.LOG_ACTIVE_GENERATION = true;
     ENV.APP.LOG_TRANSITIONS = true;
     ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
     ENV.APP.LOG_VIEW_LOOKUPS = true;
     ENV.apiHost =  'http://localhost:8080';
     ENV.rootURL =  '/onebook/app/dist/';
     ENV.baseURL =  '/onebook/app/dist/';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }
  ENV.i18n = {
    defaultLocale: 'cn'
  };
  if (environment === 'production') {
    ENV.apiHost =  '';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.rootURL =  '/onebook/app/dist/';
    ENV.baseURL =  '/onebook/app/dist/';
  }

  return ENV;
};
