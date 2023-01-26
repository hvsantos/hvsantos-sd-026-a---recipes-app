import React from 'react';
import usePageName from '../hooks/usePageName';
import Header from '../components/Header';

function DoneRecipes() {
  const pageName = usePageName();
  return (
    <div>
      <Header pageName={ pageName } />
      DoneRecipes
    </div>
  );
}

export default DoneRecipes;
