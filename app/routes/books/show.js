import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return null;
    //return this.store.find('book',params);
  },
  setupController: function(controller, model) {

    if(model.get("textBody") == null){
      model.set("textBody", "aaaaaaaaaaaaaaa");
    }

     // Call _super for default behavior
     this._super(controller, model);

   },
  afterModel() {
  }
});
