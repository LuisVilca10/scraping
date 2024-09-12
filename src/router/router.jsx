import { createBrowserRouter } from "react-router-dom"
import App from "../pages/App"
import NotoiciaDe from "../pages/NoticiaDetalle"
import Noticias from "../pages/Noticias"
import Deportes from "../pages/Deportes"
import DeporteDe from "../pages/DeporteDetalle"
import Politica from "../pages/Politica"
import PoliticaDe from "../pages/PoliticaDetalle"
import Login from "../pages/Login"


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,

        },
        {
            path: "/noticias",
            element: <Noticias />,

        },
        {
            path: "/noticiadetalle/:id",
            element: <NotoiciaDe />,

        },
        {
            path: "/deportes",
            element: <Deportes />,

        },
        {
            path: "/deportedetalle/:id",
            element: <DeporteDe />,

        },
        {
            path: "/politicas",
            element: <Politica />,

        },
        {
            path: "/politica/:id",
            element: <PoliticaDe />,

        },
        {
            path:"/login",
            element: <Login/>,
         
        },
    ]
)

export default router