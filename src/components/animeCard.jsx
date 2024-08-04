import React from 'react';

const AnimeCard = ({ anime }) => {
  return (
    <div className="anime-card">
      <img src={anime.images.jpg.image_url} alt={anime.title} />
      <h3>{anime.title}</h3>
      <p>{anime.type}</p>
    </div>
  );
};

export default AnimeCard;
