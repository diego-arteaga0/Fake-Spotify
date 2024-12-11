
<?php 
include 'config.php';

//show top 10 artists
$sql = "SELECT p.title, s.name AS song, s.artist, p.playlistID, p.songCount, p.length -- this is the one
FROM Playlist p
JOIN PlaylistSong ps ON p.playlistID = ps.playlistID
JOIN Song s ON s.songID = ps.songID
WHERE p.playlistID IN (1, 2,3)  -- Replace or add the needed playlists
ORDER BY p.title, s.name;";
$result = $conn->query($sql); 

if ($result->num_rows > 0) {
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row; // Add each row to the array
    }
    echo json_encode($rows); // Output as JSON
} else {
    echo json_encode([]); // Return an empty array if no results
}

$conn->close();
?>