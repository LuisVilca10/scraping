import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../constants/firebaseConfig";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState(null);
    const nav = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, correo, contrasena)
            .then((userCredential) => {
                const user = userCredential.user;
                nav("/admin");
                alert("Usuario Logeado");
                console.log("Usuario logueado:", user);
            })
            .catch((error) => {
                setError(error.message);
                console.error("Error de inicio de sesión:", error);
            });
    };

    return (
        <div>
        <section className="w-full gradient-form bg-gray-200 h-screen">
            <div className="container bg-gray-200 m-auto py-6 px-6 h-full w-full">
                <div className="flex w-full justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="xl:w-10/12">
                        <div className="block bg-white shadow-lg rounded-3xl w-full">
                            <div className="lg:flex lg:flex-wrap g-0">
                                <div className="hidden lg:block bg-[#054D88] rounded-3xl lg:w-6/12 items-center pt-28 lg:rounded-r-lg rounded-b-lg">
                                    <div className="my-12">
                                        <div className="container mx-auto px-2 my-12 md:px-12 md:mx-6 text-white">
                                            <span className="text-xl font-semibold mb-6">
                                                Noticiero
                                            </span>
                                            <h4 className="text-3xl mt-7">
                                                Enterate de todo con los mejores
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:w-6/12 px-6 pt-6 pb-0.5 md:px-0">
                                    <div className="container m-auto md:p-12">
                                        <div className="text-center">
                                            <h4 className="font-bold mt-1 mb-8 pb-1 text-4xl">
                                                Iniciar Sesión
                                            </h4>
                                        </div>
                                        {error && (
                                            <p className="text-red-500 mb-4">{error}</p>
                                        )}
                                        <form onSubmit={handleLogin}>
                                            <div className="mb-3">
                                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                                    Correo Electrónico
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="w-full pl-8 relative px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                        id="email"
                                                        type="email"
                                                        placeholder="Correo Electrónico"
                                                        value={correo}
                                                        onChange={(e) => setCorreo(e.target.value)}
                                                        required
                                                    />
                                                    <i className="fas fa-user absolute left-3 top-2 text-gray-400"></i>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                                    Contraseña
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="w-full pl-8 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                        id="password"
                                                        type="password"
                                                        placeholder="Contraseña"
                                                        value={contrasena}
                                                        onChange={(e) => setContrasena(e.target.value)}
                                                        required
                                                    />
                                                    <i className="fas fa-lock absolute left-3 top-2 text-gray-400"></i>
                                                </div>
                                            </div>
                                            <div className="text-center pt-1 mb-12 pb-1">
                                                <button className="w-full px-4 py-2 font-bold text-white bg-[#054D88] rounded-full focus:outline-none focus:shadow-outline" type="submit">
                                                    Ingresar
                                                </button>
                                            </div>
                                        </form>

                                        <hr className="mb-4 border-t" />
                                        <a className="hover:text-blue-600 flex justify-center text-cyan-800">
                                            ¿Deseas registrarte?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
};

export default Login;
