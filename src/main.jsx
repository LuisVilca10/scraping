import './assets/index.css'
import ReactDOM from 'react-dom/client';
import router from "./router/router"
import { RouterProvider } from 'react-router-dom'
import 'primereact/resources/themes/saga-blue/theme.css'; // O el tema que prefieras
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
