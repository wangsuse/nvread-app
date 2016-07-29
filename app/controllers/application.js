import Ember from 'ember';

export default Ember.Controller.extend({
  showingNavBar: false,

  actions: {
    toggleNavBar: function() {
      this.toggleProperty('showingNavBar');
    },

    hideNavBar : function(){
      this.set('showingNavBar', false) ;
    }

  }
});
