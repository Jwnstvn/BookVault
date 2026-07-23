import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/BookDetails.css";

function BookDetails() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [book, setBook] = useState(null);

    useEffect(() => {

        fetch(`http://localhost/BookVault/server/api/book.php?id=${id}`)
            .then((response) => response.json())
            .then((data) => {

                console.log(data);

                setBook(data);

            });

    }, [id]);

    // ==========================
    // DELETE BOOK
    // ==========================

    const handleDelete = () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        fetch("http://localhost/BookVault/server/api/delete.php", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: book.id
            })

        })

        .then((response) => response.json())

        .then((data) => {

            if (data.success) {

                alert("Book deleted successfully!");

                navigate("/library");

            } else {

                alert("Failed to delete book.");

            }

        })

        .catch((error) => {

            console.error(error);

            alert("Something went wrong.");

        });

    };

    if (!book) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="details-page">

            <Navbar />

            <div className="details-container">

                <div className="book-cover">

                {book.cover ? (

                    <img
                        src={`http://localhost/BookVault/server/uploads/${book.cover}`}
                        alt={book.title}
                    />

                ) : (

                    <i className="bi bi-book-half"></i>

                )}

            </div>

                <div className="book-information">

                    <h1>{book.title}</h1>

                    <p className="author">
                        by {book.author}
                    </p>

                    <div className="book-meta">

                        <div>
                            <strong>Genre</strong>
                            <span>{book.genre}</span>
                        </div>

                        <div>
                            <strong>Published</strong>
                            <span>{book.year}</span>
                        </div>

                        <div>
                            <strong>Rating</strong>
                            <span>⭐ {book.rating}</span>
                        </div>

                        <div>
                            <strong>Status</strong>

                            <span
                                className={`status ${
                                    book.status === "Finished"
                                        ? "finished"
                                        : "reading"
                                }`}
                            >
                                {book.status}
                            </span>

                        </div>

                    </div>

                    <div className="description">

                        <h3>Description</h3>

                        <p>
                            {book.description}
                        </p>

                    </div>

                    <div className="action-buttons">

                        <button
                            className="edit-btn"
                            onClick={() =>
                                navigate(`/edit-book/${book.id}`)
                            }
                        >
                            <i className="bi bi-pencil-square"></i>
                            Edit Book
                        </button>

                        <button
                            className="delete-btn"
                            onClick={handleDelete}
                        >
                            <i className="bi bi-trash-fill"></i>
                            Delete Book
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BookDetails;