import React, { useEffect, useState } from "react";
import { useGif } from "../context/GifContext";
import Gif from "../components/Gif";

const Favourites = () => {
  const {gif, favourites} = useGif();
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);

  const fetchFavoriteGIFs = async () => {
    const {data: gifs} = await gif.gifs(favourites);
    setFavoriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text font-bold">My Favourites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoriteGIFs.map((gf) => (
          <Gif gif={gf} key={gf.id} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
