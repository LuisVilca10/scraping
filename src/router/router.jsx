import { createBrowserRouter } from "react-router-dom"
import App from "../pages/App"
import NotoiciaDe from "../pages/NoticiaDetalle"
import Noticias from "../pages/Noticias"
import Deportes from "../pages/Deportes"
import DeporteDe from "../pages/DeporteDetalle"
import Politica from "../pages/Politica"
import PoliticaDe from "../pages/PoliticaDetalle"
import Login from "../pages/Login"
import Daashboard from "../pages/admin/Daashboard"
import AdminNoticias from "../pages/admin/AdminNoticias"
import AdminDeportes from "../pages/admin/AdminDeportes"
import AdminPolitica from "../pages/admin/AdminPolitica"
import Register from "../pages/Register"
import AdminUsers from "../pages/admin/AdminUsers"
import Subscripts from "../pages/Subscripts"



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
            path: "/login",
            element: <Login />,

        },
        {
            path: "/register",
            element: <Register />,

        },
        {
            path: "/suscripciones",
            element: <Subscripts />,

        },
        {
            path: "/admin",
            element: <Daashboard />
        },
        {
            path: "/admin/noticias",
            element: <AdminNoticias />
        },
        {
            path: "/admin/deportes",
            element: <AdminDeportes />
        },
        {
            path: "/admin/politica",
            element: <AdminPolitica />
        },
        {
            path: "/admin/users",
            element: <AdminUsers />
        }
    ]
)

export default router