import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    filter: { refreshModel: true }
  },

  model(params) {
    //return null;
    return this.store.findAll('book',params);
  },

  afterModel() {
    Ember.run.schedule('afterRender', () => Ember.$('.app-sidebar').scrollTop(0) );
    //enable jquery tooltip
    Ember.$(document).tooltip({
      position: { my: "left center", at: "left+40px bottom" },
      show: null,
      tooltipClass: "custom-tooltip-styling",
      hide: { effect: "null"/*, duration: 1000,delay:1000000 */}
    });
      /*Ember.$( ".app-nav" ).tooltip({

        show: null,
        tooltipClass: "custom-tooltip-styling",
        hide: { effect: "null", duration: 1000,delay:1000000 }
    });*/
  }
});
