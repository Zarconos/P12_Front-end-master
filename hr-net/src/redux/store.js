// store.js

import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './reducers';

// Fonction pour récupérer l'état initial du store depuis sessionStorage
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Fonction pour sauvegarder l'état actuel du store dans sessionStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Ignorer les erreurs d'enregistrement de l'état
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    storeData: storeReducer
  },
  preloadedState: persistedState // Charger l'état initial depuis sessionStorage
});


store.subscribe(() => {
  saveState(store.getState());
});

export default store;
