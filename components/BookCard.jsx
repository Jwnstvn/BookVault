import "../styles/BookCard.css";

function BookCard({
    title,
    author,
    rating,
    status,
    cover,
    onClick
}) {

    return (

        <div
            className="book-card"
            onClick={onClick}
        >

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px"
                }}
            >

                <div className="book-cover">

                    {cover ? (

                        <img
                            src={`http://localhost/BookVault/server/uploads/${cover}`}
                            alt={title}
                        />

                    ) : (

                        <i className="bi bi-book-half"></i>

                    )}

                </div>

                <div className="book-info">

                    <h4>{title}</h4>

                    <p>{author}</p>

                </div>

            </div>

            <div className="book-meta">

                <span className="book-rating">

                    <i className="bi bi-star-fill"></i>

                    {" "}{rating}

                </span>

                <span
                    className={`book-status ${
                        status === "Finished"
                            ? "finished"
                            : "reading"
                    }`}
                >
                    {status}
                </span>

            </div>

        </div>

    );

}

export default BookCard;