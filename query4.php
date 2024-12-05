
<?php 
include 'config.php';

//show top 10 artists
$sql = "SELECT 
    c.location, 
    c.showDate, 
    TIME_FORMAT(c.showtime, '%H:%i') AS time, 
    c.ticketPrice AS 'price', 
    a.name AS 'featuring'
FROM 
    concert AS c, 
    artist AS a
WHERE 
    c.artistID = a.artistID 
    AND c.location = 'Rose Bowl Stadium';";
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