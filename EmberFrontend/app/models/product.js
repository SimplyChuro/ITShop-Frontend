import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  brand: DS.attr('string'),
  description: DS.attr('string'),
  price: DS.attr('number'),
  category_id: DS.attr('number'),
  pictures: DS.hasMany('picture'),
  productcategory: DS.hasMany('productcategory'),

});
