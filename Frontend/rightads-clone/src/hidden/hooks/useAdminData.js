import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../config/api';
import { clearAuth, getToken } from '../utils/auth';

export function useAdminData(endpoint) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await apiRequest(endpoint, { token: getToken() });
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      if (err.status === 401) {
        clearAuth();
        navigate('/login');
      } else {
        setError(err.message || 'Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
