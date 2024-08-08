import "./Login.scss";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { SiSpotify } from "react-icons/si";

function Login() {
  return (
    <div className="login">
      <div className="container">
        <div className="kotta">
          {/* <img src={logo} alt="Spotify logo" /> */}
          <SiSpotify />
          <h1>Spotify</h1>
        </div>
        <Link to="/home">
          {" "}
          <button>Connect Spotify</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
