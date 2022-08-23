import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <div>
        <img src={ mealIcon } alt="meal" data-testid="food-bottom-btn" />
      </div>
      <div>
        <img src={ drinkIcon } alt="drink" data-testid="drinks-bottom-btn" />
      </div>
    </footer>
  );
}
