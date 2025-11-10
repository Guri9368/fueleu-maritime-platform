import React, { createContext, useContext, ReactNode } from 'react';
import { ApiPort } from '../../../core/ports/output/ApiPort';
import { HttpApiAdapter } from '../../api/HttpApiAdapter';

interface AppContextType {
  apiClient: ApiPort;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const apiClient = new HttpApiAdapter('/api');

  return (
    <AppContext.Provider value={{ apiClient }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
