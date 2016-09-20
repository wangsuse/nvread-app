import Ember from 'ember';

export default Ember.Helper.helper(function([param, ...rest]) {
  var res = Ember.String.htmlSafe(`${param}`);

  return res == "null" ? ""  : res;
});
