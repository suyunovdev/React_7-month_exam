import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { BsHeart } from "react-icons/bs";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteTracks")) || [];
    setFavorites(storedFavorites);
  }, []);

  const columns = [
    {
      title: "Track",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <span>{record.name}</span>,
    },
    {
      title: "Artist",
      dataIndex: "artists",
      key: "artists",
      render: (_, record) => record.artists,
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (_, record) => <span>{record.album}</span>,
    },
    {
      title: "Duration",
      dataIndex: "duration_ms",
      key: "duration",
      render: duration => (
        <span>
          {Math.floor(duration / 60000)}:
          {Math.floor((duration % 60000) / 1000)
            .toString()
            .padStart(2, "0")}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="default" onClick={() => removeFavorite(record.id)}>
          <BsHeart />
        </Button>
      ),
    },
  ];

  const removeFavorite = id => {
    const updatedFavorites = favorites.filter(track => track.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteTracks", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h1>Favorite Tracks</h1>
      <Table
        columns={columns}
        dataSource={favorites}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default FavoritesPage;
