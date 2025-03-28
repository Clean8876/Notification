import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store,persistor } from './Services/Store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <App />
    
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
