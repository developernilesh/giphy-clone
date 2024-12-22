import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGif } from "../context/GifContext";

const contentType = ["gif", "sticker", "text"];

const SingleGIF = () => {
  const {type, slug} = useParams();
  const [singleGif, setSingleGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);

  const {gif} = useGif();

  const fetchGif = async () => {
    const gifId = slug.split('-')
    const {data} = await gif.gif(gifId[gifId.length-1]);
    const {data:related} = await gif.related(gifId[gifId.length-1],{limit:10});
    setSingleGif(data);
    setRelatedGifs(related);
  }

  useEffect(() => {
    if(!contentType.includes(type)){
      throw new Error("Invalid Content Type");
    }
    fetchGif()
  }, [third]);
  

  return <div>SingleGIF</div>;
};

export default SingleGIF;
