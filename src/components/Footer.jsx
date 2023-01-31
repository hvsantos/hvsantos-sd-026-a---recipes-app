import React from 'react';
import useDrinkIcon from '../hooks/useDrinkIcon';
import useMealIcon from '../hooks/useMealIcon';

function Footer() {
  const drinkIcon = useDrinkIcon();
  const mealIcon = useMealIcon();

  return (
    <div
      data-testid="footer"
      style={ { position: 'fixed', bottom: '0px' } }
    >
      {drinkIcon}
      {mealIcon}
      Footer
    </div>
  );
}

export default Footer;
