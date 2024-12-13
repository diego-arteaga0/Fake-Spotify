let allSongs = []; // Global array to store all songs
let likedSongs = []; // Global array to store liked songs

// Fetch all songs from the server when the page loads
function fetchAllSongs() {
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

// Filter songs based on the user's input
function filterSongs(query) {
    const resultsDiv = document.getElementById("result");
    resultsDiv.innerHTML = ""; // Clear previous results

    // If the query is empty, show a prompt and return
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
        resultsDiv.textContent = "No results found.";
    }
}

// Function to create a song row with a toggle button
function createSongRow(song) {
    const songElement = document.createElement("div");
    songElement.classList.add("song-row");

    const nameColumn = document.createElement("div");
    nameColumn.classList.add("song-name");
    nameColumn.textContent = song.name;

    const artistColumn = document.createElement("div");
    artistColumn.classList.add("song-artist");
    artistColumn.textContent = song.artist;

    const actionColumn = document.createElement("div");
    actionColumn.classList.add("song-action");

    const toggleButton = document.createElement("button");
    toggleButton.textContent = likedSongs.some(
        likedSong => likedSong.name === song.name && likedSong.artist === song.artist
    )
        ? "-"
        : "+";

    toggleButton.addEventListener("click", () => {
        toggleLikeStatus(song);
        toggleButton.textContent =
            toggleButton.textContent === "+" ? "-" : "+";
    });

    actionColumn.appendChild(toggleButton);

    songElement.appendChild(nameColumn);
    songElement.appendChild(artistColumn);
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
    } else {
        likedSongs.splice(index, 1); // Remove song from likedSongs
    }

    // Update the liked songs display
    displayLikedSongs();
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
        const songElement = document.createElement("div");
        songElement.classList.add("liked-song-item");
        songElement.textContent = `${song.name} by ${song.artist}`;
        likedSongsList.appendChild(songElement);
    });
}

// Fetch all songs when the page loads
fetchAllSongs();

// Attach the search bar input event
document.getElementById("search").addEventListener("input", (event) => {
    filterSongs(event.target.value);
});





// Fetch and display results of top 10 artists 
function artistRankings() {
    fetch("artist.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile1 = document.getElementById("tile-1"); 

          
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

//Show top/trending songs based on rankings (listens)
function songRankings() {
    fetch("song.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile1 = document.getElementById("tile-1"); 

          //tile1.innerHTML = "";
          
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

//Show top/trending albums based on rankings (listens)
function albumRankings() {
    fetch("album.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile1 = document.getElementById("tile-1"); 

          //tile1.innerHTML = "";
          
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
