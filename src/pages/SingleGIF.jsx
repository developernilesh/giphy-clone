import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGif } from "../context/GifContext";
import Gif from "../components/Gif";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";

const contentType = ["gif", "sticker", "text"];

const SingleGIF = () => {
  const { type, slug } = useParams();
  const [singleGif, setSingleGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gif } = useGif();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gif.gif(gifId[gifId.length - 1]);
    const { data: related } = await gif.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setSingleGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, []);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {singleGif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={singleGif?.user?.avatar_url}
                alt={singleGif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{singleGif?.user?.display_name}</div>
                <div className="faded-text">@{singleGif?.user?.username}</div>
              </div>
            </div>
            {singleGif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? singleGif?.user?.description
                  : singleGif?.user?.description.slice(0, 100) +
                    (singleGif?.user?.description.length > 100 && "...")}
                {singleGif?.user?.description.length > 100 && (
                  <div
                    className="flex items-center faded-text cursor-pointer"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? (
                      <>
                        Read less <HiMiniChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        Read more <HiMiniChevronDown size={20} />
                      </>
                    )}
                  </div>
                )}
              </p>
            )}
          </>
        )}

        <div className="divider"></div>

        {singleGif?.source && (
          <div>
            <span
              className="faded-text" //custom - faded-text
            >
              Source
            </span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={singleGif.source} target="_blank" className="truncate">
                {singleGif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{singleGif.title}</div>
            <Gif gif={singleGif} hover={false} />
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related GIFs</span>
        </div>
      </div>
    </div>
  );
};

export default SingleGIF;
