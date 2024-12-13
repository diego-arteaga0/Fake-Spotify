
<?php 
include 'config.php';

//show top 20 albums
$sql = "SELECT ranking, name, artist, listens
FROM Album
ORDER BY ranking
LIMIT 20;"; 
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