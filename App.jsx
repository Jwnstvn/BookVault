import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/library"
                    element={<Library />}
                />

                <Route
                    path="/book/:id"
                    element={<BookDetails />}
                />

                <Route
                    path="/add-book"
                    element={<AddBook />}
                />

                <Route
                    path="/edit-book/:id"
                    element={<EditBook />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;