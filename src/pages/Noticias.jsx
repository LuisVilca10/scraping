import { useEffect, useState } from "react";
import Navbar from "../components/moleculas/Navbar";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../constants/firebaseConfig';
import { Card } from 'primereact/card';
import { Link } from "react-router-dom";
import Footer from "../components/moleculas/Footer";

function Noticias() {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        const fetchNoticias = async () => {
            const querySnapshot = await getDocs(collection(db, 'noticias'));
            const noticiasArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNoticias(noticiasArray);
        };

        fetchNoticias();
    }, []);

    if (noticias.length === 0) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

    return (
        <>
            <Navbar />
            <section className="container mx-auto my-5 mt-10 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className='pr-6'>
                        <div className="p-4 bg-blue-100 rounded mb-10">
                            <h3 className="font-bold text-lg">Clima en tu región</h3>
                            <p>22°C | Soleado</p>
                        </div>
                        <div className="my-8 p-6 bg-gray-100 rounded shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Participa en nuestra Encuesta</h2>
                            <p className="text-gray-700 mb-4">¿Crees que el nuevo proyecto de ley beneficiará a los trabajadores?</p>
                            <form>
                                <div className="mb-3">
                                    <label className="block">
                                        <input type="radio" name="encuesta" value="si" className="mr-2" /> Sí
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="block">
                                        <input type="radio" name="encuesta" value="no" className="mr-2" /> No
                                    </label>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Enviar Respuesta
                                </button>
                            </form>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-bold mb-4">Patrocinado</h2>
                            <div className="bg-gray-200 h-48 rounded-lg shadow-md flex items-center justify-center">
                                <p className="text-gray-500">Espacio para Publicidad</p>
                            </div>
                            <div className="bg-gray-200 h-48 rounded-lg shadow-md flex items-center justify-center mt-4">
                                <p className="text-gray-500">Espacio para Publicidad</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 container mx-auto">
                        <div className="flex my-4 ">
                            <h2 className="text-xl font-bold pl-4 border-l-4 border-[#25679c]">Noticias Regionaes</h2>
                        </div>
                        <div className="flex items-center mb-6">
                            <div className="flex items-center border p-2 rounded my-4 w-full">
                                <input
                                    type="text"
                                    placeholder="Buscar noticias..."
                                    className="flex-grow p-2 outline-none"
                                />
                                <button className="px-4 py-2 bg-blue-600 text-white rounded">Buscar</button>
                            </div>
                        </div>
                        <div className="flex mb-5">
                            <label className="mr-4 text-gray-700 font-semibold" htmlFor="startDate">Desde:</label>
                            <input
                                type="date"
                                id="startDate"
                                className="border rounded px-2 py-1 mr-6"

                            />
                            <label className="mr-4 text-gray-700 font-semibold" htmlFor="endDate">Hasta:</label>
                            <input
                                type="date"
                                id="endDate"
                                className="border rounded px-2 py-1"

                            />
                            <button
                                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"

                            >
                                Filtrar
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {noticias.map((noticia, index) => (
                                <Card key={index} className="border rounded-lg shadow-lg overflow-hidden">
                                    <img
                                        src={noticia.image}
                                        alt={noticia.titulo}
                                        className="align-middle h-full w-full object-contain"
                                    />
                                    <div className="p-4">
                                        <Link to={`/noticiadetalle/${noticia.id}`}><h3 className="font-semibold text-lg line-clamp-2 hover:text-[#357cb6]">{noticia.titulo}</h3></Link>
                                        <p className="text-gray-600 mt-2 text-sm line-clamp-2">{noticia.descripcion}</p>
                                        <div className='flex justify-between mt-3 gap-x-2'>
                                            <p className="text-gray-500 text-end text-xs">Fuente: {noticia.fuente}</p>
                                            <p className="text-[#054D88] text-end text-xs">Fecha: {noticia.fecha}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    );
}

export default Noticias