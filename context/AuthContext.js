"use client";

import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { createBrowserClient } from '@supabase/ssr';

// Create the context
const AuthContext = createContext(null);

// Create the AuthProvider component
export function AuthProvider({ children }) {
  // Create a single, stable Supabase client using environment variables
  const supabase = useMemo(() => 
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ), 
  []);

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This function fetches the initial user session
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
    };

    fetchUser();

    // This listener reacts to login, logout, and other auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
    });

    // Cleanup the listener when the app closes
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Provide the user state and the supabase client to the whole app
  const value = {
    user,
    isAuthenticated,
    supabase, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Create the custom hook to easily access the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
