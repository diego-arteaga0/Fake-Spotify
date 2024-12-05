<?php  //this file connects to your local mySQLWorkbench
$servername = "localhost";
$username = "root";             // your MySQL username
$password = " ";      // put your MySQL password
$dbname = "music";              // name of your database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>