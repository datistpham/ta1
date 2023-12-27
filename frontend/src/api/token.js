import { useState } from 'react';

export default function useToken() {
  const [token, setToken] = useState(null);  

  const getToken = () => token;

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return {
    getToken,
    updateToken
  };
}