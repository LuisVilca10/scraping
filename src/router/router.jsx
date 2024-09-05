import { createBrowserRouter } from "react-router-dom"
import App from "../pages/App"
import NotoiciaDe from "../pages/NoticiaDetalle"
import Noticias from "../pages/Noticias"
import Deportes from "../pages/Deportes"


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
            path: "/deportes",
            element: <Deportes />,

        },
        {
            path: "/noticiadetalle/:id",
            element: <NotoiciaDe />,

        },
    ]
)

export default router