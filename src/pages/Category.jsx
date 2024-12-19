import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();

  return (
    <div>
      <p>
        Category: <span>{category}</span>
      </p>
    </div>
  );
};

export default Category;
