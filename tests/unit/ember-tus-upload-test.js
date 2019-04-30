import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberTusUpload from 'ember-cli-tus/ember-tus-upload';

module('Unit | ember-tus-upload', function(hooks) {
  setupTest(hooks);

  test('it sets up a tus object', function(assert) {
    let model = new EmberTusUpload({ name: 'test.zip', size: 1000, type: 'zip'});
    assert.equal(model.status, 'Not Started');
    assert.equal(model.fileName, 'test.zip');
    assert.equal(model.fileSize, 1000);
  });
});
