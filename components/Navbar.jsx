import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState("");

    const [results, setResults] = useState([]);

    useEffect(() => {

        if (search.trim() === "") {

            setResults([]);

            return;

        }

        fetch(`http://localhost/BookVault/server/api/book.php?search=${encodeURIComponent(search)}`)
            .then((response) => response.json())
            .then((data) => {

                setResults(data);

            })
            .catch((error) => {

                console.error(error);

            });

    }, [search]);

    const logout = () => {

        fetch("http://localhost/BookVault/server/api/logout.php", {

            credentials: "include"

        })
        .then((response) => response.json())
        .then((data) => {

            if (data.success) {

                navigate("/");

            }

        })
        .catch((error) => {

            console.error(error);

            alert("Logout failed.");

        });

    };

    return (

        <header className="navbar">

            {/* Left Side */}

            <div className="navbar-left">

                <div className="logo">

                    <i className="bi bi-book-half"></i>

                    <span>
                        Book<span className="vault">Vault</span>
                    </span>

                </div>

                <nav className="nav-links">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/library"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }
                    >
                        Library
                    </NavLink>

                </nav>

            </div>

            {/* Right Side */}

            <div className="navbar-right">

                <div className="search-box">

                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Search books..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {results.length > 0 && (

                        <div className="search-results">

                            {results.map((book) => (

                                <div
                                    key={book.id}
                                    className="search-item"
                                    onClick={() => {

                                        navigate(`/book/${book.id}`);

                                        setSearch("");

                                        setResults([]);

                                    }}
                                >

                                    <strong>{book.title}</strong>

                                    <small>{book.author}</small>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

                <div className="profile">

                    <div
                        className="profile-info"
                        onClick={() => setOpen(!open)}
                    >

                        <i className="bi bi-person-circle"></i>

                        <span>Admin</span>

                        <i className="bi bi-chevron-down"></i>

                    </div>

                    {open && (

                        <div className="profile-menu">

                            <button onClick={logout}>

                                <i className="bi bi-box-arrow-right"></i>

                                Logout

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}

export default Navbar;