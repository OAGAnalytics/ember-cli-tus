/** @documenter yuidoc */

import Service from '@ember/service';
import { A } from '@ember/array';
import EmberTusUpload from '../models/ember-tus-upload';

/**
 * this is a service to create and track EmberTusUploads.
  @class TusService
  @public
  @extends Ember Service
*/
export default class TusService extends Service {
  /**
    The uploads array tracks all created EmberTusUploads
    @property uploads
    @public
    @type {Array}
  */
  uploads = A();

  /**
    Add a new  EmberTusUpload file to the uploads array
    @method addUpload
    @public
    @param file {File}
    @return {EmberTusUpload}
  */
  addUpload(file) {
    const upload = new EmberTusUpload(file);

    this.uploads.pushObject(upload);

    return upload;
  }

  /**
    This method creates and starts new EmberTusUpload and adds it to the `uploads` array on this service
    @method startUpload
    @public
    @param file {File}
    @return {EmberTusUpload}
  */
  startUpload(file) {
    const upload = this.addUpload(file);
    return upload.start();
  }

}
