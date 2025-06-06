import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/StyleCardMenu/CardMenu.css'

export const CardMenu = ({ imgSrc, title, description, link, customClass = ''}) => {
  const isDisabled = customClass.includes('deshabilitado');

  return (
    <div className='col-12 col-sm-6 col-md-2 mt-4 cardMenu-container'>
      {isDisabled ? (
        // Si está deshabilitado, no renderizamos el Link
        <div className={`card h-100 clickable-cardMenu ${customClass}`}>
          <img src={imgSrc} className="cardMenu-img-top img-fluid" alt={title} />
          <div className="card-body">
            <h5 className="cardMenu-title">{title}</h5>
            <p className="cardMenu-text text-center">{description}</p>
          </div>
        </div>
      ) : (
        // Si no está deshabilitado, renderizamos el Link
        <Link to={link} className="text-decoration-none">
          <div className={`card h-100 clickable-cardMenu ${customClass}`}>
            <img src={imgSrc} className="cardMenu-img-top img-fluid" alt={title} />
            <div className="card-body">
              <h5 className="cardMenu-title">{title}</h5>
              <p className="cardMenu-text text-center">{description}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
