import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  surname: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),  
  admin: DS.attr('boolean')
});
