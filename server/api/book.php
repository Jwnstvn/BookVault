<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/Database.php";
require_once "../classes/Book.php";

// Database
$database = new Database();
$db = $database->connect();

// Book object
$book = new Book($db);

// =========================
// SEARCH BOOKS
// =========================
if (isset($_GET["search"])) {

    $keyword = $_GET["search"];

    $result = $book->searchBooks($keyword);

    echo json_encode($result);

}

// =========================
// GET ONE BOOK
// =========================
elseif (isset($_GET["id"])) {

    $id = $_GET["id"];

    $result = $book->getBook($id);

    echo json_encode($result);

}

// =========================
// GET ALL BOOKS
// =========================
else {

    $result = $book->getAllBooks();

    echo json_encode($result);

}

?>