import { useEffect, useState } from "react";
import Navbar from "../components/moleculas/Navbar";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../constants/firebaseConfig';
import { Card } from 'primereact/card';
import { Link } from "react-router-dom";
import Footer from "../components/moleculas/Footer";

function Deportes() {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        const fetchNoticias = async () => {
            const querySnapshot = await getDocs(collection(db, 'deportes'));
            const noticiasArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNoticias(noticiasArray);
        };

        fetchNoticias();
    }, []);

    if (noticias.length === 0) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

    return (
        <>
            <Navbar />

            <div className="col-span-2 container mx-auto">
                <div className="flex my-4 ">
                    <h2 className="text-xl font-bold pl-4 border-l-4 border-[#25679c]">Deporte</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                    {noticias.map((noticia, index) => (
                        <Card key={index} className="border rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={noticia.image}
                                alt={noticia.titulo}
                                className="align-middle h-full w-full object-contain"
                            />
                            <div className="p-4">
                                <Link to={`/deportedetalle/${noticia.id}`}><h3 className="font-semibold text-lg line-clamp-2 hover:text-[#357cb6]">{noticia.titulo}</h3></Link>
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

            <Footer />
        </>
    );
}

export default Deportes;