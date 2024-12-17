let allSongs = []; // Global array to store all songs
let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];  // Load liked songs from localStorage if available

// Fetch all songs from the server when the page loads
function fetchAllSongs() {
    rand_mp3();

    fetch('search.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allSongs = data; // Store all songs in the global array
            console.log("All Songs Fetched:", allSongs); // Debugging: Log all songs
        })
        .catch(error => {
            console.error("Error fetching all songs:", error);
        });
}

// Filter songs based on the user's input for all songs
function filterSongs(query) {
    const resultsDiv = document.getElementById("result");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (!query.trim()) {
        resultsDiv.textContent = "Start typing to search for a song!";
        return;
    }

    // Filter the global array of songs based on the query
    const filteredSongs = allSongs.filter(song =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
    );

    // Display the filtered results
    if (filteredSongs.length > 0) {
        filteredSongs.forEach(song => {
            const songElement = createSongRow(song);
            resultsDiv.appendChild(songElement);
        });
    } else {
        resultsDiv.textContent = "No liked songs found.";
    }
}

// Filter liked songs based on user's input
function filterLikedSongs(query) {
    const resultsDiv = document.getElementById("likedSongsList");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (!query.trim()) {
        if (likedSongs.length === 0) {
            resultsDiv.textContent = "No liked songs yet!";
        } else {
            likedSongs.forEach(song => {
                const songElement = createSongRow(song);
                resultsDiv.appendChild(songElement);
            });
        }
        return;
    }
    // Filter the likedSongs array based on the query
    const filteredLikedSongs = likedSongs.filter(song =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
    );

    // Display the filtered liked songs results
    if (filteredLikedSongs.length > 0) {
        filteredLikedSongs.forEach(song => {
            const songElement = createSongRow(song);
            resultsDiv.appendChild(songElement);
        });
    } else {
        resultsDiv.textContent = "No liked songs found.";
    }
}

// Create the song row UI (used for both search and liked songs)
function createSongRow(song) {
    const songElement = document.createElement("div");
    songElement.classList.add("song-row");

    // Column for song name and artist
    const infoColumn = document.createElement("div");
    infoColumn.classList.add("song-info");

    // Song name
    const nameElement = document.createElement("div");
    nameElement.classList.add("song-name");
    nameElement.textContent = song.name;

    // Artist name (smaller and light grey, similar to Spotify)
    const artistElement = document.createElement("div");
    artistElement.classList.add("song-artist");
    artistElement.textContent = song.artist;

    // Append song name and artist to info column
    infoColumn.appendChild(nameElement);
    infoColumn.appendChild(artistElement);

    // Column for toggle button
    const actionColumn = document.createElement("div");
    actionColumn.classList.add("song-action");

    // Toggle button for like/unlike (to add to Liked Songs)
    const toggleButton = document.createElement("button");
    const isLiked = likedSongs.some(
        likedSong => likedSong.name === song.name && likedSong.artist === song.artist
    );

    toggleButton.textContent = isLiked ? "-" : "+";
    if (isLiked) {
        toggleButton.classList.add("red-button"); // Make button red if already liked
    }

    toggleButton.addEventListener("click", () => {
        toggleLikeStatus(song);
        if (toggleButton.textContent === "+") {
            toggleButton.textContent = "-";
            toggleButton.classList.add("red-button"); // Turn button red
        } else {
            toggleButton.textContent = "+";
            toggleButton.classList.remove("red-button"); // Remove red
        }
    });


    actionColumn.appendChild(toggleButton);

    // Append columns to song element
    songElement.appendChild(infoColumn);
    songElement.appendChild(actionColumn);

    return songElement;
}

// Add or remove songs from likedSongs and update the liked songs display
function toggleLikeStatus(song) {
    const index = likedSongs.findIndex(
        likedSong => likedSong.name === song.name && likedSong.artist === song.artist
    );

    if (index === -1) {
        likedSongs.push(song); // Add song to likedSongs
        displayLikedSongs();

    } else {
        likedSongs.splice(index, 1); // Remove song from likedSongs
        displayLikedSongs();

    }

    // Update the liked songs display
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
}

// Function to display liked songs in tile-3
function displayLikedSongs() {
    const likedSongsList = document.getElementById("likedSongsList");
    likedSongsList.innerHTML = ""; // Clear the list before displaying

    if (likedSongs.length === 0) {
        likedSongsList.textContent = "No liked songs yet!";
        return;
    }

    likedSongs.forEach(song => {
        const songElement = createSongRow(song);
        likedSongsList.appendChild(songElement);
    });
}

// Fetch all songs when the page loads
fetchAllSongs();

// Attach the search bar input event for all songs
document.getElementById("search").addEventListener("input", (event) => {
    filterSongs(event.target.value);
});

// Attach the search bar input event for liked songs
document.getElementById("searchLikes").addEventListener("input", (event) => {
    filterLikedSongs(event.target.value);
});

// Display liked songs when the page loads
displayLikedSongs();




// Fetch and display results of top artists (based off number of listeners)
function artistRankings() {
    fetch("artist.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile1 = document.getElementById("ranking-results");

            // Clear previous results
            tile1.innerHTML = "";
             const title = document.createElement("h3");
             title.textContent = "--  Top Artists in the World  --";
             tile1.appendChild(title);

            if (data.length > 0) {

                // Create a list to display all results
                const list = document.createElement("ul");

                // Iterate over query results and populate the list
                data.forEach((result) => {
                    const listItem = document.createElement("li");
                    let listeners = Number(result.listeners);
                    listItem.innerHTML = `
                       <strong>#</strong> ${result.ranking} 
                        <strong>:</strong> ${result.artist} <br>
                        <strong>Monthly Listeners:</strong> ${listeners.toLocaleString()} <br>
                        <strong>Top Song:</strong> "${result.topSong}" <br><br>
                    `;
                    list.appendChild(listItem);
                });

                // Append the list to tile-3
                tile1.appendChild(list);
            } else {
                // Handle case where no results are returned
                tile1.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            const tile1 = document.getElementById("tile-3");
            tile1.innerHTML = "<p>Error fetching data.</p>";
        });
}

//Show top/trending songs based on rankings (based off listens)
function songRankings() {
    fetch("song.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile1 = document.getElementById("ranking-results");

            // Clear previous results
            tile1.innerHTML = "";
          
             const title = document.createElement("h3");
             title.textContent = "--  Trending Songs  --";
             tile1.appendChild(title);

            if (data.length > 0) {

                // Create a list to display all results
                const list = document.createElement("ul");

                // Iterate over query results and populate the list
                data.forEach((result) => {
                    const listItem = document.createElement("li");
                    let listens = Number(result.listens);
                    listItem.innerHTML = `
                       <strong>#</strong> ${result.ranking} 
                        <strong>:</strong> "${result.name}" <br>
                        <strong>Artist:</strong> ${result.artist} <br>
                        <strong>Listens:</strong> ${listens.toLocaleString()} <br><br>
                    `;
                    list.appendChild(listItem);
                });

                // Append the list to tile-3
                tile1.appendChild(list);
            } else {
                // Handle case where no results are returned
                tile1.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            const tile1 = document.getElementById("tile-3");
            tile1.innerHTML = "<p>Error fetching data.</p>";
        });
}

//Show top/trending albums based on rankings (based off most listened-to song on album)
function albumRankings() {
    fetch("album.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile1 = document.getElementById("ranking-results");

            // Clear previous results
            tile1.innerHTML = "";
          
             const title = document.createElement("h3");
             title.textContent = "--  Trending Albums  --";
             tile1.appendChild(title);

            if (data.length > 0) {

                // Create a list to display all results
                const list = document.createElement("ul");

                // Iterate over query results and populate the list
                data.forEach((result) => {
                    const listItem = document.createElement("li");
                    let listens = Number(result.listens);
                    listItem.innerHTML = `
                       <strong>#</strong> ${result.ranking} 
                        <strong>:</strong> ${result.name} <br>
                        <strong>Artist:</strong> ${result.artist} <br>
                        <strong>Listens:</strong> ${listens.toLocaleString()} <br><br>
                    `;
                    list.appendChild(listItem);
                });

                // Append the list to tile-3
                tile1.appendChild(list);
            } else {
                // Handle case where no results are returned
                tile1.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            const tile1 = document.getElementById("tile-3");
            tile1.innerHTML = "<p>Error fetching data.</p>";
        });
}

//randomize the current playing song (currently only 6 songs)
function rand_mp3(){
    const bgm = document.getElementById("backgroundMusic");
    const art = document.getElementById("albumArt");
    let x = Math.floor(Math.random() * (5 + 1));
    console.log(x);

    switch (x){
        case 0:
            bgm.src = "media/angel.mp3";
            bgm.volume = 0.25;
            break;
        case 1:
            bgm.src = "media/smokin.mp3";
            art.src = "media/silk.jpg";
            bgm.volume = 0.3;
            break;
        case 2:
            bgm.src = "media/darling.mp3";
            art.src= "media/art.jpg"
            bgm.volume = 0.3;

            break;
        case 3:
            bgm.src = "media/luther.mp3";
            art.src = "media/gnx.jpeg";
            bgm.volume = 0.3;

            break;
        case 4:
            bgm.src = "media/ruthless.mp3";
            art.src = "media/marias.jpg";
            bgm.volume = 0.3;

            break;
        case 5:
            bgm.src = "media/mask.mp3";
            art.src= "media/art.jpg"
            bgm.volume = 0.3;

            break;
    }
    bgm.load();
    bgm.play();
}
