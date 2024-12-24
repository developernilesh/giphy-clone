import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GifContextProvider = ({ children }) => {
  const gif = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);
  const [gifs, setGifs] = useState([])
  const [filter, setFilter] = useState(null);
  const [favourites, setFavourites] = useState(null);

  const addToFavourites = (id) => {
    if(favourites.includes(id)){
      const updatedFavourites = favourites.filter(item=> item !== id)
      localStorage.setItem("favouriteGifs", JSON.stringify(updatedFavourites))
      setFavourites(updatedFavourites)
    } else {
      const updatedFavourites = [...favourites]
      updatedFavourites.push(id)
      localStorage.setItem("favouriteGifs", JSON.stringify(updatedFavourites))
      setFavourites(updatedFavourites)
    }
  }

  useEffect(() => {
    const favouritesGifs = JSON.parse(localStorage.getItem("favouriteGifs")) || []
    setFavourites(favouritesGifs)
  }, []);
  

  const values = {
    gif, gifs, setGifs, filter, setFilter, favourites, setFavourites,addToFavourites
  };
  return <GifContext.Provider value={values}>{children}</GifContext.Provider>;
};

export default GifContextProvider;

export const useGif = () => {
  return useContext(GifContext)
}