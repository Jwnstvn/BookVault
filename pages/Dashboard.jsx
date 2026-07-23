import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import BookCard from "../components/BookCard";

function Dashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalBooks: 0,
        averageRating: 0,
        readingBooks: 0,
        finishedBooks: 0,
    });

    const [books, setBooks] = useState([]);

    useEffect(() => {

        fetch("http://localhost/BookVault/server/api/dashboard.php")

            .then((response) => response.json())

            .then((data) => {

                setStats(data.statistics);

                setBooks(data.recentBooks);

            })

            .catch((error) => console.error(error));

    }, []);

    return (

        <div
            style={{
                background: "#F8FAFC",
                minHeight: "100vh",
            }}
        >

            <Navbar />

            <div style={{ padding: "35px" }}>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2,1fr)",
                        gap: "25px",
                    }}
                >

                    <StatCard
                        icon={<i className="bi bi-book-half"></i>}
                        title="Total Books"
                        value={stats.totalBooks}
                    />

                    <StatCard
                        icon={<i className="bi bi-star-fill"></i>}
                        title="Average Rating"
                        value={stats.averageRating}
                    />

                    <StatCard
                        icon={<i className="bi bi-bookmark-heart-fill"></i>}
                        title="Currently Reading"
                        value={stats.readingBooks}
                    />

                    <StatCard
                        icon={<i className="bi bi-check-circle-fill"></i>}
                        title="Finished Books"
                        value={stats.finishedBooks}
                    />

                </div>

                <div style={{ marginTop: "45px" }}>

                    <h3
                        style={{
                            marginBottom: "20px",
                            color: "#1E293B",
                            fontWeight: "600",
                        }}
                    >
                        Recently Added
                    </h3>

                    {books.map((book) => (

                        <BookCard

                            key={book.id}

                            title={book.title}

                            author={book.author}

                            rating={book.rating}

                            status={book.status}

                            cover={book.cover}

                            onClick={() =>
                                navigate(`/book/${book.id}`)
                            }

                        />

                    ))}

                </div>

            </div>

        </div>

    );

}

export default Dashboard;