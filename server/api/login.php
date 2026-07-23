<?php

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "../config/Database.php";

$database = new Database();
$db = $database->connect();

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data["username"]) ||
    !isset($data["password"])
) {

    echo json_encode([
        "success" => false,
        "message" => "Missing username or password."
    ]);

    exit();

}

$username = $data["username"];
$password = $data["password"];

$query = "SELECT * FROM users WHERE username = :username LIMIT 1";

$stmt = $db->prepare($query);

$stmt->bindParam(":username", $username);

$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user["password"])) {

    $_SESSION["user_id"] = $user["id"];
    $_SESSION["username"] = $user["username"];

    echo json_encode([
        "success" => true,
        "username" => $user["username"]
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Invalid username or password."
    ]);

}