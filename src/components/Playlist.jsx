import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

function MadeForYou({ token }) {
  const [madeForYouPlaylist, setMadeForYouPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMadeForYou = async () => {
      try {
        const res = await fetch(
          "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch made for you playlists");
        }
        const data = await res.json();
        setMadeForYouPlaylist(data.playlists.items);
      } catch (error) {
        console.log("Error fetching made for you playlists: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMadeForYou();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="spinner">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="playlist">
      <div className="see">
        <h1>Made For You</h1>
      </div>
      <div className="passer">
        {madeForYouPlaylist &&
          madeForYouPlaylist.map(item => (
            <div key={item.id} className="playlist-item">
              <img src={item.images[0].url} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MadeForYou;
