# Config

There is only one config option present on `EmberTus` and that is the `url` parameter.

For this addon we set the url to the localhost/docker tusd daemon by default:

```
EmberTus: {
  url: "http://localhost:1080/files/"
}
```

And for production we set it to the public tusd master server:
```
  ENV.EmberTus.url = "https://master.tus.io/files/"
```
