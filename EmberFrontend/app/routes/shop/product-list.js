import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model(){
    return hash({
      categoryList: this.store.findAll('category')
    })
  },

  actions: {
    willTransition: function() {
      this.controllerFor('shop/product-list').send('clearFields');
    }
  }
});