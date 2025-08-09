import React from "react";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="bg-gray-800 p-5 rounded-2xl shadow-xl mt-8 min-w-[175px] max-w-[500px] hover:border hover:border-[2px] border-orange-700">
      <img
        className="round-lg h-auto w-full object-cover"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s`
        }
        alt={title}
      />
      <div className="mt-4">
        <h3 className="text-slate-100">{title}</h3>
        <div className="inline-flex gap-1 mt-2 ">
          <img
            className="w-[20px] h-[20px]"
            src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000"
          />
          <p className="text-slate-100">
            {vote_average ? vote_average.toFixed(1) : "N/A"}
          </p>
          <span className="text-slate-300">•</span>
          <p className="text-slate-500">{original_language.toUpperCase()}</p>
          <span className="text-slate-300">•</span>
          <p className="text-slate-500">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
