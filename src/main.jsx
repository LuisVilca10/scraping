import App from "./App";
import './assets/index.css'
import ReactDOM from 'react-dom/client';
import React from "react";
import 'primereact/resources/themes/saga-blue/theme.css'; // O el tema que prefieras
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
