import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <div>
        <a href="/foods" data-testid="food-bottom-btn" src={ mealIcon }>
          <img src={ mealIcon } alt="meal icon" />
        </a>
      </div>
      <div>
        <a href="/drinks" data-testid="drinks-bottom-btn" src={ drinkIcon }>
          <img alt="drink icon" src={ drinkIcon } />
        </a>
      </div>
    </footer>
  );
}
