import React from "react";
import Heading from "../inputs/Heading";

const Categories = ({categoriesData, selectedCategories, handleCategoryClick}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Select category of product" />
      <div className="flex flex-wrap gap-2">
        {categoriesData?.map((category) => (
          <button
            className="border-blue-500 border-2 px-3 py-1 rounded-md"
            key={category}
            onClick={() => handleCategoryClick(category)}
            style={{
              backgroundColor: selectedCategories.includes(category)
                ? "lightblue"
                : "white",
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
