
<?php 
include 'config.php';

//show top 10 artists
$sql = "SELECT a.artist, a.name AS album, s.name AS topSong, YEAR(a.releaseDate) AS releaseYear
FROM Album a
INNER JOIN Artist r ON r.name = a.artist
INNER JOIN Song s ON s.album = a.name
WHERE a.artist = 'Tyler, The Creator' AND s.listens = (
	SELECT MAX(s2.listens)
    FROM Song s2
    WHERE s2.album = a.name
    )
ORDER BY releaseDate;";
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