// FriendActivity.jsx
import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import "./RightSidebar.scss";
import { CgClose } from "react-icons/cg";

const FriendActivity = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div>
      {isSidebarVisible ? (
        <div className="friend-activity">
          <div className="headers">
            <h3>Friend Activity</h3>
            <button
              className="icon-button"
              onClick={() => setIsSidebarVisible(false)}>
              <BsPerson />
              <CgClose />
            </button>
          </div>
          <div className="friends-list">
            {[1, 2, 3].map((friend, index) => (
              <div className="friend" key={index}>
                <div className="avatar">
                  <BsPerson />
                </div>
                <div className="details">
                  <div className="name"></div>
                  <div className="name"></div>

                  <div className="activity"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="footerrr">
            <p>
              Go to Settings > Social and enable “Share my listening activity on
              Spotify.’ You can turn this off at any time.
            </p>
            <button className="settings-button">SETTINGS</button>
          </div>
        </div>
      ) : (
        <button
          className="open-button"
          onClick={() => setIsSidebarVisible(true)}>
          Open Friend Activity
        </button>
      )}
    </div>
  );
};

export default FriendActivity;
