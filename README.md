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
	const scdownloader = new SCManager({PlaylistId},{ClientId},{ProxyUrl});
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

According to this photo, 1551495580 is our Playlist ID.

## Working example

```html
<img id="art" />
<a href="#" id="title">Loading</a><br>
<audio id="player" controls="controls" autoplay="autoplay"></audio>
<ul id="list"></ul>
<script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
<script>
import("./scmanager.js").then(({default: SCManager, getList, getTrack, getMeta}) => {
	const scdownloader = new SCManager("32534743","wuM9g7pMB4mU13fW6SuRfQeJNRYNIX9O");
	getList(scdownloader,"PLAYBACK").then(data => {
		document.getElementById("title").innerHTML=getMeta(scdownloader).header;
		document.getElementById("title").href=getMeta(scdownloader).permalink;
		document.getElementById("art").src=getMeta(scdownloader).artwork;
		data.forEach((item, index) => {
			const container = document.createElement("li");
			const btn = document.createElement("button");
			btn.innerHTML = index+') '+item.title+"("+Math.floor(item.duration/60000)+":"+Math.floor((item.duration/1000)%60)+") #"+item.playback.toLocaleString();
			btn.addEventListener("click", function(){
				getTrack(scdownloader,item.url).then(track => {
					var hls = new Hls();
					hls.loadSource(track);
					hls.attachMedia(player);
				});
			});
			container.appendChild(btn);
			document.getElementById("list").appendChild(container);
		});
	});
});
</script>
```

Result:

![Image](https://download.vadi.info/scmanager3.jpg)

Live Preview:

[https://icetinturkey.github.io/js-soundcloud-manager](https://icetinturkey.github.io/js-soundcloud-manager)
