import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import { useState} from 'react'

import { Info } from '../Info';

import { List } from '../List';
import { Navigation } from '../Navigation';

import './App.scss';


export function App() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [films, setFilms] = useState([]); // change to spaceships

  const [infoUrl, setInfoUrl] = useState('');

  return (
    <div className="App">
      <div className="justify-content">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/people" element={<List dataList={people} setDataList={setPeople} setInfoUrl={setInfoUrl} />} />
            <Route path="/planets" element={<List dataList={planets} setDataList={setPlanets} setInfoUrl={setInfoUrl} />} />
            <Route path="/starships" element={<List dataList={films} setDataList={setFilms} setInfoUrl={setInfoUrl} />} />
            <Route path="/info/:type/:slug" element={<Info infoUrl={infoUrl} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
