import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store,persistor } from './Services/Store.js';
import { ProjectProvider } from './context/ProjectContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';


const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;


 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ProjectProvider>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <App />
    
    </BrowserRouter>
    </PersistGate>
    </Provider></ProjectProvider></GoogleOAuthProvider>
  </StrictMode>
)
