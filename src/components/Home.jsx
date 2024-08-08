import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hook/useFetch";
import Saidbar from "./Saidbar";
import "./Home.scss";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import RightSidebar from "./RightSidebar";
import { TailSpin } from "react-loader-spinner";
import MadeForYou from "./Playlist/MadeForyou";
import RecentPlayed from "./Playlist/RecentPlayed";
import Jumpbackin from "./Playlist/Jumpbackin";
import Uniquelyyours from "./Playlist/Uniquelyyours";

function Home() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

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
      } finally {
        setLoading(false);
      }
    };
    getToken();
  }, []);

  const [data] = useFetch(token ? "/featured-playlists" : null);
  const [typs] = useFetch(token ? "/categories/toplists/playlists" : null);

  const toplists = typs?.playlists?.items;
  const playlist = data?.playlists?.items;

  return (
    <div className="home">
      <Saidbar />

      {loading ? (
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
      ) : (
        <div className="homes">
          <div className="arrow">
            <IoIosArrowDropleftCircle />
            <IoIosArrowDroprightCircle />
          </div>

          <h1>Good afternoon</h1>
          <div className="topplist">
            {toplists &&
              toplists.map(item => (
                <div
                  key={item.id}
                  className="top"
                  onClick={() => navigate(`/playlist/${item.id}`)}>
                  <img src={item.images[0].url} alt={item.name} />
                  {item.name}
                </div>
              ))}
          </div>
          <div className="playlist">
            <div className="see">
              <h1>Your top mixes</h1>
              <h2 onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "See All"}
              </h2>
            </div>
            <div className="passer">
              {playlist &&
                (showAll ? playlist : playlist.slice(0, 4)).map(item => (
                  <div
                    key={item.id}
                    className="playlist-item"
                    onClick={() => navigate(`/playlist/${item.id}`)}>
                    <img src={item.images[0].url} alt={item.name} />
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
            </div>
          </div>
          <MadeForYou />
          <RecentPlayed />
          <Jumpbackin />
          <Uniquelyyours />
        </div>
      )}

      <RightSidebar />
    </div>
  );
}

export default Home;
