import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const DataContext = createContext();

function DataProvider({ children }) {
  const { isLoading, getFetch } = useFetch();
  const [filter, setFilter] = useState('');
  const [isFilter, setIsFilter] = useState(false);

  const contextValue = useMemo(() => ({
    isLoading,
    getFetch,
    filter,
    setFilter,
    isFilter,
    setIsFilter,
  }), [isLoading, filter, setFilter, isFilter]);

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
