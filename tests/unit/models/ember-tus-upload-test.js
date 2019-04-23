import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberTusUpload from 'ember-cli-tus/models/ember-tus-upload';

module('Unit | Model | ember-tus-upload', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let model = new EmberTusUpload;
    assert.ok(model);
  });
});
