import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import Routes from './routes/SignRoutes';
import store from './store';
import GlobalStyle from './styles/global';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <GlobalStyle />
      <Provider store={store}>
        <Routes />
      </Provider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
