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
https://cdn.jsdelivr.net/gh/icetinturkey/js-soundcloud-manager/dist/scmanager.min.js
```

## Functions

Here are the functions you can use and the data they can retrieve.

- **getList**: Returns all playlist data. The return value is a Promise. The data it can get is `scmanager object`\*required and `sort name`.
- **getTrack**: It will return you a playable version of the link you provided. The return value is a Promise. The data it can get is `scmanager object`\*required and `track url`\*required.
- **getMeta**: Returns some of the data of the playlist you connected to. The return value is a Object array and should be used after getList method. The data it can get is `scmanager object`\*required.

## Getting started

First we need to create an object:

```html
<script>
import("./scmanager.js").then(({default: SCManager, getList, getTrack, getMeta}) => {
	const scdownloader = new SCManager({Playlist Id},{Client Id},{Proxy Url});
});
</script>
```

The data received by our object is described below.

- **Playlist Id**: The id number of the playlist we are trying to connect to.\*required
- **Client Id**: We need a client ID to pull the data. You can easily catch one with network monitoring or get one from your own API page.\*required
- **Proxy Url**: This is not mandatory, but it prevents CORS errors if you are running on a local server. It is recommended to create and use one with php curl.

## How can i get playlist id ?

You can easily get the Playlist IDs from the `Embed link` by pressing the `Share` button. See the photo below.

![Image](https://download.vadi.info/scmanager1.jpg)
