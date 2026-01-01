import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCustomReactQuery = (urlpath, query = '') => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `${urlpath}${query ? `?search=${query}` : ''}`,
          { signal: controller.signal }
        );

        setProducts(response.data);
      } catch (err) {
        // ignore aborted request
        if (err.name !== 'CanceledError') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    })();

    // 🔥 cleanup (VERY IMPORTANT)
    return () => {
      controller.abort();
    };
  }, [urlpath, query]);

  return [products, error, loading];
};
