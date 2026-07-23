<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "../config/Database.php";

$database = new Database();
$db = $database->connect();

// Receive form data
$id = $_POST["id"] ?? "";
$title = $_POST["title"] ?? "";
$author = $_POST["author"] ?? "";
$genre = $_POST["genre"] ?? "";
$year = $_POST["year"] ?? "";
$rating = $_POST["rating"] ?? "";
$status = $_POST["status"] ?? "";
$description = $_POST["description"] ?? "";

// Get current cover
$stmt = $db->prepare("SELECT cover FROM books WHERE id = ?");
$stmt->execute([$id]);
$currentBook = $stmt->fetch(PDO::FETCH_ASSOC);

$currentCover = $currentBook["cover"] ?? "";

$newCover = $currentCover;

// Check if a new image was uploaded
if (isset($_FILES["cover"]) && $_FILES["cover"]["error"] == 0) {

    // Delete old image
    if (!empty($currentCover) && file_exists("../uploads/" . $currentCover)) {
        unlink("../uploads/" . $currentCover);
    }

    // Save new image
    $extension = pathinfo(
        $_FILES["cover"]["name"],
        PATHINFO_EXTENSION
    );

    $newCover = uniqid() . "." . $extension;

    move_uploaded_file(
        $_FILES["cover"]["tmp_name"],
        "../uploads/" . $newCover
    );
}

// Update database
$query = "UPDATE books SET

title=?,
author=?,
genre=?,
year=?,
rating=?,
status=?,
description=?,
cover=?

WHERE id=?";

$stmt = $db->prepare($query);

$success = $stmt->execute([

    $title,
    $author,
    $genre,
    $year,
    $rating,
    $status,
    $description,
    $newCover,
    $id

]);

echo json_encode([
    "success" => $success
]);

?>