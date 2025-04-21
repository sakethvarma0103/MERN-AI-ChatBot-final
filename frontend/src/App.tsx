import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/Book";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import AddBook from "./pages/Add";
import ReadBook from "./pages/ReadBook";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/MyProfile";
function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/books" element={<Books />} />
        )}
        <Route path="*" element={<NotFound />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/read/:id" element={<ReadBook />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;
