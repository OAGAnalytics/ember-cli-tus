/** @documenter yuidoc */
import { action, computed, set, setProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
import Tus from 'tus-js-client';
import config from 'ember-get-config';

/**
 * EmberTusUpload is a wrapper class for Tus.Upload.  It emberizes Tus.Upload.
 * @class EmberTusUpload
 * @public
 */
export default class EmberTusUpload {
  /**
    Has the Tus.Upload been started?
    @property isStarted
    @public
    @type {Boolean}
  */
  isStarted = false

  /**
    Has the Tus.Upload errored?
    @property isErrored
    @public
    @type {Boolean}
  */
  isErrored = false

  /**
    Has the Tus.Upload completed successfully?
    @property isSuccess
    @public
    @type {Boolean}
  */
  isSuccess = false

  /**
    The Tus.Upload is tracked here
    @property tusUpload
    @public
    @type {Tus.Upload}
  */
  tusUpload = null

  /**
    The Progress is is tracked here as a percentage
    @property tusUpload
    @public
    @type {Float}
  */
  progress = null

  /**
    The Error Message (if the upload errored)
    @property errorMessage
    @public
    @type {String}
  */
  errorMessage = null

  /**
    The Status
    @property status
    @public
    @type {String}
  */
  @computed('isStarted', 'isErrored', 'isSuccess')
  get status() {
    const { isStarted, isErrored, isSuccess } = this;

    if(isErrored) { return 'Error'; }
    if(isSuccess) { return 'Success'; }
    if(isStarted) { return 'In Progress'; }
    return 'Unknown';
  }

  @alias('tusUpload.file.name') fileName;
  @alias('tusUpload.file.size') fileSize;

  constructor(file) {
    if (!file) { return; }
    
    let tusUpload = new Tus.Upload(file, {
        endpoint: config.EmberTus.url,
        metadata: {
           filename: file.name,
           filetype: file.type
       },
        retryDelays: [0, 3000, 5000, 10000, 20000],
        onError: this._onError,
        onProgress: this._onProgress,
        onSuccess: this._onSuccess,
    });
    set(this, 'tusUpload', tusUpload);
  }

  @action
  _onError(errorMessage) {
    setProperties(this, {
      isErrored: true,
      errorMessage
    });
  }

  @action
  _onProgress(bytesUploaded, bytesTotal) {
    let progress = (bytesUploaded / bytesTotal * 100).toFixed(2)
    set(this, 'progress', progress);
  }

  @action
  _onSuccess() {
    set(this, 'isSuccess', true);
  }

  /**
    This method `start` the Tus.Upload
    @method start
    @public
    @return {EmberTusUpload}
   */
  start() {
    if (!this.tusUpload) { return }

    set(this, 'isStarted', true);
    this.tusUpload.start();
    return this;
  }
}
