import Ember from 'ember';

export default Ember.Helper.helper(function([param, ...rest]) {
  return Ember.String.htmlSafe(`${param}`);
});
