import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiPause, BiPlay } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Saidbar from "./Saidbar";
import FriendActivity from "./RightSidebar";
import Footer from "./Footer";
import "./PlaylistDetails.scss";

const PlaylistDetails = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [favoriteTracks, setFavoriteTracks] = useState([]);

  useEffect(() => {
    // ID ning mavjudligini tekshirish
    if (!id) {
      console.error("Playlist ID is missing");
      return;
    }

    const fetchPlaylistDetails = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch playlist details");
        }
        const data = await res.json();
        setPlaylist(data);
        setTracks(data.tracks.items);
      } catch (error) {
        console.log("Error fetching playlist details: ", error);
      }
    };
    fetchPlaylistDetails();
  }, [id]);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteTracks")) || [];
    setFavoriteTracks(storedFavorites);
  }, []);

  const handlePlayTrack = track => {
    if (playingTrack?.id === track.id) {
      setPlaying(!playing);
    } else {
      setPlayingTrack(track);
      setPlaying(true);
    }
  };

  const handleFavoriteTrack = track => {
    let favorites = [...favoriteTracks];
    const trackExists = favorites.some(fav => fav.id === track.id);

    if (!trackExists) {
      favorites.push({
        id: track.id,
        name: track.name,
        artists: track.artists.map(artist => artist.name).join(", "),
        album: track.album.name,
        duration_ms: track.duration_ms,
        preview_url: track.preview_url,
      });
      console.log(`${track.name} has been added to your favorites.`);
    } else {
      if (playingTrack?.id === track.id) {
        setPlayingTrack(null);
        setPlaying(false);
      }
      favorites = favorites.filter(fav => fav.id !== track.id);
      console.log(`${track.name} has been removed from your favorites.`);
    }

    setFavoriteTracks(favorites);
    localStorage.setItem("favoriteTracks", JSON.stringify(favorites));
  };

  const isTrackFavorite = track => {
    return favoriteTracks.some(fav => fav.id === track.id);
  };

  return (
    <div className="playlist-details">
      <Saidbar />

      {playlist && (
        <div className="note">
          <div className="mains">
            <img
              className="imgsss"
              src={playlist.images[0].url}
              alt={playlist.name}
            />
            <h1>{playlist.name}</h1>
            <h1>{playlist.artist}</h1>
          </div>
          <table className="tracks-table">
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
              {tracks.map(record => (
                <tr key={record.track.id}>
                  <td>{record.track.name}</td>
                  <td>
                    {record.track.artists.map(artist => artist.name).join(", ")}
                  </td>
                  <td>{record.track.album.name}</td>
                  <td>
                    {Math.floor(record.track.duration_ms / 60000)}:
                    {Math.floor((record.track.duration_ms % 60000) / 1000)
                      .toString()
                      .padStart(2, "0")}
                  </td>
                  <td>
                    <button
                      onClick={() => handlePlayTrack(record.track)}
                      className="play-button"
                      disabled={!record.track.preview_url}>
                      {playingTrack?.id === record.track.id && playing ? (
                        <BiPause />
                      ) : (
                        <BiPlay />
                      )}
                    </button>
                    <button
                      onClick={() => handleFavoriteTrack(record.track)}
                      className="favorite-button"
                      style={{ marginLeft: 10 }}>
                      {isTrackFavorite(record.track) ? (
                        <BsHeartFill style={{ color: "red" }} />
                      ) : (
                        <BsHeart />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <FriendActivity />
      <Footer
        playingTrack={playingTrack}
        playing={playing}
        setPlaying={setPlaying}
      />
    </div>
  );
};

export default PlaylistDetails;
