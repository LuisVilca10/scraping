import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <>
            {/* nav bar */}
            <div>
                <div className="bg-[#054D88] w-full text-white">
                    <div className="flex justify-center items-center">
                        
                        <div className="text-center uppercase md:text-4xl text-2xl py-3 font-black w-full -mr-36">
                            Portal web de noticias con Scraping
                        </div>
                        {/* Botón de login */}
                        <NavLink
                            className="bg-white text-center mr-10 text-[#054D88] p-1 rounded-lg hover:bg-gray-200"
                            to="/login"
                        >
                            Iniciar Sesion
                        </NavLink>
                    </div>
                    <div className='bg-gray-500 py-2 font-light text-sm lg:text-lg'>
                        <div className='container mx-auto flex justify-center uppercase'>
                            <li className="flex items-center">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "border-b-2 mx-3" : "py-2 rounded-lg px-3"
                                    }
                                    to="/"
                                >
                                    INICIO
                                </NavLink>
                            </li>
                            <li className="flex items-center">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "border-b-2 mx-3" : "py-2 rounded-lg px-3"
                                    }
                                    to="/deportes"
                                >
                                    Deportes
                                </NavLink>
                            </li>
                            <li className="flex items-center">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "border-b-2 mx-3" : "py-2 rounded-lg px-3"
                                    }
                                    to="/politicas"
                                >
                                    Politica
                                </NavLink>
                            </li>
                            <li className="flex items-center">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "border-b-2 mx-3" : "py-2 rounded-lg px-3"
                                    }
                                    to="/noticias"
                                >
                                    Noticias
                                </NavLink>
                            </li>
                            {/* <li className="flex items-center">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "border-b-2 mx-3" : "py-2 rounded-lg px-3"
                                    }
                                    to="/"
                                >
                                    Contactanos
                                </NavLink>
                            </li> */}
                        </div>
                    </div>

                </div>
            </div>
            {/*  */}
        </>
    );
}

export default Navbar;