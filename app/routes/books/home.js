/* global App */
import Ember from 'ember';
import ENV from 'nvread-app/config/environment';
export default Ember.Route.extend({

  model(params) {
    return null;
    //return this.store.find('book',params);
  },

  setupController: function(controller, model) {

    //

     // Call _super for default behaviorcontroller
     this._super(controller, model);

   },
  afterModel() {
  },
  beforeModel(){
    App.__container__.lookup('controller:books').set('showWelcomeBackground',true);
  }
});
