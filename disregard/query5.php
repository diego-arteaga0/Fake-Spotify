
<?php 
include 'config.php';

//show top 10 artists
$sql = "SELECT s.name , COUNT(*) AS count
FROM PlaylistSong ps
JOIN Playlist p ON ps.playlistID = p.playlistID
JOIN Song s ON ps.songID = s.songID
WHERE p.userID = (SELECT userID FROM User WHERE username = 'Bobby')  -- Replace with the user's username --
GROUP BY s.songID
ORDER BY count DESC
LIMIT 5;";
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