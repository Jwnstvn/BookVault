import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/AddBook.css";

function AddBook() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("1");
    const [status, setStatus] = useState("Reading");
    const [description, setDescription] = useState("");
    const [cover, setCover] = useState(null);

    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();

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

        fetch("http://localhost/BookVault/server/api/add_book.php", {

            method: "POST",

            body: formData

        })

        .then((response) => response.json())

        .then((data) => {

            if (data.success) {

                alert("Book added successfully!");

                navigate("/library");

            } else {

                alert(data.message || "Failed to add book.");

            }

        })

        .catch((error) => {

            console.error(error);

            alert("Something went wrong.");

        });

    };

    return (
        <div className="addbook-page">

            <Navbar />

            <div className="addbook-container">

                <h2>Add New Book</h2>

                <p>
                    Fill in the information below to add a new book to your collection.
                </p>

                <form
                    className="book-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label>Book Title</label>

                        <input
                            type="text"
                            placeholder="Enter book title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Author</label>

                        <input
                            type="text"
                            placeholder="Enter author's name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Genre</label>

                        <input
                            type="text"
                            placeholder="Enter genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Published Year</label>

                        <input
                            type="number"
                            placeholder="e.g. 2018"
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
                            placeholder="Write a short description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group full-width">

                        <label>Book Cover</label>

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
                            Save Book
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddBook;