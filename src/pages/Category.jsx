import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGif } from "../context/GifContext";
import Gif from "../components/Gif";

const Category = () => {
  const [results, setResults] = useState([]);
  const {gif} = useGif()
  const { category } = useParams();
  
  const fetchResults = async () => {
    const {data} = await gif.gifs(category,category);
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {results.length>0 && <Gif gif={results[0]} hover={false}/>}
        <span>
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <div className="w-full h-0.5 my-6 bg-gray-800"></div>
      </div>
      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split('-').join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {results.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {results.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
