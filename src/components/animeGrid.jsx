import React from 'react';
import AnimeCard from './animeCard';

const AnimeGrid = ({ animes }) => {
  return (
    <div className="anime-grid">
      {animes.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
};

export default AnimeGrid;
