<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "../config/Database.php";
require_once "../classes/Book.php";

$database = new Database();
$db = $database->connect();

$book = new Book($db);

$data = json_decode(file_get_contents("php://input"));

if(isset($data->id))
{

    if($book->deleteBook($data->id))
    {

        echo json_encode([
            "success" => true,
            "message" => "Book deleted successfully."
        ]);

    }
    else
    {

        echo json_encode([
            "success" => false,
            "message" => "Failed to delete book."
        ]);

    }

}
else
{

    echo json_encode([
        "success" => false,
        "message" => "No ID received."
    ]);

}