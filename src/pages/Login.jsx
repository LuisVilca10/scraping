import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../constants/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { setToken } from "../helprs/auth";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);
            const user = userCredential.user;
            setToken(user.accessToken);

            const userDoc = doc(db, 'usuarios', user.uid);
            const docSnap = await getDoc(userDoc);

            // Save user data to local storage
            const userData = docSnap.data();
            localStorage.setItem("userData", JSON.stringify(userData));

            // Retrieve and parse user data
            const retrievedUserData = JSON.parse(localStorage.getItem("userData"));

            // Check the user type
            if (retrievedUserData.type_user && (retrievedUserData.type_user === 1 || retrievedUserData.type_user === 2)) {
                nav("/admin");
            } else {
                nav("/");
            }

            // Show success notification
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Usuario logeado exitosamente"
            });
        } catch (error) {
            setError(error.message);
            console.error("Error de inicio de sesión:", error);
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
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
                                                    <button className="w-full px-4 py-2 font-bold text-white bg-[#054D88] rounded-full focus:outline-none focus:shadow-outline" type="submit" disabled={loading}>
                                                        {loading ? (
                                                            <div className="flex justify-center items-center">
                                                                <svg
                                                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <circle
                                                                        className="opacity-25"
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="4"
                                                                    ></circle>
                                                                    <path
                                                                        className="opacity-75"
                                                                        fill="currentColor"
                                                                        d="M4 12a8 8 0 018-8v8H4z"
                                                                    ></path>
                                                                </svg>
                                                                Cargando...
                                                            </div>
                                                        ) : (
                                                            "Ingresar"
                                                        )}
                                                    </button>
                                                </div>
                                            </form>

                                            <hr className="mb-4 border-t" />
                                            <a href="/suscripciones" className="hover:text-blue-600 flex justify-center text-cyan-800">
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
