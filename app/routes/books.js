/* global App, $ */
import Ember from 'ember';
import ENV from 'nvread-app/config/environment';

export default Ember.Route.extend({
  queryParams: {
    filter: { refreshModel: true }
  },
  firstLoadEverydayReading : true,
  firstLoadMostPopularBooks :true,

  setupController: function setupController(controller, model) {

      console.log("in books route");
        // Call _super for default behaviorcontroller
        this._super(controller, model);
  },

  beforeModel(transition){
    var filter = this.paramsFor("books").filter;

    App.__container__.lookup('controller:books').set('showWelcomeBackground',true);
    switch(filter) {
        case "everydayReading":
            if(this.firstLoadEverydayReading){
                App.__container__.lookup('controller:books').set('everydayReading',true);
                App.__container__.lookup('controller:books').set('mostPopularBooks',false);
                this.firstLoadEverydayReading = false;
                return this.store.query('book',{ pageNumber: 1 });
            }
            break;
        case "mostPopularBooks":
            if(this.firstLoadMostPopularBooks){
                App.__container__.lookup('controller:books').set('mostPopularBooks',true);
                App.__container__.lookup('controller:books').set('everydayReading',false);
                this.firstLoadMostPopularBooks = false;
                var store = this.store;
                store.query('popularbook',{ pageNumber: 1}).then(function(value){
                   return store.query('popularbook',{ pageNumber: 2});
                });
            }
            break;
        default:
            break;
    }
    return null;

  },
  model(params) {
    //return null;
    switch(params.filter){
      case "everydayReading":
          return this.store.peekAll('book');
          //break;
      case "mostPopularBooks":
          return this.store.peekAll('popularbook');
          //break;
      default:
          break;
    }

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
  //bindScrollFlag : false,
  pageNumber: 1,
  actions: {
    refreshModel: function() {
       //display message in the console of your browser
       Ember.Logger.log('Route is now refreshing...');
      //refresh the model
       this.refresh();
    },
    didTransition: function() {
    // if(!this.bindScrollFlag ){
    //   this.bindScrollFlag = true;
       var timeoutScroll = null;
       var filter = this.paramsFor("books").filter;
       Ember.run.schedule('afterRender', () => {
           Ember.$(".app-sidebar").unbind("scroll");
           Ember.$(".app-sidebar").on('scroll', function() {
            clearTimeout(timeoutScroll);
            timeoutScroll=setTimeout(function(){
              var diff = Ember.$(".app-sidebar")[0].scrollHeight  - (Ember.$(".app-sidebar").scrollTop()+Ember.$(".app-sidebar").innerHeight());
              if(diff < 100){
                console.log("loading additional books");
                $(".app-main").mask("");
                var store = App.__container__.lookup('route:books').store;
                //check with store
                var pageNumber =null;
                var newPromise =null;
                switch(filter) {
                    case "everydayReading":
                        pageNumber = store.peekAll('book').content.length/10 +1;
                        pageNumber = Math.ceil(pageNumber);
                        newPromise = store.query('book',{ 'pageNumber': pageNumber });
                        newPromise.then(function(value){
                          App.__container__.lookup('controller:books').send('refreshModel');
                          $(".app-main").unmask();
                        //  var books = value;
                        });
                        break;
                    case "mostPopularBooks":
                        pageNumber = store.peekAll('popularbook').content.length/5 +1;
                        pageNumber = Math.ceil(pageNumber);
                        newPromise = store.query('popularbook',{ 'pageNumber': pageNumber });
                        newPromise.then(function(value){
                          App.__container__.lookup('controller:books').send('refreshModel');
                          $(".app-main").unmask();
                        //  var books = value;
                        });
                        break;
                    default:
                        break;
                }


                //call book adaptor for additional books
              }
            },500);
         });

      });
     //}
   }
 }
});
