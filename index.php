
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
            <h2>SPOOFIFY 
            </h2>
            <img src= "media/icon.png" alt="Spotify logo enhanced" width="80" height="80">
            <h2>Check Rankings<h2>
        </div>

        <div class="tile" id="tile-2"> 
            <h3>SEARCH</h3>
                <div class="search-bar">
                    <input type="text" id="search" placeholder="What do you want to listen to?" 
                    onkeyup="filterSongs(this.value)">
                </div>
                <div class="results" id="result">
                <!-- Dynamic search results will be displayed here -->
                </div>
        </div>

        <div class="tile" id="tile-3">Liked Songs</div>
     
    </div>

    <script src="script.js"></script>

<audio id="backgroundMusic" src="media/bgm.mp3" autoplay loop>
</body>
</html>