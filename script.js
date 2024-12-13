let allSongs = []; // Global array to store all songs
let likedSongs = []; // Global array to store user's liked songs

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

 // Display the filtered results in two columns
 if (filteredSongs.length > 0) {
    // Create a table to display results in two columns (song name and artist name)
    const table = document.createElement("table");
    table.style.width = "100%"; // Ensure table occupies full width

    // Create a header row
    const headerRow = document.createElement("tr");
    const songHeader = document.createElement("th");
    songHeader.textContent = "Song";
    const artistHeader = document.createElement("th");
    artistHeader.textContent = "Artist";
    const actionHeader = document.createElement("th");
    actionHeader.textContent = "Add"; // For the plus/minus icon column
    headerRow.appendChild(songHeader);
    headerRow.appendChild(artistHeader);
    headerRow.appendChild(actionHeader);
    table.appendChild(headerRow);

    // Loop through the filtered songs and create a row for each
    filteredSongs.forEach(song => {
        const row = document.createElement("tr");

        // Song Name
        const songCell = document.createElement("td");
        songCell.textContent = song.name;

        // Artist Name
        const artistCell = document.createElement("td");
        artistCell.textContent = song.artist;

        // Toggle button with plus/minus icon
        const actionCell = document.createElement("td");
        const toggleButton = document.createElement("button");
        const isLiked = likedSongs.some(likedSong => likedSong.id === song.id);

        toggleButton.textContent = isLiked ? "-" : "+"; // Show minus if already liked, plus if not
      //  toggleButton.textContent = "+"; // Initially show plus sign
        toggleButton.style.padding = "5px 10px";
        toggleButton.style.cursor = "pointer";
        toggleButton.onclick = function () {
            // Toggle between plus and minus signs
            if (isLiked) {
                // Remove from likedSongs array
                likedSongs = likedSongs.filter(likedSong => likedSong.id !== song.id);
                toggleButton.textContent = "+"; // Change to plus sign
            } else {
                // Add to likedSongs array
                likedSongs.push(song);
                toggleButton.textContent = "-"; // Change to minus sign
            }
        };

        // Add the song, artist, and toggle button to the row
        row.appendChild(songCell);
        row.appendChild(artistCell);
        row.appendChild(actionCell);
        actionCell.appendChild(toggleButton);

        table.appendChild(row);
    });

    // Append the table to the results div
    resultsDiv.appendChild(table);
} else {
    resultsDiv.textContent = "No results found.";
}
}
// Fetch all songs when the page loads
fetchAllSongs();


// Fetch and display results of top 10 artists 
function fetchTile1Data() {
    fetch("query1.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile1 = document.getElementById("tile-1"); 

          
             const title = document.createElement("h3");
             title.textContent = "--  Top 10 Artists in the World  --";
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




// Fetch and display results for concert info
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

fetchTile1Data();

// 

