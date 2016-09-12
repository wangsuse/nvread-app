import Ember from 'ember';

export default Ember.Route.extend({
  i18n: Ember.inject.service(),
  moment: Ember.inject.service(),
  beforeModel() {
     this.get('moment').changeLocale('zh-cn');
  },
  afterModel: function() {
    this.transitionTo('books');
  },
  model(params) {
    //return null;
    return {
      title:{
        Daily:{
          Recommendation :this.get('i18n').t('Daily.Recommendation')
        },
        Most:{
          PopularBooks : this.get('i18n').t('Most.PopularBooks')
        },
        Books:{
          YouMayLike : this.get('i18n').t('Books.YouMayLike')
        },
        User:{
          Account : this.get('i18n').t('User.Account')
        },
        About:{
          Us: this.get('i18n').t('About.Us')
        },
        System:{
          Settings: this.get('i18n').t('System.Settings')
        }
      }
    };
  },
});
