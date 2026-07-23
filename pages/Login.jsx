import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

        fetch("http://localhost/BookVault/server/api/login.php", {

            method: "POST",

            credentials: "include",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                username,
                password

            })

        })

        .then((response) => response.json())

        .then((data) => {

            if (data.success) {

                alert("Login Successful!");

                navigate("/dashboard");

            } else {

                alert(data.message);

            }

        })

        .catch((error) => {

            console.error(error);

            alert("Something went wrong.");

        });

    };

    return (

        <div className="login-page">

            <div className="login-container">

                {/* LEFT PANEL */}

                <div className="login-left">

                    <div className="brand">

                        <h1>
                            BOOK<span>VAULT</span>
                        </h1>

                        <p className="subtitle">
                            Personal Library Management System
                        </p>

                        <p className="description">
                            Organize your favorite books, keep track of your
                            reading, rate titles, and build your own digital
                            bookshelf.
                        </p>

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="login-right">

                    <div className="login-card">

                        <h2>Welcome Back</h2>

                        <p>
                            Login to continue to BookVault
                        </p>

                        <form>

                            <div className="mb-3">

                                <label>Username</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />

                            </div>

                            <div className="mb-4">

                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                            </div>

                            <button
                                className="btn login-btn w-100"
                                type="button"
                                onClick={handleLogin}
                            >
                                Login
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;