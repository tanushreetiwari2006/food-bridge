import { createContext, useContext, useState } from 'react';

const NavContext = createContext(undefined);

export function NavProvider({ children }) {
  const [page, setPage] = useState('home');
  const [role, setRole] = useState(null);

  const navigate = (newPage, newRole) => {
    if (newRole !== undefined) setRole(newRole);
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavContext.Provider value={{ page, role, setPage, setRole, navigate }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within NavProvider');
  return ctx;
}
