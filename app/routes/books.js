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
  }
});
