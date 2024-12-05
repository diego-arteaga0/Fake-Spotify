
<?php 
include 'config.php';

$sql = "SELECT name, artist FROM Song WHERE listens > 100000000 ORDER BY listens DeSC"; 
$result = $conn->query($sql); 

$artists = array(); // Fetch data and store in an array 

if ($result->num_rows > 0) { 
    while($row = $result->fetch_assoc()) { 
        $artists[] = $row['name']; } 
    } 
    // Close connection 
    $conn->close(); 
    // Return data in JSON format 
    echo json_encode($artists);
?>
