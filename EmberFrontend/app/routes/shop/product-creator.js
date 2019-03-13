import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      categories: this.store.findAll('category', { reload: true })
    })
  },
 
  actions: { 
    willTransition: function() {
      this.controllerFor('shop/product-creator').send('clearFields');
    }
  }
});