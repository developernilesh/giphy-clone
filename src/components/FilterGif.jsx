import React from "react";
import { useGif } from "../context/GifContext";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

const FilterGif = ({ alignLeft = false, showTrending = false }) => {
  const { filters, filter, setFilter } = useGif();
  return (
    <div
      className={`flex my-3 gap-3 ${alignLeft ? "" : "justify-end"} ${
        showTrending
          ? "flex-col sm:flex-row sm:items-center justify-between "
          : ""
      }`}
    >
      {showTrending && (
        <span className="flex gap-2">
          {showTrending && (
            <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
          )}
          <span className="font-semibold text-gray-400">Trending</span>
        </span>
      )}

      <div className="flex min-w-80 rounded-full bg-gray-800">
        {filters.map((fltr, index) => {
          return (
            <span
              key={index}
              onClick={() => setFilter(fltr.value)}
              className={`${
                filter === fltr.value ? fltr.background : ""
              } font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer`}
            >
              {fltr.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGif;
