import React, { useEffect, useState } from 'react';
import { checkSession } from '@/src/utils/auth';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const verifySession = async () => {
        try {
          const sessionData = await checkSession();

          if (sessionData && sessionData.token) {
            setIsAuthenticated(true);
            setToken(sessionData.token);
          } else {
            router.push('/login');
          }
        } catch (error) {
          console.error("Error verifying session:", error);
          router.push('/login');
        } finally {
          setLoading(false);
        }
      };

      verifySession();
    }, [router]);

    if (loading) return <CircularProgress />; 

    if (!isAuthenticated) return null; 

    return <WrappedComponent {...props} token={token} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
