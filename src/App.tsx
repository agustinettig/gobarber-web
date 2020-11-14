import React from 'react';
import { AuthProvider } from './hooks/auth';

import Login from './pages/Login';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AuthProvider>
      <Login />
    </AuthProvider>
  </>
);

export default App;
