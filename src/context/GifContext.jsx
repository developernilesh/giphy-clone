import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

const GifContext = createContext();

const GifContextProvider = ({ children }) => {
  

  const gif = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);
  const [gifs, setGifs] = useState([])
  const [filter, setFilter] = useState(filters[0].value);
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
    gif, gifs, setGifs, filters, filter, setFilter, favourites, setFavourites,addToFavourites
  };
  return <GifContext.Provider value={values}>{children}</GifContext.Provider>;
};

export default GifContextProvider;

export const useGif = () => {
  return useContext(GifContext)
}