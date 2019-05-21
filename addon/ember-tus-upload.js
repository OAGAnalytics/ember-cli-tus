/** @documenter yuidoc */
import { action, computed, get, set, setProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
import Tus from 'tus-js-client';
import config from 'ember-get-config';
import RSVP from 'rsvp';
/**
 * EmberTusUpload is a wrapper class for Tus.Upload.  It emberizes Tus.Upload.
 * @class EmberTusUpload
 * @public
 */
export default class EmberTusUpload {
  /**
    Has the Tus.Upload been started?
    @property isUploading
    @public
    @type {Boolean}
  */
  isUploading = false

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
  @computed('isUploading', 'isErrored', 'isSuccess')
  get status() {
    const { isUploading, isErrored, isSuccess } = this;

    if (isErrored) { return 'Error'; }
    if (isSuccess) { return 'Success'; }
    if (isUploading) { return 'In Progress'; }
    return 'Not Started';
  }

  @alias('tusUpload.file.name') fileName;
  @alias('tusUpload.file.size') fileSize;

  /**
    The tusId
    @property tusId
    @public
    @type {String}
  */
  @computed('tusUpload.url')
  get tusId() {
    if (!this.isSuccess) { return null; }

    let url = get(this, 'tusUpload.url');
    //get the id off the end of the url
    return url.replace(/^.*\//, '');
  }

  /**
    This method creates a new EmberTusUpload
    @method constructor
    @public
    @param {File} file
    @param {Object} options
    @return {EmberTusUpload}
   */
  constructor(file, options) {
    if (!file) { return; }

    const TusUrl = get(config, 'ember-cli-tus.url');

    if (!TusUrl) { throw new Error('No url specified for tus server.'); }

    const RetryDelays = get(config, 'ember-cli-tus.retryDelays') || [0, 3000, 5000, 10000, 20000];

    const metadata = {
      filename: file.name,
      filetype: file.type
    };

    let tusUpload = new Tus.Upload(file, {
        endpoint: TusUrl,
        metadata: Object.assign(metadata, options.metadata),
        headers: options.headers || {},
        retryDelays: RetryDelays,
        onError: this._onError,
        onProgress: this._onProgress,
        onSuccess: this._onSuccess,
    });

    setProperties(this, {
      tusUpload,
      options
    });
  }

  @action
  _onError(errorMessage) {
    setProperties(this, {
      isUploading: false,
      isErrored: true,
      errorMessage
    });

    if (this.options.onerror) {
      this.options.onerror(errorMessage);
    }

    this.deferred.reject(errorMessage);
  }

  @action
  _onProgress(loaded, total) {
    let progress = (loaded / total * 100).toFixed(2)
    set(this, 'progress', progress);

    if (this.options.onprogress) {
      this.options.onprogress({ loaded, total, progress });
    }
  }

  @action
  _onSuccess() {
    setProperties(this, {
      isSuccess: true,
      isUploading: false
    });

    if (this.options.onsuccess) {
      this.options.onsuccess();
    }

    this.deferred.resolve(this);
  }

  /**
    This method starts the Tus.Upload
    @method start
    @public
    @return {Promise}
   */
  start() {
    if (!this.tusUpload) { return }

    const deferred = RSVP.defer();
    deferred.promise.cancel = this.abort.bind(this);

    setProperties(this, {
      isUploading: true,
      deferred
    });

    this.tusUpload.start();
    return this.deferred.promise;
  }

  /**
    This method aborts the Tus.Upload
    @method abort
    @public
    @return {EmberTusUpload}
   */
  abort() {
    if (!this.tusUpload) { return }

    set(this, 'isUploading', false);
    this.tusUpload.abort();
    this.deferred.reject('aborted');
    return this;
  }
}
