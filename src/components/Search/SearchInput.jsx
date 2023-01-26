import React from 'react';

function SearchInput() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
      />
      <div>
        <div>
          <label htmlFor="ingredient">
            <input
              type="radio"
              name="search"
              id="ingredient"
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>
        </div>
        <div>
          <label htmlFor="name">
            <input
              type="radio"
              name="search"
              id="name"
              data-testid="name-search-radio"
            />
            Nome
          </label>
        </div>
        <div>
          <label htmlFor="first-letter">
            <input
              type="radio"
              name="search"
              id="first-letter"
              data-testid="first-letter-search-radio"
            />
            Primeira letra
          </label>
        </div>
      </div>
      <button
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchInput;
