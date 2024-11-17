import React from "react";
import Footer from "../components/moleculas/Footer";
import Navbar from "../components/moleculas/Navbar";
import { FaCar, FaPlane, FaTrain } from "react-icons/fa"; // Usa react-icons 
import { Card } from 'primereact/card';
import { useNavigate } from "react-router-dom";

const Subscripts = () => {
    const nav = useNavigate();
    const handleSubscription = (plan) => {
        alert(`Redirigiendo al registro del plan: ${plan}`);
        nav('/register', { state: { plan } });
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-8 h-full">
                <h1 className="md:text-7xl text-5xl font-bold text-center text-gray-800 uppercase mb-8">suscribete</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-center  items-center">
                    <div id="basic-plan" className="bg-[#ECEFF1] h-fit rounded-b-3xl border">
                        <Card className="border rounded-b-full shadow-lg">
                            <div className="flex justify-center text-[#42A5F5] text-9xl">
                                <FaCar className="align-middle object-contain" />
                            </div>
                        </Card>
                        <div className="px-4 my-10 uppercase">
                            <h2 className="text-4xl font-bold">Básico</h2>
                            <p className="text-gray-600 mt-2 text-3xl line-clamp-2">S./4.00</p>
                            <div className="flex flex-col justify-start text-start px-7 gap-y-2 mt-2 text-sm">
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-red-800">X</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                            </div>
                            <button className="mt-5 bg-[#054D88] px-3 py-2 text-white rounded-xl" onClick={() => handleSubscription('Básico')}>
                                Suscribirse
                            </button>
                        </div>
                    </div>

                    <div id="vip-plan" className="bg-[#FFF8E1] h-full rounded-b-3xl">
                        <Card className="border rounded-b-full shadow-lg">
                            <div className="flex justify-center text-[#FFC107] text-9xl">
                                <FaPlane className="align-middle object-contain" />
                            </div>
                        </Card>
                        <div className="px-4 my-10 uppercase">
                            <h2 className="text-4xl font-bold">Super VIP</h2>
                            <p className="text-gray-600 mt-2 text-3xl line-clamp-2">S./10.00</p>
                            <div className="flex flex-col justify-start text-start px-7 gap-y-2 mt-2 text-sm">
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                            </div>
                            <button className="mt-5 bg-[#054D88] px-3 py-2 text-white rounded-xl" onClick={() => handleSubscription('Super-VIP')}>
                                Suscribirse
                            </button>
                        </div>
                    </div>

                    <div id="premium-plan" className="bg-[#E3F2FD] rounded-b-3xl">
                        <Card className="border rounded-b-full shadow-lg">
                            <div className="flex justify-center text-[#1565C0] text-9xl">
                                <FaTrain className="align-middle object-contain" />
                            </div>
                        </Card>
                        <div className="px-4 my-10 uppercase">
                            <h2 className="text-4xl font-bold">Premium</h2>
                            <p className="text-gray-600 mt-2 text-3xl line-clamp-2">S./6.00</p>
                            <div className="flex flex-col justify-start text-start px-7 gap-y-2 mt-2 text-sm">
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-green-800">✓</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                                <p> <span className="font-extrabold text-lg text-red-800">X</span> Acceso limitado al contenido: Noticias generales y de libre acceso.</p>
                            </div>
                            <button className="mt-5 bg-[#054D88] px-3 py-2 text-white rounded-xl" onClick={() => handleSubscription('Premium')}>
                                Suscribirse
                            </button>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    );
};

export default Subscripts;
