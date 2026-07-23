import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import "../styles/Library.css";

function Library() {

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        fetch("http://localhost/BookVault/server/api/book.php")
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="library-page">

            <Navbar />

            <div className="library-container">

                <div className="library-header">

                    <div>

                        <h2>Library</h2>

                        <p>
                            Manage your entire book collection.
                        </p>

                    </div>

                    <button
                        className="add-book-btn"
                        onClick={() => navigate("/add-book")}
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                        Add Book
                    </button>

                </div>

                <div className="search-container">

                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>

                <div className="book-list">

                    {filteredBooks.map((book) => (

                        <BookCard
                            key={book.id}
                            title={book.title}
                            author={book.author}
                            rating={book.rating}
                            status={book.status}
                            cover={book.cover}
                            onClick={() => navigate(`/book/${book.id}`)}
                        />

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Library;