import React from 'react';
import Header from '../components/Header';
import usePageName from '../hooks/usePageName';

function Recipes() {
  const pageName = usePageName();
  console.log(pageName);
  return (
    <div>
      <Header pageName={ pageName } />
      Recipes
    </div>
  );
}

export default Recipes;
