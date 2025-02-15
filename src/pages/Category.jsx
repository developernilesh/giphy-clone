import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGif } from "../context/GifContext";
import Gif from "../components/Gif";

const Category = () => {
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const { gif } = useGif();
  const { category } = useParams();
  
  const fetchResults = async () => {
    setLoading(true);
    const { data } = await gif.gifs(category, category, {
      limit: 20,
      offset: offset
    });
    if (offset === 0) {
      setResults(data);
    } else {
      setResults(prev => [...prev, ...data]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setResults([]); // Reset results when category changes
    setOffset(0); // Reset offset
    fetchResults();
  }, [category]);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 && !loading
      ) {
        setOffset(prevOffset => prevOffset + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Fetch more when offset changes
  useEffect(() => {
    if (offset > 0) {
      fetchResults();
    }
  }, [offset]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {results.length > 0 && <Gif gif={results[0]} hover={false} />}
        <span>Don&apos;t tell it to me, GIF it to me!</span>
        <div className="divider"></div>
      </div>
      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split('-').join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {results.length > 0 && (
          <>
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
              {results.slice(1).map((gif) => (
                <Gif gif={gif} key={gif.id} />
              ))}
            </div>
            {loading && (
              <div className="flex w-screen justify-center mt-4">
                <p className="font-bold text-lg gradient py-3 px-6 rounded">Loading more GIFs...</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Category;
