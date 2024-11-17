import { useParams } from "react-router-dom";
import ShareItem from "../components/atoms/ShareItem";
import Footer from "../components/moleculas/Footer";
import Navbar from "../components/moleculas/Navbar";
import { BsFacebook, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../constants/firebaseConfig";

function DeporteDe() {
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);

    useEffect(() => {
        const fetchNoticia = async () => {
            if (!id) {
                console.error('ID not found in URL');
                return;
            }

            try {
                const docRef = doc(db, 'deportes', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setNoticia(docSnap.data());
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchNoticia();
    }, [id]);

    
    if (!noticia) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

    return (
        <>
            <Navbar />

            <div className="max-w-256 m-auto h-screen pr-10">
                <section className="py-10">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="rounded-lg overflow-hidden mb-5">
                                <img
                                    className="align-middle container mx-auto ml-10 rounded-3xl border"
                                    src={noticia.image}
                                />
                            </div>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-sm mb-2">
                                Fecha: {noticia.fecha}
                            </span>
                            <h1 className="text-xl lg:text-3xl font-semibold leading-7 text-gray-800 mb-4">
                                {noticia.titulo}
                            </h1>
                            <div className="flex items-center gap-2 mb-4">
                                {/* Información adicional aquí */}
                            </div>
                            <div className="mb-6">
                                <p className="text-gray-500">{noticia.descripcion}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2">Comparte esta noticia</p>
                                <div className="flex gap-2">
                                    <ShareItem
                                        icon={BsWhatsapp}
                                        url={`https://api.whatsapp.com/send?text=${window.location.href}`}
                                    />
                                    <ShareItem
                                        icon={BsFacebook}
                                        url={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                                    />
                                    <ShareItem
                                        icon={BsTwitter}
                                        url={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}

export default DeporteDe;
