import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const DataContext = createContext();

function DataProvider({ children }) {
  const { isLoading, getFetch } = useFetch();

  const contextValue = useMemo(() => ({
    isLoading,
    getFetch,
  }), [isLoading, getFetch]);

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
