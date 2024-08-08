import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Favorite.scss";
import { BsHeart } from "react-icons/bs";
import { BiPlay, BiPause } from "react-icons/bi";
import Saidbar from "./Saidbar";
import FriendActivity from "./RightSidebar";
import likesss from "../assets/images/lake.png";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import Footer from "./Footer";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [audio, setAudio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteTracks")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavoriteAndNavigate = (id, playlistId) => {
    if (window.confirm("Haqiqatdan ushbu trekni uchirmoqchimisiz?")) {
      const updatedFavorites = favorites.filter(track => track.id !== id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favoriteTracks", JSON.stringify(updatedFavorites));
      navigate(`/playlist/${playlistId}`);
    }
  };

  const handlePlayTrack = track => {
    if (playingTrack?.id === track.id) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(track.preview_url);
      newAudio.play();
      setAudio(newAudio);
      setPlayingTrack(track);
    }
  };

  return (
    <div className="favorites-page">
      <Saidbar />
      <div className="notest">
        <div className="arrow">
          <IoIosArrowDropleftCircle />
          <IoIosArrowDroprightCircle />
        </div>
        <div className="likess">
          <img src={likesss} alt="" />
          <div className="text">
            <p>PUBLIC PLAYLIST</p>
            <h1>Favorite Tracks</h1>
          </div>
        </div>

        <table className="favorites-table">
          <thead>
            <tr>
              <th>Track</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map(track => (
              <tr key={track.id}>
                <td>{track.name}</td>
                <td>{track.artists}</td>
                <td>{track.album}</td>
                <td>
                  {Math.floor(track.duration_ms / 60000)}:
                  {Math.floor((track.duration_ms % 60000) / 1000)
                    .toString()
                    .padStart(2, "0")}
                </td>
                <td>
                  <button
                    className="play-button"
                    onClick={() => handlePlayTrack(track)}>
                    {playingTrack?.id === track.id && !audio?.paused ? (
                      <BiPause />
                    ) : (
                      <BiPlay />
                    )}
                  </button>
                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFavoriteAndNavigate(track.id, track.playlistId)
                    }>
                    <BsHeart style={{ color: "red" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FriendActivity />
      <Footer />
    </div>
  );
};

export default FavoritesPage;
