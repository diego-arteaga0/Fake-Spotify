
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spoofify</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container" id="tileContainer">
        <div class="tile" id="tile-1">
            <div class="header">
                <h2>SPOOFIFY </h2>
                <img src= "media/icon.png" alt="Spotify logo enhanced" class="logo">
            </div>
            <div class="buttons-row">
                <button type='button' onclick="artistRankings()"> Top Artists </button>
                <button type='button' onclick="songRankings()"> Top Songs </button> 
                <button type='button'onclick="albumRankings()"> Top Albums </button>
            </div>
            <div class="footer">
            <p>View current rankings!</p>
            </div>
            <div id="ranking-results"></div>
            <div class="album-container">
            <img  alt="album cover" class="albumCover" id="albumArt">
            </div>
        </div>

        <div class="tile" id="tile-2"> 
            <h2>SEARCH</h2>
                <div class="search-bar">
                    <input type="text" id="search" placeholder="What do you want to listen to?" 
                    onkeyup="filterSongs(this.value)">
                </div>
                <div class="results" id="result">
                <!-- Dynamic search results will be displayed here -->
                </div>
        </div>

        <div class="tile" id="tile-3">
            <h2>LIKED SONGS<br></h2>
            <div class="search-bar" id="searchLikes">
                    <input type="text" id="search" placeholder="Find in liked songs" 
                    onkeyup="filterLikedSongs(this.value)">
                </div>
            <div class="liked-songs" id="likedSongsList">
            </div>
        </div>
        
        <audio id="backgroundMusic" src="media/darling.mp3" preload='auto' autoplay loop>
    <script src="script.js"></script>


</body>
</html>