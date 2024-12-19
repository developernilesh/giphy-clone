import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.svg";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { useGif } from "../context/GifContext";
import GifSearch from "./GifSearch";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gif } = useGif();

  const fetchCategories = async () => {
    const { data } = await gif.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img className="w-8" src={logo} alt="GiphyLogo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>

        <div className="font-bold text-md flex gap-2 items-center">
          {/* render categories */}
          {categories?.slice(0, 5)?.map((category, idx) => (
            <Link
              to={`/${category.name_encoded}`}
              key={idx}
              className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
            >
              {category.name}
            </Link>
          ))}
          <button>
            <HiEllipsisVertical
              size={35}
              onClick={() => setShowCategories(!showCategories)}
              className={`py-1 ${
                showCategories ? "gradient" : ""
              } hover:gradient border-b-4 hidden lg:block`}
            />
          </button>

          <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
            <Link to="/favourites">Favourite GIFs</Link>
          </div>

          <button className="block lg:hidden">
            <HiMiniBars3BottomRight size={30} className="text-sky-400" />
          </button>
        </div>

        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category, idx) => (
                <Link
                  to={`/${category.name_encoded}`}
                  key={category.name_encoded}
                  className="font-bold"
                  onClick={() => setShowCategories(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* search */}
      <GifSearch />
    </div>
  );
};

export default Navbar;
