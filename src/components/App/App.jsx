import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import { useEffect, useState} from 'react'

import { Home } from '../Home';
import { Info } from '../Info';

import './App.css';

const basePeopleUrl = 'https://swapi.dev/api/people/?format=json'

export function App() {
  const [startCharacters, setStartCharacters] = useState([])
  const [allCharacters, setAllCharacters] = useState([])

  const loadData = async (url) =>{
    const res = await fetch(url)
    const data = await res.json()
    return data 
}

  useEffect(()=>{
    loadStartCharacters();
    //loadAllCharacters()
  }, [])


async function loadStartCharacters(){
  const data = await loadData(basePeopleUrl)
  setStartCharacters(data)
}

async function loadAllCharacters(){

  const loadedHeroes = []
  let currentLoadedObject = startCharacters

  while(startCharacters && startCharacters.next){
    const currLoadUrl = `${basePeopleUrl}/?page=${currentLoadedObject.next}`
    const data = await fetch(currLoadUrl)
    debugger
    loadedHeroes.push(data)
    currentLoadedObject = data
  }
  console.log(loadedHeroes)
}

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/home' element={<Home startCharacters={startCharacters?.results} />}/>
          <Route path='/info' element={<Info/>}/>
        </Routes>
      </Router>
    </div>
  );
}


