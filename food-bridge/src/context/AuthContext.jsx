import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

const STORAGE_KEY = 'fb-auth-user';
const HELPERS_KEY = 'fb-helpers';

const API_BASE_URL = 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [pendingRole, setPendingRole] = useState(null);
  const [pendingPhone, setPendingPhone] = useState(null);

  const [helpers, setHelpers] = useState(() => {
    const saved = localStorage.getItem(HELPERS_KEY);

    if (saved) return JSON.parse(saved);

    return [
      {
        id: 'h-demo',
        name: 'Ramesh',
        phone: '9876501234',
        ownerId: 'd1',
        ownerName: 'Sharma Caterers',
        ownerRole: 'donor',
      },
    ];
  });

  // Login + save user to backend/Supabase
  const login = async (newUser) => {
    try {
      // Keep frontend session
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
if (newUser.role === 'volunteer') {
  return newUser;
}
      // Save user to backend
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUser.name || 'User',
          phone: newUser.phone,
          role: newUser.role,
          area: newUser.area || 'Not specified',
          organization_name:
            newUser.orgName ||
            newUser.organization_name ||
            null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Backend user save failed:', result);
        return newUser;
      }

      // If backend returned the database user,
      // update local user with database data.
      if (result.user) {
        const databaseUser = {
          ...newUser,
          id: result.user.id,
          name: result.user.name,
          phone: result.user.phone,
          role: result.user.role,
          area: result.user.area,
          organization_name: result.user.organization_name,
        };

        setUser(databaseUser);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(databaseUser)
        );

        return databaseUser;
      }

      return newUser;
    } catch (error) {
      console.error('Backend connection error:', error);

      // Keep local login working if backend is temporarily unavailable
      return newUser;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const addHelper = (name, phone) => {
    if (!user) return;

    const newHelper = {
      id: `h${Date.now()}`,
      name,
      phone,
      ownerId: user.id,
      ownerName: user.name,
      ownerRole: user.role,
    };

    const updated = [...helpers, newHelper];

    setHelpers(updated);
    localStorage.setItem(HELPERS_KEY, JSON.stringify(updated));
  };

  const removeHelper = (id) => {
    const updated = helpers.filter((h) => h.id !== id);

    setHelpers(updated);
    localStorage.setItem(HELPERS_KEY, JSON.stringify(updated));
  };

  const isRegisteredHelper = (phone) => {
    return helpers.some((h) => h.phone === phone);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        pendingRole,
        pendingPhone,
        setPendingRole,
        setPendingPhone,
        login,
        logout,
        helpers,
        addHelper,
        removeHelper,
        isRegisteredHelper,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
}