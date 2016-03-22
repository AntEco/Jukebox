function Song(songTitle, artist, filepath){
	this.songTitle = songTitle
	this.artist = artist
	this.filepath = filepath
}

var song1 = new Song("Eastbound and Down", "Action Bronson", "East Bound and Down - Action Bronson.mp4")
var song2 = new Song("Night Court", "Action Bronson", "Night Court - Action Bronson.mp4")
var song3 = new Song("The Rainmaker", "Action Bronson", "The Rainmaker - Action Bronson.mp4")
var song4 = new Song("Chilli Chicken Hakka Style", "Action Bronson", "Chilli Chicken Hakka Style - Action Bronson.mp4")

function Jukebox(jName){
	this.jName = jName
	this.songs = []

	this.addSong = function(song){
		this.songs.push(song)
	}

	this.songList = function(){
		for (i = 0; i < this.songs.length; i++)
			return ((i+1) + ". " + this.songs[i].songTitle + " - " + this.songs[i].artist )
	}
}

var juxtBox = new Jukebox("juxtBox")

juxtBox.addSong(song1)
juxtBox.addSong(song2)
juxtBox.addSong(song3)
juxtBox.addSong(song4)

var x = 0

$(document).ready(function() {
	
	document.getElementById("currentsong").innerHTML = juxtBox.songs[x].songTitle + " - " + juxtBox.songs[x].artist

	document.getElementById("nextsong").innerHTML = juxtBox.songs[x+1].songTitle + " - " + juxtBox.songs[x+1].artist

	// This should pull the playlist from the Jukebox object however I can only get it to display the first song due to the nature of how return iterates, or I can get it to log all the songs to the console. I somply wrote the songs in for now.
	// document.getElementById("playlist").innerHTML = juxtBox.songList()

	$("#play").click(function(){
		if (audio.paused)
			audio.play()
		else
			audio.pause()
	})

	$("#audio").on('ended', function(){
    	$("#audio").attr("src", juxtBox.songs[Math.abs(++x % juxtBox.songs.length)].filepath)
		audio.play()

		document.getElementById("currentsong").innerHTML = juxtBox.songs[Math.abs(x% juxtBox.songs.length)].songTitle + " - " + juxtBox.songs[Math.abs(x % juxtBox.songs.length)].artist

		document.getElementById("nextsong").innerHTML = juxtBox.songs[Math.abs((x+1)% juxtBox.songs.length)].songTitle + " - " + juxtBox.songs[Math.abs((x+1) % juxtBox.songs.length)].artist
	
});

	$("#stop").click(function(){
		audio.pause()
		audio.currentTime = 0
	})

	$("#next").click(function(){
		$("#audio").attr("src", juxtBox.songs[Math.abs(++x % juxtBox.songs.length)].filepath)
		audio.play()

		document.getElementById("currentsong").innerHTML = juxtBox.songs[Math.abs(x% juxtBox.songs.length)].songTitle + " - " + juxtBox.songs[Math.abs(x % juxtBox.songs.length)].artist

		document.getElementById("nextsong").innerHTML = juxtBox.songs[Math.abs((x+1)% juxtBox.songs.length)].songTitle + " - " + juxtBox.songs[Math.abs((x+1) % juxtBox.songs.length)].artist
	})

	$("#back").click(function(){
		$("#audio").attr("src", juxtBox.songs[Math.abs(--x % juxtBox.songs.length)].filepath)
		audio.play()

		document.getElementById("currentsong").innerHTML = juxtBox.songs[Math.abs(x) % juxtBox.songs.length].songTitle + " - " + juxtBox.songs[Math.abs(x) % juxtBox.songs.length].artist
		
		document.getElementById("nextsong").innerHTML = juxtBox.songs[Math.abs((x+1)% juxtBox.songs.length)].songTitle + " - " + juxtBox.songs[Math.abs((x+1) % juxtBox.songs.length)].artist
	})

	$("#shuffle").click(function(){
		var nowplaying = juxtBox.songs[Math.floor(Math.random()*juxtBox.songs.length)]
		$("#audio").attr("src", nowplaying.filepath)
		audio.play()

		document.getElementById("currentsong").innerHTML = nowplaying.songTitle + " - " + nowplaying.artist
		
		document.getElementById("nextsong").innerHTML = "Depends... you're on shuffle."
		

	})

})



