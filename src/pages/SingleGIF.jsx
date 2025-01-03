import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGif } from "../context/GifContext";
import Gif from "../components/Gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contentType = ["gif", "sticker", "text"];

const SingleGIF = () => {
  const { type, slug } = useParams();
  const [singleGif, setSingleGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gif, favourites, addToFavourites } = useGif();

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

  const shareGif = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("URL copied to clipboard!", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error("Failed to copy the URL. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  const EmbedGif = () => {
    const currentUrl = window.location.href;
    
    const gifIdMatch = currentUrl.match(/\/gif\/.*-([a-zA-Z0-9]+)$/);
    if (!gifIdMatch || gifIdMatch.length < 2) {
      toast.error("Failed to Embed Code. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    const gifId = gifIdMatch[1];
    
    const embedCode = `<div style="width: 100%; height: 0; padding-bottom: 71%; position: relative"><iframe src="https://giphy.com/embed/${gifId}" width="100%" height="100%" style="position: absolute" frameborder="0" class="giphy-embed" allowfullscreen></iframe></div><p><a href="${currentUrl}">via GIPHY</a></p>`;

    navigator.clipboard.writeText(embedCode).then(() => {
      toast.success("Embed code copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
      });
    });
  };

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
              <div className="py-4 whitespace-pre-line text-sm text-gray-400">
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
              </div>
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
            {/* Mobile UI */}
            <div className="flex sm:hidden gap-1">
              <img
                src={singleGif?.user?.avatar_url}
                alt={singleGif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{singleGif?.user?.display_name}</div>
                <div className="faded-text">@{singleGif?.user?.username}</div>
              </div>
              <button className="ml-auto">
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavourites(singleGif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favourites?.includes(singleGif.id) ? "text-red-500" : ""
                }`}
              />
              Favorite
            </button>
            <button
              onClick={shareGif} // Assignment
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={EmbedGif} // Assignment
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((item) => (
              <Gif gif={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SingleGIF;
