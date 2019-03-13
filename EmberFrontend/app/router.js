import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('error', {path: '/*wildcard'});
  this.route('home');
  this.route('shop', function() {
    this.route('product', { path: 'product/:product_id' });
    this.route('product-cashier', { path: 'product-cashier/:product_id' });
    this.route('product-list');
    this.route('product-creator');
  });
  this.route('about');
  this.route('privacy-and-policy');
  this.route('terms-and-conditions');
});

export default Router;
