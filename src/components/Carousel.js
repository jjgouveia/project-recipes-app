import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropType from 'prop-types';

const maxCards = 6;

export default function Carousel({ data, type }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <div>
      <h4>Recomendations</h4>
      <Slider { ...settings }>
        {type === 'foods' ? data.slice(0, maxCards).map((recomendation, i) => (
          <div key={ i }>
            {i <= maxCards && (
              <div data-testid={ `${i}-recomendation-card` }>
                <img src={ recomendation.strDrinkThumb } alt="" />
                <p data-testid={ `${i}-recomendation-title` }>{recomendation.strDrink}</p>
              </div>)}
          </div>
        ))
          : data.slice(0, maxCards).map((recomendation, i) => (
            <div key={ Math.random() }>
              {i <= maxCards && (
                <div data-testid={ `${i}-recomendation-card` }>
                  <img src={ recomendation.strMealThumb } alt="" />
                  <p data-testid={ `${i}-recomendation-title` }>
                    {recomendation.strMeal}
                  </p>
                </div>)}
            </div>))}
      </Slider>
    </div>
  );
}

Carousel.propTypes = {
  type: PropType.str,
  data: PropType.array,
}.isRequired;
