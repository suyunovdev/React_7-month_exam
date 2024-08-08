import { useEffect, useState } from "react";
import "./MadeForYou.scss";

const MadeForYou = () => {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                `${import.meta.env.VITE_CLIENT_ID}:${
                  import.meta.env.VITE_CLIENT_SECRET
                }`
              ),
          },
          body: "grant_type=client_credentials",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch token");
        }
        const auth = await res.json();
        const token = `${auth.token_type} ${auth.access_token}`;
        localStorage.setItem("access_token", token);
        setToken(token);
      } catch (error) {
        console.log("Error fetching token: ", error);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchPlaylists = async () => {
        try {
          const res = await fetch(
            "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (!res.ok) {
            throw new Error("Failed to fetch playlists");
          }
          const data = await res.json();
          setPlaylists(data.playlists.items);
        } catch (error) {
          console.log("Error fetching playlists: ", error);
        }
      };
      fetchPlaylists();
    }
  }, [token]);

  return (
    <div className="playlist">
      <div className="see">
        <h1>Made for You</h1>
        <h2 onClick={() => setShowAll(!showAll)}>
          {showAll ? "SHOW LESS" : "SEE ALL"}
        </h2>
      </div>

      <div className="passer">
        {(showAll ? playlists : playlists.slice(0, 4)).map(item => (
          <div key={item.id} className="playlist-item">
            <img src={item.images[0].url} alt={item.name} />
            <p>{item.name}</p>
            {/* <p>{item.name}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MadeForYou;
