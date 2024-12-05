<?php
include 'config.php';

$sql = "SELECT * FROM Song";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "name: " . $row["name"] . " - Name: " . $row["artist"] . " - Email: " . $row["name"] . "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>