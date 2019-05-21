/** @documenter yuidoc */

import Service from '@ember/service';
import { A } from '@ember/array';
import { set, setProperties } from '@ember/object';
import EmberTusUpload from '../ember-tus-upload';

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
    @method createUpload
    @public
    @param file {File}
    @return {EmberTusUpload}
  */
  createUpload(file, options) {
    const upload = new EmberTusUpload(file, options);

    this.uploads.pushObject(upload);

    return upload;
  }

  /**
    This method creates and starts new EmberTusUpload and adds it to the `uploads` array on this service
    @method startNewUpload
    @public
    @param file {File}
    @return {Promise}
  */
  startNewUpload(file, options) {
    const upload = this.createUpload(file, options);
    return upload.start();
  }

  /**
    This method creates and starts new EmberTusUpload from an EmberFileUpload file and adds it to the `uploads` array on this service

    @method startNewEmberFileUpload
    @public
    @param file {EmberFileUpload.File}
    @param options {Object}
    @return {Promise}
  */
  startNewEmberFileUpload(emberFileUpload, options={}) {

    const callbacks = {
      onprogress(evt) {
        setProperties(emberFileUpload, {
          loaded: evt.loaded,
          size: evt.total,
          progress: evt.progress
        });
      },
      onerror() {
        set(emberFileUpload, 'state', 'failed');
      },
      onsuccess() {
        set(emberFileUpload, 'state', 'uploaded');
      }
    }
    
    set(emberFileUpload, 'state', 'uploading');
    return this.startNewUpload(emberFileUpload.blob, Object.assign(options, callbacks));
  }

}
