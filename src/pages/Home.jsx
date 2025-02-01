import React, { useEffect, useState } from "react";
import { useGif } from "../context/GifContext";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

const Home = () => {
  
  const { gif, gifs, setGifs, filter } = useGif();
  const [offset, setOffset] = useState(0); // Track the offset for pagination
  const [loading, setLoading] = useState(false); // Track loading state

  const fetchTrendingGifs = async () => {
    setLoading(true);
    const { data } = await gif.trending({
      limit: 25,
      type: filter,
      rating: "g",
      offset: offset, // Use the offset for pagination
    });
    setGifs((prevGifs) => [...prevGifs, ...data]); // Append new GIFs to the existing ones
    setLoading(false);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter, offset]); // Fetch GIFs when filter or offset changes

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 && !loading
      ) {
        setOffset((prevOffset) => prevOffset + 25); // Increase the offset to load more GIFs
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div>
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 rounded w-full"
      />

      <FilterGif showTrending={true} />

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {
          gifs.map((gif) => <Gif gif={gif} key={gif?.id} />) // Use gif.id as the key
        }
      </div>

      {loading && (
        <div className="flex w-screen justify-center mt-4">
          <p className="font-bold text-lg gradient py-3 px-6 rounded">Loading more GIFs...</p>
        </div>
      )}
    </div>
  );
};

export default Home;