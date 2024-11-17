import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const [mostrarLogin, setMostrarLogin] = useState(true);
    const [userData, setUserData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        if (token && userData) {
            setMostrarLogin(false);
            setUserData(JSON.parse(userData));
        } else {
            setMostrarLogin(true);
            setUserData(null);
        }
    }, []);



    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setUserData(null);
    };
    return (
        <>
            {/* nav bar */}
            <div>
                <div className="bg-[#054D88] w-full text-white">
                    <div className="flex justify-center items-center">

                        <div className="text-center uppercase md:text-4xl text-2xl py-3 font-black w-full ">
                            Portal web de noticias con Scraping
                        </div>
                        {/* Botón de login */}

                        {!mostrarLogin && userData ? (
                            <div className="relative">
                                <button className="flex justify-center items-center text center" onClick={() => setShowDropdown(!showDropdown)}>
                                    <FontAwesomeIcon className="text-2xl" icon={faUser} />
                                    <span className="">{userData.name}</span>
                                </button>
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 bg-white rounded shadow-lg p-4 w-48 z-10">
                                        <ul className="space-y-2">
                                            <li className="">
                                                <Link
                                                    to="/settings"
                                                    className="flex items-center text-gray-700 hover:bg-gray-200 mb-2 text-lg"
                                                >
                                                    <i className="fas fa-cog mr-2"></i>
                                                    Configuración
                                                </Link>
                                                {userData.type_user === 1 && (
                                                    <Link
                                                        to="/admin"
                                                        className="flex items-center text-gray-700 hover:bg-gray-200 mb-2 text-lg"
                                                    >
                                                        <i className="fas fa-cog mr-2"></i>
                                                        Administración
                                                    </Link>
                                                )}
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center text-red-600 hover:bg-gray-200 mb-2 text-lg w-full"
                                                >
                                                    <i className="fas fa-sign-out-alt mr-2"></i>
                                                    Cerrar Sesión
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                className="bg-white text-center mr-10 text-[#054D88] text-sm p-1 rounded-lg hover:bg-gray-200"
                                to="/login"
                            >
                                Iniciar Sesión
                            </NavLink>
                        )}
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
                            <li className="flex items-center">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "border-b-2 mx-3" : "py-2 rounded-lg px-3"
                                    }
                                    to="/suscripciones"
                                >
                                    suscripciones
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