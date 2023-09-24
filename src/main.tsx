import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { Toaster } from "react-hot-toast";

import App from './App.tsx'
import './index.css'
import store from './redux/store.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster />
      <App />
    </React.StrictMode>
  </Provider>,
)
