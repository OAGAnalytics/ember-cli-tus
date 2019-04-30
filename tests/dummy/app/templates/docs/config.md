# Config


## url

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

## retryDelays

By default retryDelays is set to `[0, 3000, 5000, 10000, 20000]` but this can be
overwritten:

```
  ENV.EmberTus.retryDelays = [1000];
  
```
