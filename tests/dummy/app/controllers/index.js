// BEGIN-SNIPPET tus-controller.js

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import config from 'ember-get-config';

export default class Index extends Controller {
  @service tus;

  get tusUrl() {
    return config.EmberTus.url;
  }

  @action
  uploadFile(emberFileUpload) {
    this.tus.startNewEmberFileUpload(emberFileUpload);
  }
}
// END-SNIPPET
