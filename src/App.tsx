import React from 'react';

import AppProvider from './hooks';
import Login from './pages/Login';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <Login />
    </AppProvider>
  </>
);

export default App;
