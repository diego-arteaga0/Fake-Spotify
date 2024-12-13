<?php

header('Content-Type: application/json');

// MySQL connection
include 'config.php';

$query = isset($_GET['query']) ? trim($_GET['query']) : '';

    // Prevent SQL injection by escaping special characters
    $query = $conn->real_escape_string($query);

    // SQL query to search for songs where the name contains the query string
    $sql = "SELECT name, artist FROM Song WHERE name LIKE '%$query%'
    ORDER BY name 
     ";
   // Debugging: Print the SQL query

   // Execute the query
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