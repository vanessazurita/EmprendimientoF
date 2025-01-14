import React from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';

function CardItem({ src, text, label, path, external }) {
  return (
    <li className="card-item">
      {external ? (
        <a
          className="card-item__link"
          href={path}
          target="_blank"
          rel="noopener noreferrer"
        >
          <figure className="card-item__pic-wrap" data-category={label}>
            <img className="card-item__img" alt={label} src={src} />
          </figure>
          <div className="card-item__info">
            <h5 className="card-item__text">{text}</h5>
          </div>
        </a>
      ) : (
        <Link className="card-item__link" to={path}>
          <figure className="card-item__pic-wrap" data-category={label}>
            <img className="card-item__img" alt={label} src={src} />
          </figure>
          <div className="card-item__info">
            <h5 className="card-item__text">{text}</h5>
          </div>
        </Link>
      )}
    </li>
  );
}

export default CardItem;
