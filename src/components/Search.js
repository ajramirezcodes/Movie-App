import React, { useState, useEffect } from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [placeholderText, setPlaceHolderText] = useState(
    "Search Through Thousands Of Movies"
  );

  useEffect(() => {
    const handleResize = () => {
      setPlaceHolderText(
        window.innerWidth > 600
          ? "Search Through Thousands Of Movies"
          : "Search..."
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

    

  return (
    <div className="ml-4">
      <div className="flex justify-center items-center">
        <input
          className="flex pl-8 p-1 mt-[2rem] mb-[4rem] w-[80%] h-[3rem] border rounded-lg border-gray-700 bg-gray-700 text-xl text-white placeholder-slate-400"
          type="text"
          placeholder={placeholderText}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
