import React from 'react';
import Header from '../components/Header';
import usePageName from '../hooks/usePageName';

function FavoriteRecipes() {
  const pageName = usePageName();
  return (
    <div>
      <Header pageName={ pageName } />
      FavoriteRecipes
    </div>
  );
}

export default FavoriteRecipes;
