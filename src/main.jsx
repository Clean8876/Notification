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


const clientId = "1019189497719-6oo2tdmhueq2pjne3cikrnttms0ug0ra.apps.googleusercontent.com";


 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <App />
    
    </BrowserRouter>
    </PersistGate>
    </Provider></ProjectProvider>
  </StrictMode>,
)
