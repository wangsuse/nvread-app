import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType

});

Router.map(function() {
  this.route('about');
  this.route('todo');
  this.resource("books", function() {
    this.route("show", { path: "/show/:book_id" });
    this.route("home");

  });



});

export default Router;
