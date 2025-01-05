import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsFeed.css'; // Import the styles

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [authorFilter, setAuthorFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [keyword, setKeyword] = useState('');

  const [filteredNews, setFilteredNews] = useState([]);

  // Fetch news from API
  useEffect(() => {
    axios
      .get('https://newsdata.io/api/1/latest', {
        params: {
          apikey: 'pub_644432f53d36ac53218302c82702b06c547e4',
          q: keyword || 'default',
          language: 'en',
        },
      })
      .then((response) => {
        setNews(response.data.results);
        setFilteredNews(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [keyword]);

  // Helper function to limit the description to 8 words
  const truncateDescription = (description) => {
    if (!description) {
      return ''; // If no description, return an empty string
    }
  
    const words = description.split(' ');
    if (words.length > 8) {
      return words.slice(0, 8).join(' ') + '...';
    }
    return description;
  };
  

  // Handle search and filters
  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthorFilter(event.target.value);
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...news];

    if (authorFilter) {
      filtered = filtered.filter(article =>
        article.creator && article.creator.join(', ').toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    if (dateFrom) {
      filtered = filtered.filter(article =>
        new Date(article.pubDate) >= new Date(dateFrom)
      );
    }
    if (dateTo) {
      filtered = filtered.filter(article =>
        new Date(article.pubDate) <= new Date(dateTo)
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(article =>
        article.type && article.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    setFilteredNews(filtered);
  };

  // Clear filters
  const clearFilters = () => {
    setAuthorFilter('');
    setDateFrom('');
    setDateTo('');
    setTypeFilter('');
    setKeyword('');
    setFilteredNews(news);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="news-container">
      {/* Global Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search articles..."
          value={keyword}
          onChange={handleSearch}
        />
      </div>

      {/* Filter Section */}
      <div className="filters">
        <div className="filter-item">
          <label>Author: </label>
          <input
            type="text"
            value={authorFilter}
            onChange={handleAuthorChange}
            placeholder="Filter by author"
          />
        </div>

        <div className="filter-item">
          <label>From: </label>
          <input
            type="date"
            value={dateFrom}
            onChange={handleDateFromChange}
          />
        </div>
        <div className="filter-item">
          <label>To: </label>
          <input
            type="date"
            value={dateTo}
            onChange={handleDateToChange}
          />
        </div>

        <div className="filter-item">
          <label>Type: </label>
          <select value={typeFilter} onChange={handleTypeChange}>
            <option value="">All</option>
            <option value="news">News</option>
            <option value="blog">Blog</option>
          </select>
        </div>

        <div className="filter-buttons">
          <button className="btn apply-btn" onClick={applyFilters}>Apply Filters</button>
          <button className="btn clear-btn" onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>

      {/* Displaying the number of articles */}
      <p>Total Articles: {filteredNews.length}</p>

      <ul className="news-list">
        {filteredNews.map((article, index) => (
          <li key={index} className="article-card">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <h4>{article.title}</h4>
              <p>{truncateDescription(article.description)}</p>
            </a>
            <div className="article-details">
              <p><strong>Author:</strong> {article.creator ? article.creator.join(', ') : 'Unknown'}</p>
              <p><strong>Date:</strong> {new Date(article.pubDate).toLocaleDateString()}</p>
              <p><strong>Type:</strong> {article.type}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
