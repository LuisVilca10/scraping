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
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"
import AccessDenied from "../pages/AccessDenied"
import AdminSponsors from "../pages/admin/AdminSponsors"
import AdminQuestions from "../pages/admin/AdminQuestions"



const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,

        },
        {
            path: "/access-denied",
            element: <AccessDenied />,
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
            element: (
                <ProtectedRoute>
                    <Login />
                </ProtectedRoute>
            ),

        },
        {
            path: "/register",
            element: (
                <ProtectedRoute>
                    <Register />
                </ProtectedRoute>
            ),

        },
        {
            path: "/suscripciones",
            element: <Subscripts />,

        },
        {
            path: "/admin",
            element: (
                <AdminRoute>
                    <Daashboard />
                </AdminRoute>
            )
        },
        {
            path: "/admin/noticias",
            element: (
                <AdminRoute>
                    <AdminNoticias />
                </AdminRoute>
            )
        },
        {
            path: "/admin/deportes",
            element: (
                <AdminRoute>
                    <AdminDeportes />
                </AdminRoute>
            )
        },
        {
            path: "/admin/politica",
            element: (
                <AdminRoute>
                    <AdminPolitica />
                </AdminRoute>
            )
        },
        {
            path: "/admin/users",
            element: (
                <AdminRoute>
                    <AdminUsers />
                </AdminRoute>
            )
        },
        {
            path: "/admin/sponsor",
            element: (
                <AdminRoute>
                    <AdminSponsors />
                </AdminRoute>
            )
        },
        {
            path: "/admin/question",
            element: (
                <AdminRoute>
                    <AdminQuestions />
                </AdminRoute>
            )
        }
    ]
)

export default router