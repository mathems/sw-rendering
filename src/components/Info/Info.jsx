import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";

import { isValidKey, getNameFromKey } from "../../utils/formaters";

import './Info.scss';

export function Info({ infoUrl }) {
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInfo();
  }, []);

  function loadInfo() {
    setIsLoading(true);

    fetch(infoUrl)
      .then(response => response.json())
      .then(data => {
        setInfo(formatInfoData(data));
      }).catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function formatInfoData(info) {
    const validKeys = Object.keys(info).filter(key => isValidKey(key));

    return validKeys.reduce((acc, key) => {
      const name = getNameFromKey(key);

      return { ...acc, [name]: info[key] };
    }, {});
  }

    return (
      <div className="Info">
        <h1 className="Info__title">Info</h1>
        <Loader isLoading={isLoading} >
          {info && (
            <ul className="Info__list">
              {Object.entries(info).map(([key, value]) => (
                <li key={key} className="Info__item">
                  <span className="Info__key">{key}:</span>
                  <span className="Info__value">{value}</span>
                </li>
              ))}
            </ul>
          )}
        </Loader>
      </div>
    );
  }
  
  
  