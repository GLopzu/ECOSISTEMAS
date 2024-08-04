export const fetchAnimes = async (searchQuery, limit, type) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=${limit}&type=${type}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  