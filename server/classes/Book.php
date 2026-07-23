<?php

class Book
{

    private $conn;
    private $table = "books";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // ==========================
    // GET ALL BOOKS
    // ==========================

    public function getAllBooks()
    {
        $query = "SELECT * FROM " . $this->table;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

            // ==========================
        // SEARCH BOOKS
        // ==========================

        public function searchBooks($keyword)
        {

            $query = "SELECT *
                    FROM " . $this->table . "
                    WHERE title LIKE ?
                    OR author LIKE ?
                    LIMIT 5";

            $stmt = $this->conn->prepare($query);

            $search = "%" . $keyword . "%";

            $stmt->execute([
                $search,
                $search
            ]);

            return $stmt->fetchAll(PDO::FETCH_ASSOC);

        }

    // ==========================
    // GET ONE BOOK
    // ==========================

    public function getBook($id)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE id = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->execute([$id]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // ==========================
    // DELETE BOOK
    // ==========================

    public function deleteBook($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = ?";

        $stmt = $this->conn->prepare($query);

        return $stmt->execute([$id]);
    }

            // ==========================
        // ADD BOOK
        // ==========================

        public function addBook(
            $title,
            $author,
            $genre,
            $year,
            $rating,
            $status,
            $description,
            $cover
        )
        {

            $query = "INSERT INTO " . $this->table . "
            (title, author, genre, year, rating, status, description, cover)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $this->conn->prepare($query);

            return $stmt->execute([
                $title,
                $author,
                $genre,
                $year,
                $rating,
                $status,
                $description,
                $cover
            ]);

        }
                        // ==========================
                // UPDATE BOOK
                // ==========================

                public function updateBook(
                    $id,
                    $title,
                    $author,
                    $genre,
                    $year,
                    $rating,
                    $status,
                    $description
                )
                {

                    $query = "UPDATE " . $this->table . "
                    SET
                        title = ?,
                        author = ?,
                        genre = ?,
                        year = ?,
                        rating = ?,
                        status = ?,
                        description = ?
                    WHERE id = ?";

                    $stmt = $this->conn->prepare($query);

                    return $stmt->execute([
                        $title,
                        $author,
                        $genre,
                        $year,
                        $rating,
                        $status,
                        $description,
                        $id
                    ]);

                }

            // ==========================
        // DASHBOARD STATISTICS
        // ==========================

        public function getStatistics()
        {

            $query = "SELECT

                COUNT(*) AS totalBooks,

                SUM(status='Reading') AS readingBooks,

                SUM(status='Finished') AS finishedBooks,

                ROUND(AVG(rating),1) AS averageRating

                FROM books";

            $stmt = $this->conn->prepare($query);

            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);

        }
            // ==========================
    // RECENT BOOKS
    // ==========================

    public function getRecentBooks($limit = 3)
    {

        $query = "SELECT *
                  FROM " . $this->table . "
                  ORDER BY id DESC
                  LIMIT ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(1, (int)$limit, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }

}
