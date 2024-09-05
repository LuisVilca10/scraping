import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <>
            {/* nav bar */}
            <div>
                <div className="bg-[#054D88] w-full text-white">
                    <div className=" container mx-auto w-full m-auto items-center text-center uppercase md:text-4xl text-2xl py-3 font-black">
                        Portal web de noticias con Scraping
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
                                    to="/confirma"
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
                            <li className="flex items-center">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "border-b-2 mx-3" : "py-2 rounded-lg px-3"
                                    }
                                    to="/libro-de-visitas"
                                >
                                    Contactanos
                                </NavLink>
                            </li>
                        </div>
                    </div>

                </div>
            </div>
            {/*  */}
        </>
    );
}

export default Navbar;