import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from './debounce';
import classNames from 'classnames';

import { BASE_URL } from '../../utils/api';
import { getSlug } from '../../utils/formaters';

import './Searcher.scss';

export function Searcher({ currentType, setInfoUrl }) {
  const [search, setSeach] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [nextSuggestionsUrl, setNextSuggestionsUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 1000);  // custom hook for debouncing search input

  useEffect(() => {
    if (debouncedSearch) {
      loadSuggestions(`${BASE_URL}/${currentType}/?search=${debouncedSearch}`);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch, currentType]);

  useEffect(() => {
    if (nextSuggestionsUrl) {
      loadSuggestions(nextSuggestionsUrl, true);
    }
  }, [nextSuggestionsUrl]);

  function loadSuggestions(url, append = false) {
    setIsLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(append) {
          setSuggestions([...suggestions, ...data.results]); // append new suggestions to existing suggestions
        } else {
          setSuggestions(data.results); //first 10 suggestions
        }

        setIsLoading(!!data.next);
        setNextSuggestionsUrl(data.next);
      }).catch(err => console.log(err))
  }

  function handleSearchChange(e) {
    setSeach(e.target.value);
  }
  
  return (
      <div className="Searcher">
        <div className={classNames('Searcher__input-wrapper', {
            loading: isLoading,
          })}
        >
          <input
              type="text"
              value={search}
              placeholder={`Search ${currentType}`}
              onChange={handleSearchChange}
              className={classNames('Searcher__input', {
                open: suggestions.length > 0,
              })}
          />
          <div className={classNames('Searcher__suggestions', {
            open: suggestions.length > 0,
          })}>
            {suggestions.map(item => (
              <div
                key={item.name || item.title}
                className="Searcher__suggestion"
              >
                <Link
                  to={`/info/${currentType}/${getSlug(item.name || item.title)}`}
                  onClick={() => setInfoUrl(item.url)}
                >
                  {item.name || item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
  