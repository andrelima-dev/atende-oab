import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface Usuario {
  id: number;
  email: string;
  nome: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (token: string, usuario: Usuario) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há token salvo ao carregar
  useEffect(() => {
    const verificarToken = async () => {
      const tokenSalvo = localStorage.getItem('token');
      const usuarioSalvo = localStorage.getItem('usuario');

      if (tokenSalvo && usuarioSalvo) {
        try {
          // Verificar se o token ainda é válido
          const response = await axios.get(`${API_URL}/auth/verificar`, {
            headers: {
              Authorization: `Bearer ${tokenSalvo}`
            }
          });

          if (response.data.valido) {
            setToken(tokenSalvo);
            setUsuario(JSON.parse(usuarioSalvo));
          } else {
            // Token inválido, limpar
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
          }
        } catch (error) {
          // Token expirado ou inválido, limpar
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
        }
      }

      setIsLoading(false);
    };

    verificarToken();
  }, []);

  const login = (novoToken: string, novoUsuario: Usuario) => {
    setToken(novoToken);
    setUsuario(novoUsuario);
    localStorage.setItem('token', novoToken);
    localStorage.setItem('usuario', JSON.stringify(novoUsuario));
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  };

  const value: AuthContextType = {
    usuario,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
