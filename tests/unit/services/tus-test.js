import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | tus', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:tus');
    assert.ok(service);
  });

  test('it sets up a tus object', function(assert) {
    let service = this.owner.lookup('service:tus');
    service.addUpload({ name: 'test.zip', size: 1000, type: 'zip'});

    assert.equal(service.uploads.length, 1);
    assert.equal(service.uploads[0].fileName, 'test.zip');
  });
});
