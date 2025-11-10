import React from 'react';
import { AppProvider } from './adapters/ui/context/AppContext';
import { Dashboard } from './adapters/ui/pages/Dashboard';

function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}

export default App;
