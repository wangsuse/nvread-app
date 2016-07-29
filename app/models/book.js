import DS from 'ember-data';

export default DS.Model.extend({
  bookInfoId:       DS.attr('number'),
  category:     DS.attr('string'),
  bookTitle:       DS.attr('string'),
  url:    DS.attr('string'),
  summary:      DS.attr('string'),
  author:    DS.attr('string'),
  createdTime: DS.attr('string'),
  intro: DS.attr('string'),
  textBody:  DS.attr('string'),
  sectionTitle: DS.attr('string'),
  //imgsUrl: DS.attr('string'),
  likeCount : DS.attr('number'),
  machineScore : DS.attr('number'),
  creatorComments : DS.attr('number'),
});
