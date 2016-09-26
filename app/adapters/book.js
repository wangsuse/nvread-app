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
  find(store, type, id) {
    return new Ember.RSVP.Promise( (resolve, reject) => {

      var xhr = new XMLHttpRequest();

      xhr.open("POST", this.buildUrl(`item?id=${id}`), true);
      xhr.responseType = "document";

      var parent;

      xhr.onload = () => {
        if (isError(xhr.response)) {
          Ember.run(null, reject, "Not found");
        } else if(parent = parentID(xhr.response)) {
          Ember.run(null, resolve, this.find(store, type, parent));
        } else {
          Ember.run(null, resolve, xhr.response);
        }
      };

      xhr.onerror = () => Ember.run(null, reject, xhr.statusText);

      xhr.send();

    });
  },
  findPagedRecommendations (store , type, query = {} ){

    return new Ember.RSVP.Promise( (resolve, reject) => {
        Ember.$.ajax({
            type: 'POST',
            url: this.urlForQuery(query),
            dataType: 'json',
            crossDomain: true,
            data : {
              pageNumber : query.pageNumber == null ? 1 : query.pageNumber
            }
          }).then(function(data) {
            console.log(data);
            var message = data.message;
            var books = [];
            for( var i = 0 ; i< message.length ; i++){
              var temp = {};
              temp.id = message[i].bookInfo.bookInfoId;
              temp.bookInfoId = message[i].bookInfo.bookInfoId;
              temp.bookTitle = message[i].bookInfo.bookTitle;
              temp.summary = message[i].bookInfo.summary;
              temp.author = message[i].bookInfo.author;
              temp.intro = message[i].bookInfo.intro ? (message[i].bookInfo.intro.length > 36 ? message[i].bookInfo.intro.substring(0,36)+'...' : message[i].bookInfo.intro) : null;
              temp.sectionTitle = message[i].bookInfo.sectionTitle;
              temp.url = message[i].bookInfo.imgsUrl != null ? message[i].bookInfo.imgsUrl[0]:null;
              temp.textBody = message[i].bookInfo.textBody;
              temp.recommendedDate = message[i].recommendedDate*1000;
              //imgsUrl: DS.attr('string'),
              //likeCount : DS.attr('number'),
              //machineScore : DS.attr('number'),
              //creatorComments : DS.attr('number'),
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

    return this.findPagedRecommendations(store, type, query);
  },

  findQuery(store, type, query = {}) {

  },

  urlForQuery({ filter, page }) {
    var url;

    filter = filter || "latest";

    switch (filter) {
      case "front-page":
        url = "news";
        break;

      case "latest":
        url = "/onebook/book/getMultipleRecommendationBook.form";
        break;

      case "active":
        url = "active";
        break;

      case "show-hn":
        url = "show";
        break;

      case "ask-hn":
        url = "ask";
        break;

      case "jobs":
        url = "jobs";
        break;

      default:
        throw "Unknown filter: " + filter;
    }

    if (page && filter === "latest") {
      url += `?next=${ encodeURIComponent(page) }`;
    } else if (page) {
      url += `?p=${ encodeURIComponent(page) }`;
    }

    return this.buildUrl(url);
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
