import React, { createContext, useState } from "react";

// Create a context for managing favorites
export const FavoriteContext = createContext();

// Create a provider component
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Function to add a track to favorites
  const addFavorite = track => {
    setFavorites(prevFavorites => [...prevFavorites, track]);
  };

  // Function to remove a track from favorites
  const removeFavorite = trackId => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(track => track.id !== trackId)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
