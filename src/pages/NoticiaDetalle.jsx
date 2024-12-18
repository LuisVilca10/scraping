import { useParams } from "react-router-dom";
import ShareItem from "../components/atoms/ShareItem";
import Footer from "../components/moleculas/Footer";
import Navbar from "../components/moleculas/Navbar";
import { BsFacebook, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../constants/firebaseConfig";

function NotoiciaDe() {
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);
    const [comments, setComments] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData')) || null;
    const [newComment, setNewComment] = useState("");
    useEffect(() => {
        const fetchNoticia = async () => {
            if (!id) {
                console.error('ID not found in URL');
                return;
            }

            try {
                const docRef = doc(db, 'noticias', id);
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

        const fetchComments = () => {
            const commentsRef = collection(db, "noticias", id, "comments");
            const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
                const commentsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setComments(
                    commentsData.sort((a, b) => b.createdAt - a.createdAt) // Ordenar comentarios por fecha descendente
                );
            });

            return unsubscribe;
        };

        fetchNoticia();
        const unsubscribe = fetchComments();
        return () => unsubscribe();
    }, [id]);


    if (!noticia) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert("El comentario no puede estar vacío");
            return;
        }

        try {
            const commentsRef = collection(db, 'noticias', id, 'comments');
            await addDoc(commentsRef, {
                usercoment: userData.name + " " + userData.lastName,
                text: newComment,
                createdAt: new Date(),
            });
            alert("bien echo")
            setNewComment(""); // Limpiar el campo de texto
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    return (
        <>
            <Navbar />

            <div className=" max-w-256 m-auto h-sceen">
                <section className="container mx-auto   mb-2 mt-5">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="rounded-lg overflow-hidden  mb-5">
                                <img
                                    className="align-middle container mx-auto  rounded-3xl border"
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
                                <p className="text-lg font-semibold mb-2 mt-6">Comparte esta noticia</p>
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
                <div className="container mx-auto ">
                    <p className="text-lg font-semibold mb-2">Comentarios</p>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            className="border rounded px-4 py-2 flex-grow"
                            placeholder="Escribe un comentario..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={handleAddComment}
                        >
                            Enviar
                        </button>
                    </div>
                    <div className="space-y-4 mt-2 mb-5">
                        {comments.length === 0 && (
                            <p className="text-gray-500">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                        )}
                        {comments.map((comment) => (
                            <div key={comment.id} className="p-4 border rounded-lg">
                                <p className="text-sm text-gray-700">
                                    <strong>{comment.usercoment}</strong> -{" "}
                                    <span className="text-gray-500">
                                        {/* Usar toDate() para convertir el Timestamp a una fecha válida */}
                                        {comment.createdAt?.toDate
                                            ? comment.createdAt.toDate().toLocaleString()
                                            : "Fecha inválida"}
                                    </span>
                                </p>
                                <p className="text-gray-800">{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default NotoiciaDe;
