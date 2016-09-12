/* global App, $ */
import Ember from 'ember';
import ENV from 'nvread-app/config/environment';

export default Ember.Route.extend({
  queryParams: {
    filter: { refreshModel: true }
  },
  firstLoad : true,
  setupController: function setupController(controller, model) {

      console.log("in books route");
        // Call _super for default behaviorcontroller
        this._super(controller, model);
  },

  beforeModel(transition){
    if(this.firstLoad){
      this.firstLoad = false;
      return this.store.query('book',{ pageNumber: 1 });
    }
    return null;

  },
  model(params) {
    //return null;
    return this.store.peekAll('book');
    //
  },


  afterModel() {
    //Ember.run.schedule('afterRender', () => Ember.$('.app-sidebar').scrollTop(0) );
    //enable jquery tooltip
    Ember.$(document).tooltip({
      position: { my: "left center", at: "left+40px bottom" },
      show: null,
      tooltipClass: "custom-tooltip-styling",
      hide: { effect: "null"/*, duration: 1000,delay:1000000 */}
    });

  },
  bindScrollFlag : false,
  pageNumber: 1,
  actions: {
    refreshModel: function() {
       //display message in the console of your browser
       Ember.Logger.log('Route is now refreshing...');
      //refresh the model
       this.refresh();
    },
    didTransition: function() {
     if(!this.bindScrollFlag ){
       this.bindScrollFlag = true;
       var timeoutScroll = null;

       Ember.run.schedule('afterRender', () => {
           Ember.$(".app-sidebar").on('scroll', function() {
            clearTimeout(timeoutScroll);
            timeoutScroll=setTimeout(function(){
              var diff = Ember.$(".app-sidebar")[0].scrollHeight  - (Ember.$(".app-sidebar").scrollTop()+Ember.$(".app-sidebar").innerHeight());
              if(diff < 100){
                console.log("loading additional books");
                $(".app-main").mask("");
                var store = App.__container__.lookup('route:books').store;
                var pageNumber = store.peekAll('book').content.length/10 +1;
                pageNumber = Math.ceil(pageNumber);
                var newPromise = store.query('book',{ 'pageNumber': pageNumber });
                newPromise.then(function(value){
                  App.__container__.lookup('controller:books').send('refreshModel');
                  $(".app-main").unmask();
                //  var books = value;
                });
                //call book adaptor for additional books
              }
            },500);
         });

      });
     }
   }
 }
});
