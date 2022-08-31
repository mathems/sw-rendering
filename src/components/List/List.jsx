import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import { Searcher } from "../Searcher";
import { Pagination } from "../Pagination";
import { Loader } from "../Loader";

import { BASE_URL } from "../../utils/api";
import { getSlug } from "../../utils/formaters";

import './List.scss';

export function List({ dataList, setDataList, setInfoUrl }) {
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentType = useLocation().pathname.replace('/', ''); // current page type

  useEffect(() => {
    loadDataList(`${BASE_URL}/${currentType}`);
  }, [currentType]);

  function loadDataList(url) {
    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setDataList(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      }).catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function switchPage(url) {
    loadDataList(url);
  }

  return (
    <div className="List">
      <Searcher currentType={currentType} setInfoUrl={setInfoUrl} /> 
      <Loader isLoading={isLoading} >
        <ul>
          {dataList.map(item => (
            <li key={item.name || item.title} className="List__item">
              <Link
                to={`/info/${currentType}/${getSlug(item.name || item.title)}`}
                onClick={() => setInfoUrl(item.url)}
              >
                {item.name || item.title}
              </Link>
            </li>
          ))}
        </ul>

        <Pagination prevUrl={prevUrl} nextUrl={nextUrl} switchPage={switchPage} />
      </Loader>
    </div>
  )
}