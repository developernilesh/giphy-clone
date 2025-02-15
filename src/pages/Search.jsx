import React, { useEffect, useState } from "react";
import { useGif } from "../context/GifContext";
import { useParams } from "react-router-dom";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const { gif, filter } = useGif();
  const { query } = useParams();

  const fetchSearchResults = async () => {
    setLoading(true);
    const { data } = await gif.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
      offset: offset,
    });
    setSearchResult(prev => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    setSearchResult([]); // Reset results when query or filter changes
    setOffset(0); // Reset offset
    fetchSearchResults();
  }, [query, filter]);

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
      fetchSearchResults();
    }
  }, [offset]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterGif alignLeft={true} />
      {searchResult.length > 0 ? (
        <>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
            {searchResult.map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
          {loading && (
            <div className="flex w-screen justify-center mt-4">
              <p className="font-bold text-lg gradient py-3 px-6 rounded">Loading more GIFs...</p>
            </div>
          )}
        </>
      ) : (
        <span>
          No GIFs found for {query}. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
};

export default Search;
