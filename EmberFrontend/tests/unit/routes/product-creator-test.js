import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | product-creator', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:product-creator');
    assert.ok(route);
  });
});
