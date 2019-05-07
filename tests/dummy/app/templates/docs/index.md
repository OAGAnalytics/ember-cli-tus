# Ember-Cli-Tus

`ember install ember-cli-tus`

Ember-Cli-Tus is a wrapper for [Tus-Js-Client](https://github.com/tus/tus-js-client) which implements the [Tus](http://tus.io) protocol for resumable uploads over http.  

For local development you can pull down the tusd docker image by running `yarn tusd:pull` and `yarn tusd:start`.

```
  "tusd:pull": "docker pull tusproject/tusd",
  "tusd:start": " docker run -p 1080:1080 -v $(pwd)/tus-uploads:/srv/tusd-data/data tusproject/tusd"
```

Ember-tus includes the ability to wrap `Ember-File-Upload:Files`.  Instead of using
`Ember-File-Upload:File.{upload|uploadBinary}` use the [`startNewEmberFileUpload` method]( docs/api/services/tus#startNewEmberFileUpload) on the `tus` service instead.

Ember-Tus is built and maintained by [OAG Analytics](https://www.oaganalytics.com/)
