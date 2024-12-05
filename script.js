// Array of queries and their corresponding tile IDs, might not use this
const queries = [
    { query: 'SELECT name, length FROM Song WHERE explicit = false AND TIME_TO_SEC(length) < 240', tileId: 'tile1' },
    { query: "SELECT name FROM SONG WHERE artist = 'Tyler, The Creator' ORDER BY name", tileId: 'tile2' },
    { query: 'SELECT name FROM Album WHERE explicit = false', tileId: 'tile3' },
    { query: "SELECT name FROM Album WHERE type = 'LP'", tileId: 'tile4' },
    // Add the rest of the queries for tiles 5 to 21
];

// Default text for tiles




// Fetch and display results of top 10 artists in tile-2
function fetchTile2Data() {
    fetch("query1.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile2 = document.getElementById("tile-2"); // Use ID to target tile-2

             // Clear existing content
             tile2.innerHTML = "";

             // Add a title or description
             const title = document.createElement("h3");
             title.textContent = "--  Top 10 Artists in the World  --";
             tile2.appendChild(title);

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
                tile2.appendChild(list);
            } else {
                // Handle case where no results are returned
                tile2.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            const tile2 = document.getElementById("tile-3");
            tile2.innerHTML = "<p>Error fetching data.</p>";
        });
}

// Fetch and display results of #2 artist's discography in chronological order w/top hits in tile-3
function fetchTile3Data() {
    fetch("query2.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile3 = document.getElementById("tile-3"); // Use ID to target tile-3

             // Clear existing content
             tile3.innerHTML = "";

             // Add a title or description
             const title = document.createElement("h5");
             title.textContent = "-- #2 Artist's Chronological Discography & Hits --";
             tile3.appendChild(title);

            if (data.length > 0) {

                // Create a list to display all results
                const list = document.createElement("ul");

                // Iterate over query results and populate the list
                data.forEach((result) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                       <strong>Artist:</strong> ${result.artist} <br>
                        <strong>Album:</strong> ${result.album}<br>
                         <strong> Year:  </strong>${result.releaseYear} <br>
                        <strong>Hit Song from ${result.album} : </strong>"${result.topSong}"<br><br>

                    `;
                    list.appendChild(listItem);
                });

                // Append the list to tile-3
                tile3.appendChild(list);
            } else {
                // Handle case where no results are returned
                tile3.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            const tile3 = document.getElementById("tile-4");
            tile3.innerHTML = "<p>Error fetching data.</p>";
        });
}



async function fetchTileData4() {
    
    try {
        // Fetch data from the PHP file
        const response = await fetch('query3.php');
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the JSON response
        const data = await response.json();

        // Group data by playlistID
        const groupedPlaylists = data.reduce((acc, curr) => {
            if (!acc[curr.playlistID]) {
                acc[curr.playlistID] = { title: curr.title, length: curr.length, count: curr.songCount, songs: [] };
            }
            acc[curr.playlistID].songs.push({ song: curr.song, artist: curr.artist });
            return acc;
        }, {});

        // Get the container where playlists will be rendered
        const container = document.getElementById('tile-4');
        const title = document.createElement("h2");
        title.textContent = "-- Combining 2 Playlists into 1 --";
        // Render each playlist and its songs
        for (const [playlistID, playlistData] of Object.entries(groupedPlaylists)) {
            // Create playlist tile
            const playlistTile = document.createElement('div');
            playlistTile.classList.add('playlist-tile');
            playlistTile.innerHTML = `<h3>Playlist #${playlistID}: ${playlistData.title} 
            (${playlistData.count}) (${playlistData.length})</h2>`;
            
            // Create a list of songs
            const songList = document.createElement('ul');
            playlistData.songs.forEach(songData => {
                const songItem = document.createElement('li');
                songItem.textContent = `"${songData.song}" by ${songData.artist}`;
                songList.appendChild(songItem);
            });

            // Append songs to the playlist tile
            playlistTile.appendChild(songList);

            // Append the playlist tile to the container
            container.appendChild(playlistTile);
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

// Fetch and display results of #2 artist's discography in chronological order w/top hits in tile-3
function fetchTile5Data() {
    fetch("query4.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile5 = document.getElementById("tile-5"); // Use ID to target tile-3

             // Clear existing content
             tile5.innerHTML = "";

             // Add a title or description
             const title = document.createElement("h4");
             title.textContent = "-- Display Concerts Based on Location --";
             tile5.appendChild(title);
             
            if (data.length > 0) {

                // Create a list to display all results
                const list = document.createElement("ul");
                const listItem2 = document.createElement("h4");
                listItem2.innerHTML = `<strong>Concerts at the Rose Bowl Stadium</strong><br>`;
                list.appendChild(listItem2);
                // Iterate over query results and populate the list
                data.forEach((result) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                    <strong>Touring Artist:</strong> ${result.featuring} <br>
                       <strong>Location:</strong> ${result.location} <br>
                        <strong>When:</strong> ${result.showDate} @    ${result.time}<br>
                        <strong>Ticket Price: $</strong>${result.price} <br><br>

                    `;
                    list.appendChild(listItem);
                });

                // Append the list to tile-3
                tile5.appendChild(list);
            } else {
                // Handle case where no results are returned
                tile5.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            const tile5 = document.getElementById("tile-4");
            tile5.innerHTML = "<p>Error fetching data.</p>";
        });
}

// fetch data for a user's 5 most used songs in their playlists
function fetchTile6Data() {
    fetch("query5.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile6 = document.getElementById("tile-6"); // Use ID to target tile-3

             // Clear existing content
             tile6.innerHTML = "";

             // Add a title or description
             const title = document.createElement("h3");
             title.textContent = "-- User's Most Used Playlist Songs --";
             tile6.appendChild(title);
             
            if (data.length > 0) {

                // Create a list to display all results
                const list = document.createElement("ul");
                const listItem2 = document.createElement("h3");
                listItem2.innerHTML = `<strong>Bobby's Most Used Songs</strong><br>
                `;
                list.appendChild(listItem2);
                // Iterate over query results and populate the list
                data.forEach((result) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                       <strong>Song:</strong> "${result.name}" <br>
                        <strong>Number of Playlists:</strong> ${result.count} <br><br>
                      
                    `;
                    list.appendChild(listItem);
                });

                // Append the list to tile-3
                tile6.appendChild(list);
            } else {
                // Handle case where no results are returned
                tile6.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            const tile6 = document.getElementById("tile-6");
            tile6.innerHTML = "<p>Error fetching data.</p>";
        });
}

// Array of text lines for each tile
const tileTexts = [
    ["MUSIC SYSTEM 440 FINAL PROJECT", "Designed & Presented by:", "Diego Arteaga, Gerardo Espinoza Garcia, Kenneth Riles (Group 5)"]
];
// Function to populate a tile with multiple lines of text
function populateTiles() {
    console.log(12);
    tileTexts.forEach((texts, index) => {
        const tile = document.getElementById(`tile-${index + 1}`);
        if (tile) {
            texts.forEach(line => {
                const p = document.createElement('p');
                p.textContent = line;
                tile.appendChild(p);
            });
        }
    });
}

// Call the function to populate tiles when the page loads

window.onload = populateTiles;
fetchTile2Data();
fetchTile3Data();
fetchTileData4();
fetchTile5Data();
fetchTile6Data();


