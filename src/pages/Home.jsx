import React, { useEffect } from "react";
import { useGif } from "../context/GifContext";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

const Home = () => {
  const { gif, gifs, setGifs, filter } = useGif();

  const fetchTrendingGifs = async () => {
    const { data } = await gif.trending({
      limit: 25,
      type: filter,
      rating: "g",
    });
    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return (
    <div>
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 rounded w-full"
      />

      <FilterGif showTrending={true}/>

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {!Object.keys(gifs).length ? (
          <div className="flex w-screen justify-center mt-24">
            <p className="font-bold text-lg gradient py-3 px-6 rounded">Loading...</p>
          </div>
        ) : (
          gifs.map((gif) => <Gif gif={gif} key={gif?.title} />)
        )}
      </div>
    </div>
  );
};

export default Home;
