import Ember from 'ember';

export default Ember.Controller.extend({
  showingNavBar: false,

  actions: {
    toggleNavBar: function() {
      this.toggleProperty('showingNavBar');
      this.transitionToRoute('books.home');
    },

    hideNavBar : function(){
      this.set('showingNavBar', false) ;
    }

  }
});
