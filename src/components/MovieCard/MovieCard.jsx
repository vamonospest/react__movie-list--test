import React from 'react';
// import PropTypes from 'prop-types';

export const MovieCard = ({
  title,
  year,
  imgUrl,
}) => (
  <>
    <div className="card">
      <div className="card__img">
        <figure>
          <img
            src={imgUrl}
            alt="Film logo"
          />
        </figure>
      </div>

      <div className="card__description description">
        <h1 className="description__title">{title}</h1>
        <p className="description__year">{year}</p>
      </div>
    </div>
  </>
);

// MovieCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   year: PropTypes.string.isRequired,
//   imgUrl: PropTypes.string.isRequired,
// };
