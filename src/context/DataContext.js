import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataApi, setDataApi] = useState([]);
  const { isLoading, getFetch } = useFetch();
  const [filter, setFilter] = useState('');
  const [isFilter, setIsFilter] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [filterResult, setFilterResult] = useState([]);

  const contextValue = useMemo(() => ({
    filterResult,
    setFilterResult,
    dataApi,
    setDataApi,
    setRecipe,
    recipe,
    isLoading,
    getFetch,
    filter,
    setFilter,
    isFilter,
    setIsFilter,
  }), [dataApi, setDataApi, isLoading, filter, setFilter, isFilter, recipe, setRecipe]);

  return (
    <DataContext.Provider value={ contextValue }>
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DataProvider;
