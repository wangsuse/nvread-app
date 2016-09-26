import Ember from 'ember';
import DS from 'ember-data';
import config from 'nvread-app/config/environment';
import { isError, parentID } from 'nvread-app/extractors/book';
import ENV from 'nvread-app/config/environment';
export default DS.Adapter.extend({
  //proxy: config.APP.HACKERNEWS_CORS_PROXY,
  //host: config.APP.HACKERNEWS_HOST,
  proxy: null,
  host:  ENV.apiHost,

  findHighestReadBooks (store , type, query = {} ){

    return new Ember.RSVP.Promise( (resolve, reject) => {
        Ember.$.ajax({
            type: 'POST',
            url: this.host+"/onebook/book/getHighestReadBooks.form",
            dataType: 'json',
            crossDomain: true,
            data : {
              pageNumber : query.pageNumber == null ? 0 : query.pageNumber
            }
          }).then(function(data) {
            console.log(data);
            var message = data.message;
            var books = [];
            for( var i = 0 ; i< message.length ; i++){
              var temp = {};
              temp.id = message[i].bookInfoId;
              temp.bookInfoId = message[i].bookInfoId;
              temp.bookTitle = message[i].bookTitle;
              temp.summary = message[i].summary;
              temp.author = message[i].author;
              temp.intro = message[i].intro ? (message[i].intro.length > 36 ? message[i].intro.substring(0,36)+'...' : message[i].intro) : null;
              temp.sectionTitle = message[i].sectionTitle;
              temp.url = message[i].imgsUrl != null ? message[i].imgsUrl[0]:null;
              temp.textBody = message[i].textBody;
              //temp.recommendedDate = message[i].recommendedDate*1000;
              books.push(temp);
            }
            Ember.run(null, resolve, books);
          }, function(jqXHR) {
            console.log(jqXHR);
            jqXHR.then = null; // tame jQuery's ill mannered promises
            Ember.run(null, reject, jqXHR);
          });
        });
  },
  query(store, type, query, recordArray) {
    return this.findHighestReadBooks(store, type, query);
  },

  buildUrl(path) {
    var parts = [];

    if (this.get("proxy")) {
      parts.push( this.get("proxy").replace(/\/$/, "") );
    }

    if (this.get("host")) {
      parts.push( this.get("host").replace(/\/$/, "") );
    }

    if (!parts.length) {
      parts.push("");
    }

    parts.push(path);

    return parts.join("/");
  },

});
