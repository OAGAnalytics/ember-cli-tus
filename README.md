ember-tus
==============================================================================

An emberized wrapper for the tus.js client: https://github.com/tus/tus-js-client
Based on the tus.io protocol: https://tus.io/


Compatibility
------------------------------------------------------------------------------

* Ember.js 3.9


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-tus
```


Usage
------------------------------------------------------------------------------

Addon-Docs:
https://oaganalytics.github.io/ember-cli-tus/versions/master/

Just add the `tus` service to any route/controller/component and pass browser `File`
Objects to the `tus.addUpload` or `tus.startUpload` method.  Uploads are tracked on the
`tus.uploads` property.

```
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import config from 'ember-get-config';

export default class Index extends Controller {
  @service tus;

  @action
  uploadFile(e) {
    this.tus.startUpload(e.target.files[0]);
  }
}
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
