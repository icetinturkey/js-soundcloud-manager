export default class SCManager {
 constructor(playlist,clientId,proxy=""){
	this.playlist = playlist;
	this.clientId = clientId;
	this.proxy = proxy;
	this.artwork = "";
	this.header = "";
	this.permalink = "";
 }
}
export async function getList(obj,songsort="ID") {
	const url1 = obj.proxy + "https://api-widget.soundcloud.com/playlists/"+obj.playlist+"?representation=full&format=json&client_id="+obj.clientId+"&app_version=1674475286";
    let tracks = [];
	let queue = [];
	let urls = [];
	let sonuc = await download(obj,url1);
	const _count = Object.keys(sonuc).length;
	if(_count>0){
	sonuc.forEach(function(i, idx, array){
		if (typeof i.permalink !== 'undefined') {
			if (i.policy == 'ALLOW') {
			let obj = {id:i.id,title:i.title,url:i.media.transcodings[0].url,playback:i.playback_count,duration:i.duration};
			tracks.push(obj);
			}
		}else{
			queue.push(i.id);
		}
		if(queue.length==20){
			let _ids = "";
			queue.forEach(item => {_ids += item + ',';});
			queue.splice(0,queue.length);
			urls.push(obj.proxy + "https://api-widget.soundcloud.com/tracks?ids="+_ids.substring(0,_ids.length-1)+"&playlistId="+obj.playlist+"&playlistSecretToken=&format=json&client_id="+obj.clientId+"&app_version=1674475286");
		}
		if (idx === array.length - 1){
			if(queue.length>0){
			let _ids = "";
			queue.forEach(item => {_ids += item + ',';});
			queue.splice(0,queue.length);
			urls.push(obj.proxy + "https://api-widget.soundcloud.com/tracks?ids="+_ids.substring(0,_ids.length-1)+"&playlistId="+obj.playlist+"&playlistSecretToken=&format=json&client_id="+obj.clientId+"&app_version=1674475286");
			}
		}
	});
	for (let i = 0; i < urls.length; i++) {
		let data = await download(obj,urls[i]);
		data.forEach(media => {
			if (media.policy == 'ALLOW') {
			let obj = {id:media.id,title:media.title,url:media.media.transcodings[0].url,playback:media.playback_count,duration:media.duration};
			tracks.push(obj);
			}
		});
	}
	switch(songsort){
        case "ID":
            tracks.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0));
        break;
		case "TITLE":
            tracks.sort((a,b) => (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() > a.title.toUpperCase()) ? -1 : 0));
        break;
		case "PLAYBACK":
            tracks.sort((a,b) => (a.playback < b.playback) ? 1 : ((b.playback < a.playback) ? -1 : 0));
        break;
		case "DURATION":
            tracks.sort((a,b) => (a.duration < b.duration) ? 1 : ((b.duration < a.duration) ? -1 : 0));
        break;
        default: 
            tracks.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0));
        break;
    }
	}
	return tracks;
}
async function download(obj,dlink){
	const response = await fetch(dlink);
    const received = await response.json();
	if (typeof received.tracks !== 'undefined') {
		if (typeof received.artwork_url !== 'undefined') {
			obj.artwork = received.artwork_url;
			obj.header = received.title;
			obj.permalink = received.permalink_url;
		}
		return received.tracks;
	}else{
		return received;
	}
}
export async function getTrack(obj,url) {
	let sonuc = await download(obj,obj.proxy+url+"?client_id="+obj.clientId);
	return sonuc.url;
}
export function getMeta(obj){
	let metadata = {artwork:obj.artwork,header:obj.header,permalink:obj.permalink};
	return metadata;
}