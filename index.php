<?php 
include 'config.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Database System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container" id="tileContainer">
        <div class="tile" id="tile-1">Spoofify</div>
        <div class="tile" id="tile-2"> 
            <h2>Song Search</h2>
            <div class="search-bar">
                <input type="text" id="search" placeholder="Search for a song...">
             </div>
            <div class="results" id="result">
            <!-- Dynamic search results will be displayed here -->
            </div>
        </div>
        <div class="tile" id="tile-3">Liked Songs</div>
     
    </div>

    <script src="script.js"></script>


</body>
</html>