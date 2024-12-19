import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

const GifContext = createContext();

const GifContextProvider = ({ children }) => {
  const gif = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);
  const [gifs, setGifs] = useState([])
  const [filter, setFilter] = useState(null);
  const [favourites, setFavourites] = useState(null);

  const values = {
    gif, gifs, setGifs, filter, setFilter, favourites, setFavourites
  };
  return <GifContext.Provider value={values}>{children}</GifContext.Provider>;
};

export default GifContextProvider;

export const useGif = () => {
  return useContext(GifContext)
}