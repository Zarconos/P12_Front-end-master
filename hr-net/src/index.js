import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import App from './App';

const root = document.getElementById('root');

// Utilise createRoot depuis react-dom/client
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);

// Si tu veux mesurer les performances, tu peux toujours utiliser reportWebVitals
reportWebVitals();