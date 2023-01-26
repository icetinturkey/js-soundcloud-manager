# ![Image](https://download.vadi.info/scmanager0.png)

SCManager.js is a JavaScript library that getting playlist datas.

With this library you can develop your own custom playlist widgets. SCManager.js also support proxies. This way you can develop in your local sessions.

## CDN

Normal version:

```
https://cdn.jsdelivr.net/gh/icetinturkey/js-soundcloud-manager/dist/scmanager.js
```

Minified version:

```
https://cdn.jsdelivr.net/gh/icetinturkey/js-soundcloud-manager/dist/scmanager.js
```

## Functions

Here are the functions you can use and the data they can retrieve.

- **getList**: Returns all playlist data. The return value is a Promise. The data it can get is `scmanager object`\*required and `sort name`.
- **getTrack**: It will return you a playable version of the link you provided. The return value is a Promise. The data it can get is `scmanager object`\*required and `track url`\*required.
- **getMeta**: Returns some of the data of the playlist you connected to. The return value is a Object array and should be used after getList method. The data it can get is `scmanager object`\*required.
