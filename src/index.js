
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App'; 
import reportWebVitals from './reportWebVitals'; 
import { AuthProvider } from './context/AuthContext'; 
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux'; 
import Store from './reduxToolkit/store'; 
// import './assets/css/BasicBars.css';
// import './assets/css/LoadingIndicator.css';
// import './assets/css/NotFound.css';
import './assets/css/signIn.css';
import './assets/css/signUp.css';
// import './assets/css/tableStyles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={Store}>
      <BrowserRouter> 
        <AuthProvider> 
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
);

reportWebVitals();
