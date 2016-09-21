import Ember from 'ember';
import ENV from 'nvread-app/config/environment';
export default Ember.Route.extend({

  afterModel: function() {

  },
  model(params) {
    return ENV;

  }

});
