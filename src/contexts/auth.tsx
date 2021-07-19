import React, { createContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Container, Spinner } from '../components/Spinner/styles';
import * as auth from '../services/auth';

interface User {
    name?:string;
    email:string;
    password?: string;
  }

interface AuthContextData {
    signed: boolean;
    loading: boolean;
    user: User;
    signIn(user:User): Promise<any>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      const storagedUser = localStorage.getItem('@App:user');
      const storagedToken = localStorage.getItem('@App:token');
  
      if (storagedToken && storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
    }, []);

    async function signIn(user: User) {
        try {
        setLoading(true)
        const response = await auth.signIn({email: user.email, password: user.password});
        localStorage.setItem('@App:user', JSON.stringify(response.user));
        localStorage.setItem('@App:token', response.token);
        setUser(response.user)
        setLoading(false)
        return <Redirect to='/app'  />
        } catch (error) {
          console.log(error);
          setLoading(false)
          return <Redirect to='/'  />
        }
        
        
    }

    function signOut() {
      setUser(null);
  
      localStorage.clear()
    }
    return (
      <AuthContext.Provider value={{ signed: !!user, loading, user, signIn, signOut }}>
        {loading? (<Container><Spinner/></Container>): children}
      </AuthContext.Provider>
    );
   };

export default AuthContext;