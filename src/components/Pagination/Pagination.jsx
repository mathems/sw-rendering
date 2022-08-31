import classNames from 'classnames';

import './Pagination.scss';

export function Pagination({ nextUrl, prevUrl, switchPage }) {
  function handleSwitchPage(url) {
    if(url) {
      switchPage(url);
    }
  }

  return (
    <nav aria-label="Pagination">
      <ul className="Pagination__list">
        <li
          className={classNames('Pagination__item Pagination__item--prev', {disabled: !prevUrl})}
          onClick={() => handleSwitchPage(prevUrl)} 
        >
          <span className="Pagination__item-icon Pagination__item-icon--prev"></span>
          <span className="Pagination__button">Prev</span>
        </li>
        <li
          className={classNames('Pagination__item Pagination__item--next', {disabled: !nextUrl})}
          onClick={() => handleSwitchPage(nextUrl)} 
        >
          <span className="Pagination__item-icon Pagination__item-icon--next"></span>
          <span className="Pagination__button">Next</span>
        </li>
      </ul>
    </nav>
  )
}