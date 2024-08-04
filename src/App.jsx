import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import SearchBar from './components/searchBar';
import AnimeGrid from './components/animeGrid';
import { fetchAnimes } from './services/animeService';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(24);
  const [type, setType] = useState('');
  const [animes, setAnimes] = useState([]);
  const [error, setError] = useState('');

  const debouncedFetchAnimes = useCallback(
    debounce(async (query, lim, typ) => {
      try {
        const data = await fetchAnimes(query, lim, typ);
        setAnimes(data);
        if (data.length === 0) {
          setError('No results found.');
        } else {
          setError('');
        }
      } catch (err) {
        setError('Error fetching data.');
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetchAnimes(searchQuery, limit, type);
  }, [searchQuery, limit, type, debouncedFetchAnimes]);

  return (
    <div className="App">
      <h1>Anime Search</h1>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        limit={limit}
        setLimit={setLimit}
        type={type}
        setType={setType}
      />
      {error && <div className="error-message">{error}</div>}
      <AnimeGrid animes={animes} />
    </div>
  );
};

export default App;
