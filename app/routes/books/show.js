/* global App */
import Ember from 'ember';
import ENV from 'nvread-app/config/environment';
export default Ember.Route.extend({

  model(params) {
    return null;
    //return this.store.find('book',params);
  },

  setupController: function(controller, model) {

    App.__container__.lookup('controller:books').set('showWelcomeBackground',false);
    if(model.get("textBody") == null){
      Ember.$.ajax({
          type: 'POST',
          url: ENV.apiHost + '/onebook/book/getSingleBookInfo.form',
          dataType: 'json',

          data : {
            'bookInfoId' : model.get('bookInfoId')
          }
        }).then(function(data) {
          model.set("textBody", data.message.textBody.replace(/\n/g, '<br/>'));
        });
    }

     // Call _super for default behaviorcontroller
     this._super(controller, model);

   },
  afterModel() {
  }
});
