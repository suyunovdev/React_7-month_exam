import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "antd";
import "./PlaylistDetails.scss";
import { BiPause, BiPlay } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import Saidbar from "./Saidbar";
import FriendActivity from "./RightSidebar";

const PlaylistDetails = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
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

  const handleFavoriteTrack = track => {
    // Get the current list of favorite tracks from local storage
    let favorites = JSON.parse(localStorage.getItem("favoriteTracks")) || [];

    // Check if the track is already in the favorites
    const trackExists = favorites.some(fav => fav.id === track.id);

    if (!trackExists) {
      // Add the track to the favorites array
      favorites.push({
        id: track.id,
        name: track.name,
        artists: track.artists.map(artist => artist.name).join(", "),
        album: track.album.name,
        duration_ms: track.duration_ms,
        preview_url: track.preview_url,
      });

      // Save the updated favorites list back to local storage
      localStorage.setItem("favoriteTracks", JSON.stringify(favorites));

      // Optionally, you could add a notification or feedback for the user
      console.log(`${track.name} has been added to your favorites.`);
    } else {
      console.log(`${track.name} is already in your favorites.`);
    }
  };

  const columns = [
    {
      title: "Track",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <span>{record.track.name}</span>,
    },
    {
      title: "Artist",
      dataIndex: "artists",
      key: "artists",
      render: (_, record) =>
        record.track.artists.map(artist => artist.name).join(", "),
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (_, record) => <span>{record.track.album.name}</span>,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_, record) => (
        <span>
          {Math.floor(record.track.duration_ms / 60000)}:
          {Math.floor((record.track.duration_ms % 60000) / 1000)
            .toString()
            .padStart(2, "0")}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handlePlayTrack(record.track)}
            disabled={!record.track.preview_url}>
            {playingTrack?.id === record.track.id && !audio?.paused ? (
              <BiPause />
            ) : (
              <BiPlay />
            )}
          </Button>
          <Button
            type="default"
            onClick={() => handleFavoriteTrack(record.track)}
            style={{ marginLeft: 10 }}>
            <BsHeart />
          </Button>
        </div>
      ),
    },
  ];

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
          <Table
            columns={columns}
            dataSource={tracks}
            rowKey={record => record.track.id}
          />
          {playingTrack && (
            <div className="player">
              <h2>Now Playing: {playingTrack.name}</h2>
            </div>
          )}
        </div>
      )}
      <FriendActivity />
    </div>
  );
};

export default PlaylistDetails;
