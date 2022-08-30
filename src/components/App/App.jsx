import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import { useEffect, useState} from 'react'

import { Home } from '../Home';
import { Info } from '../Info';
import { Searcher } from '../Searcher';

import './App.css';


const BASE_URL = 'https://swapi.dev/api/people'

export function App() {
  const [startHeroes, setStartHeroes] = useState([]);
  const [endHeroes, setEndHeroes] = useState([]);
  const [maxHerosPage, setMaxHeroPage] = useState(10)

  useEffect(() => {
    loadStateHeroes();
  }, []);


  function loadStateHeroes() {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        setStartHeroes(data.results.map(result => slugify(result)));
        loadEndHeroes(data);
      })
  }

  async function loadEndHeroes(startLoadingObj) {
    const loadedHeroes = [];
    let currLoadingObj = startLoadingObj;
    setMaxHeroPage(Math.ceil(startLoadingObj.count / 10))

    while (currLoadingObj?.next) {
      currLoadingObj = await fetch(currLoadingObj.next).then(response => response.json());
      loadedHeroes.push(...currLoadingObj.results.map(result => slugify(result)));
    }

    setEndHeroes(loadedHeroes)
  }

  function slugify(heroObject) {

    const slug = heroObject.name.toLowerCase().split(' ').join('-');

    return {
      ...heroObject,
      slug
    }
  }

  return (
    <div className="justify-content">
      <Router>
      <div className="flex-start">
          <Searcher startHeroes={startHeroes} endHeroes={endHeroes} />
      </div>
        <Routes>
          <Route path='/' element={<Home startHeroes={startHeroes} endHeroes={endHeroes} maxHerosPage={maxHerosPage} />} >
            <Route path='/:page' element={<Home startHeroes={startHeroes} endHeroes={endHeroes} />} />
          </Route>
          <Route path='/info/:slug' element={<Info startHeroes={startHeroes} endHeroes={endHeroes} />}/>
        </Routes>
      </Router>
      </div>
  );
}


