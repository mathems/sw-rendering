import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import './Home.scss';
import { Searcher } from '../Searcher';



export function Home({startHeroes, endHeroes, maxHerosPage}) {
  const [displayHeroes, setDispayHeroes] = useState([])
  let params = useParams();
 


  useEffect(() => {
    const formatedPage = params.page ? Number(params.page) : 1;

    if(formatedPage > 1) {
      setDispayHeroes(
        endHeroes.filter((hero, i) => Math.ceil(i / 10) === formatedPage)
      )
    } else {
      setDispayHeroes(startHeroes);
    }
  }, [params])


  return (
    <div className="Home">
      <div className="justify-content">
        <h1 className="Home-Title center">Star Wars: Galaxy of Heroes</h1>
          </div>  
            <div className="justify-content">
              <div className="end">
                <Searcher startHeroes={startHeroes} endHeroes={endHeroes} />
              </div>
                  <div className="start">
                     {displayHeroes?.length && (
                        <ul  className="list-group-flush ">
                      {
                        displayHeroes.map(characterObject => (
                       <li className="Home-Hero list-group-item" key={characterObject.name}>
                       <Link to={`info/${characterObject.slug}`} >{characterObject.name}</Link>
                      </li>
                        ))
                       }
                        </ul>
                        )}
                      </div>
          <div className="center">
            <span>{<Link to={`/${params.page && Number(params.page) > 1 ? Number(params.page) - 1: ''}`} >Prev</Link>}</span>
            <span>Current: {params.page ? params.page : 1}</span>&nbsp;
            <span>{<Link to={`/${params.page && Number(params.page) < maxHerosPage - 1 ? Number(params.page) + 1: 2}`} >Next</Link>}</span>
          </div>
        </div>
    </div>
  );
}


