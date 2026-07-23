import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/EditBook.css";

function EditBook() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const [cover, setCover] = useState(null);
    const [currentCover, setCurrentCover] = useState("");

    useEffect(() => {

        fetch(`http://localhost/BookVault/server/api/book.php?id=${id}`)
            .then((response) => response.json())
            .then((data) => {

                setTitle(data.title);
                setAuthor(data.author);
                setGenre(data.genre);
                setYear(data.year);
                setRating(data.rating);
                setStatus(data.status);
                setDescription(data.description);
                setCurrentCover(data.cover);

            })
            .catch((error) => {
                console.error(error);
            });

    }, [id]);

    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("id", id);
        formData.append("title", title);
        formData.append("author", author);
        formData.append("genre", genre);
        formData.append("year", year);
        formData.append("rating", rating);
        formData.append("status", status);
        formData.append("description", description);

        if (cover) {
            formData.append("cover", cover);
        }

        fetch("http://localhost/BookVault/server/api/update_book.php", {

            method: "POST",

            body: formData

        })

        .then((response) => response.json())

        .then((data) => {

            if (data.success) {

                alert("Book updated successfully!");

                navigate("/library");

            } else {

                alert(data.message || "Failed to update book.");

            }

        })

        .catch((error) => {

            console.error(error);

            alert("Something went wrong.");

        });

    };

    return (

        <div className="editbook-page">

            <Navbar />

            <div className="editbook-container">

                <h2>Edit Book</h2>

                <p>
                    Update the information of an existing book.
                </p>

                <form
                    className="book-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>Book Title</label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Author</label>

                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Genre</label>

                        <input
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Published Year</label>

                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Rating</label>

                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>

                    </div>

                    <div className="form-group">

                        <label>Reading Status</label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Reading">Reading</option>
                            <option value="Finished">Finished</option>
                        </select>

                    </div>

                    <div className="form-group full-width">

                        <label>Description</label>

                        <textarea
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group full-width">

                        <label>Current Book Cover</label>

                        {currentCover ? (

                            <img
                                src={`http://localhost/BookVault/server/uploads/${currentCover}`}
                                alt="Book Cover"
                                style={{
                                    width: "150px",
                                    borderRadius: "12px",
                                    display: "block",
                                    marginBottom: "15px"
                                }}
                            />

                        ) : (

                            <p>No cover uploaded.</p>

                        )}

                        <label>Replace Cover</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setCover(e.target.files[0])}
                        />

                    </div>

                    <div className="button-group">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/library")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Update Book
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditBook;