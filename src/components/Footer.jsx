import React from "react";
import ReactPlayer from "react-player";
import "./Footer.scss";

const Footer = ({ playingTrack, playing, setPlaying }) => {
  return (
    <div className="footer">
      {/* Boshqa footer elementlari */}

      {playingTrack && (
        <div className="footer-player">
          <ReactPlayer
            url={playingTrack.preview_url}
            playing={playing}
            controls={true}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            height="50px"
            width="100%"
          />
        </div>
      )}
    </div>
  );
};

export default Footer;
