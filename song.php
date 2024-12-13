<?php 
include 'config.php';

$query = isset($_GET['query']) ? trim($_GET['query']) : '';

$query = $conn->real_escape_string($query);

//show top 10 artists
$sql = "SELECT ranking, name, artist, listens
FROM Song
ORDER BY ranking
LIMIT 25;"; 
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