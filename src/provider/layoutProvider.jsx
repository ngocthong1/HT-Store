import { createContext, useContext, useMemo, useState } from 'react';

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [breadcumb, setBreadcumb] = useState([]);

  const contextValue = useMemo(
    () => ({
      breadcumb,
      setBreadcumb,
    }),
    [breadcumb],
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  return useContext(LayoutContext);
};

export default LayoutProvider;
