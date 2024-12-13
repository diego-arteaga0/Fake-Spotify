<?php
header('Content-Type: application/json');

// Include the database configuration
include 'config.php';

// Check the database connection
if (!$conn) {
    echo json_encode(["error" => "Failed to connect to the database."]);
    exit();
}
// Query to fetch all tuples from the Song table
$sql = "SELECT name, artist, album FROM Song ORDER BY listens DESC";
$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row; // Add each row to the array
        }
        echo json_encode($rows); // Output all rows as JSON
    } else {
        echo json_encode([]); // Return an empty array if no results
    }
} else {
    echo json_encode(["error" => "Failed to execute query."]);
}

$conn->close();
?>

