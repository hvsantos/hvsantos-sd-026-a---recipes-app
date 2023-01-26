import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const getFetch = async (url) => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      const apiResponse = await response.json();

      return apiResponse;
    } catch (e) {
      // setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, getFetch };
}

export default useFetch;
