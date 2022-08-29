import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";


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
      <h1>Home</h1>
      <div>
        <span>{<Link to={`/${params.page && Number(params.page) > 1 ? Number(params.page) - 1: ''}`} >Prev</Link>}</span>
        <span>Current: {params.page ? params.page : 1}</span>&nbsp;
        <span>{<Link to={`/${params.page && Number(params.page) < maxHerosPage - 1 ? Number(params.page) + 1: 2}`} >Next</Link>}</span>
      </div>

      {displayHeroes?.length && (
          <ul>
          {
              displayHeroes.map(characterObject => (
                  <li key={characterObject.name}>
                    <Link to={`info/${characterObject.slug}`} >{characterObject.name}</Link>
                  </li>
              ))
          }
      </ul>
      )}

    </div>
  );
}


