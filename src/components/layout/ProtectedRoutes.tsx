import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/config"; 
import { onAuthStateChanged } from "firebase/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if user exists, otherwise false
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  if (isAuthenticated === null) {
    // Show a loading state while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth?type=login" replace />;
  }

  // Render the protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;