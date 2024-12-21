import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export function useAuth() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const signIn = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'demo@example.com',
        password: 'demo1234'
      });

      if (error) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: 'demo@example.com',
          password: 'demo1234'
        });

        if (signUpError) {
          console.error('Auth error:', signUpError);
        }
      }

      setLoading(false);
    };

    signIn();
  }, []);

  return { loading };
}