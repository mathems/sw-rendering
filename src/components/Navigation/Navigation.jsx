import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// import Planet1 from "../../assets/navigation/planet-1.png";

import classNames from "classnames";

import './Navigation.scss';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const currentType = useLocation().pathname.replace('/', '');

  useEffect(() => {
    setIsOpen(!currentType);
  }, [currentType]);

  return (
    <div className={classNames('Navigation', {
      open: isOpen,
    })}>
      <Link to="/people">
        <span className={classNames('Navigation__item', {
          active: currentType === 'people',
        })}>
          <span className="Navigation__item-icon-wrapper">
            <span className="Navigation__item-icon Navigation__item-icon--people"></span>
          </span>
          <div className="Navigation__item-text">characters</div>
        </span>
      </Link>
      <Link to="/planets">
        <span className={classNames('Navigation__item', {
          active: currentType === 'planets',
        })}>
          <span className="Navigation__item-icon-wrapper">
            <span className="Navigation__item-icon Navigation__item-icon--planet"></span>
          </span>
          <div className="Navigation__item-text">planets</div>
        </span>
      </Link>
      <Link to="/starships">
        <span className={classNames('Navigation__item', {
          active: currentType === 'starships',
        })}>
          <span className="Navigation__item-icon-wrapper">
            <span className="Navigation__item-icon Navigation__item-icon--starship"></span>
          </span>
          <div className="Navigation__item-text">starships</div>
        </span>
      </Link>
    </div>
  )
}