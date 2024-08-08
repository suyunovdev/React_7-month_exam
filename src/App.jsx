import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PlaylistDetails from "./components/PlaylistDetails";
import FavoritesPage from "./components/Favorites";
import Login from "./components/Login";
import { FavoriteProvider } from "./context/FavoriteContext"; // Import to'g'ri

function App() {
  return (
    <FavoriteProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/playlist/:id" element={<PlaylistDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </FavoriteProvider>
  );
}

export default App;
