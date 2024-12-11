document.getElementById('search').addEventListener('input', function () {
    const query = this.value.trim(); // Get the search input
    console.log('Search Query:', query); // Debugging

    fetch(`search.php?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const resultsContainer = document.getElementById('result');
            resultsContainer.innerHTML = ''; // Clear previous results

            if (data.length > 0) {
                const table = document.createElement('table');
                table.innerHTML = '<tr><th>Song Name</th><th>Artist</th></tr>';

                data.forEach(row => {
                    table.innerHTML += `<tr><td>${row.name}</td><td>${row.artist}</td></tr>`;
                });

                resultsContainer.appendChild(table);
            } else {
                resultsContainer.textContent = 'No results found.';
            }

            console.log('Data received:', data); // Debugging
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
});



// Fetch and display results of top 10 artists in tile-2
function fetchTile1Data() {
    fetch("query1.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const tile1 = document.getElementById("tile-1"); // Use ID to target tile-2

             // Clear existing content
             tile1.innerHTML = "";

             // Add a title or description
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



// Call the function to populate tiles when the page loads

//window.onload = populateTiles;
//fetchTile2Data();
fetchTile1Data();

// change 1 to app icon and name, 2-search song, 3-artist disco, 4-top 10 artists
// 5-search playlists, 6--search artist

