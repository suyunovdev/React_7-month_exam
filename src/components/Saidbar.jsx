import { BiHome, BiLibrary, BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom"; // Import Link
import "./Saidbar.scss";
import create from "../assets/images/create.png";
import liked from "../assets/images/liked.png";

function Saidbar() {
  return (
    <div className="saidbarr">
      <div className="container">
        <div className="one">
          <h1>
            <BiHome />
            <Link to="/home" className="linkd">
              {" "}
              Home
            </Link>
          </h1>
          <h1>
            <BiSearch />
            Search
          </h1>
          <h1>
            <BiLibrary />
            Your Library
          </h1>
        </div>
        <div className="two">
          <h1>
            <img src={create} alt="Create Playlist" />
            Create Playlist
          </h1>
          <h1>
            <img src={liked} alt="Liked Songs" />
            <Link to="/favorites" className="linkd">
              Liked Songs
            </Link>
          </h1>
        </div>
        <div className="three">
          <ul>
            <li>
              <a href="/">Chill Mix</a>
            </li>
            <li>
              <a href="/">Insta Hits</a>
            </li>
            <li>
              <a href="/">Your Top Songs 2021</a>
            </li>
            <li>
              <a href="/">Mellow Songs</a>
            </li>
            <li>
              <a href="/">Anime Lofi & Chillhop Music</a>
            </li>
            <li>
              <a href="/">BG Afro “Select” Vibes</a>
            </li>
            <li>
              <a href="/">Afro “Select” Vibes</a>
            </li>
            <li>
              <a href="/">Happy Hits!</a>
            </li>
            <li>
              <a href="/">Instrumental Study</a>
            </li>
            <li>
              <a href="/">OST Compilations</a>
            </li>
            <li>
              <a href="/">Nostalgia for old souled mill...</a>
            </li>
            <li>
              <a href="/">Mixed Feelings</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Saidbar;
