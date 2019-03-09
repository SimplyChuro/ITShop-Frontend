import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
    return hash({
      product: this.store.findRecord('product', params.product_id)
    })
  },

  actions: {
    willTransition: function() {
      this.controllerFor('shop/product-cashier').send('clearFields');
    }
  }
});