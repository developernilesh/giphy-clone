import React, { useState } from "react";
import { useGif } from "../context/GifContext";
import { useParams } from "react-router-dom";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);

  const {gif,filter} = useGif();

  const {query} = useParams();

  const fetchSearchResults = async () => {
    const {data} = await gif.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });
    setSearchResult(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter]);
  
  return <div>Search</div>;
};

export default Search;
