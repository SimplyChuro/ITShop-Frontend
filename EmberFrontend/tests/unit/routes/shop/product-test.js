import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | shop/product', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:shop/product');
    assert.ok(route);
  });
});
