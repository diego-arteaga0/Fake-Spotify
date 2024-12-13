
<?php 
include 'config.php';

$query = isset($_GET['query']) ? trim($_GET['query']) : '';

$query = $conn->real_escape_string($query);

//show top 10 artists
$sql = "SELECT a.name AS artist, a.ranking, s.name AS topSong, a.listeners
FROM Artist a
INNER JOIN Song s ON s.artist = a.name
WHERE s.listens = (
	SELECT MAX(s2.listens)
    FROM Song s2
    WHERE s2.artist = a.name
)
ORDER BY ranking;"; 
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