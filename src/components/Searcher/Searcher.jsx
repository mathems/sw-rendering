import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../Home/Home.scss';

export function Searcher({ startHeroes, endHeroes}) {
    const [search, setSeach] = useState('');
    const [suggestionList, setSuggestionList] = useState([])

    function handleSearchChange({target}) {
        const { value } = target;

        setSeach(value);
        showSuggestion(value)
    }

    function showSuggestion(value) {
        if (!value) {
            return;
        }

        const allHeroes = [...startHeroes, ...endHeroes];

        setSuggestionList(
            allHeroes.filter(hero => hero.name.toLowerCase().startsWith(value.toLowerCase()))
        )
    }

    return (
      <div className="Searcher">
        <input
            type="text"
            value={search}
            placeholder="Search Hero"
            onChange={handleSearchChange}
            class="form-control form-control-lg place"
            
        />
        {suggestionList.length && (
            <ul>
                {suggestionList.map(suggestion => (
                    <li key={suggestion.slug} className="suggestionItem">
                        <Link to={`/info/${suggestion.slug}`} >{suggestion.name}</Link>
                    </li>
                ))}
            </ul>
        )}
          </div>
    );
  }
  
  
  