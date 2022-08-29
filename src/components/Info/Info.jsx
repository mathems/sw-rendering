import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Info({ startHeroes, endHeroes }) {
    const [selectedHero, setSelectedHero] = useState({});
    const params = useParams();
    const { slug } = params;

    useEffect(() => {
      setHero()
    }, [slug, startHeroes, endHeroes]);

    function setHero() {
      const foundHero = [...startHeroes, ...endHeroes].find(hero => hero.slug === slug);
      setSelectedHero(foundHero);
    }

    return (
      <div className="Info">
        <h1>Info</h1>
        {selectedHero && (
          <div className="asdf">
            <h2>{selectedHero.name}</h2>
            <p>{selectedHero.gender}</p>
          </div>
        )
        }
      </div>
    );
  }
  
  
  