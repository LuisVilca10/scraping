import { useState, useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../constants/firebaseConfig";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileExport, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from 'primereact/dialog';
import Swal from "sweetalert2";

const TableadminQuestions = () => {
    const [noticias, setNoticias] = useState([]);
    console.log(noticias);
    const [option, setOption] = useState("");
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [visible, setVisible] = useState(false);
    const [state, setSatate] = useState(0);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    // Función para obtener las noticias desde Firestore
    console.log(noticias);
    const fetchNoticias = async () => {
        const noticiasCollection = collection(db, "questions");
        const noticiasSnapshot = await getDocs(noticiasCollection);
        const noticiasList = noticiasSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setNoticias(noticiasList);
    };

    const handleAddoption = () => {
        if (option.trim() !== "") {
            setItems([...items, option]); // Añade el valor actual del input a la lista
            setOption(""); // Limpia el input después de añadir
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];

            const newSponsor = {
                title: title,
                question: question,
                optionresponse: items,
                state: state,
                date: formattedDate
            };

            await addDoc(collection(db, "questions"), newSponsor);

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

            setNoticias((prevNoticias) => [newSponsor, ...prevNoticias]);

            setVisible(false);
            Toast.fire({
                icon: "success",
                title: "Pregunta registrada exitosamente"
            });
        } catch (error) {
            console.error("Error al manejar la subida:", error);
        } finally {
            setLoading(false);
        }
    };
    // Llamada al efecto para obtener las noticias al cargar el componente
    useEffect(() => {
        fetchNoticias();
    }, []);

    const filteredNoticias = noticias.filter(noticia =>
        noticia.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleEdit = (question) => {
        setEditingQuestion(question);
        setItems(question.optionresponse);
        setTitle(question.title);
        setQuestion(question.question);
        setSatate(question.state);
        setVisible(true);
    };
    const handleCancel = () => {
        setEditingQuestion(null);
        setItems([]);
        setTitle('');
        setQuestion('');
        setSatate(0);
        setVisible(false);
    };
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingQuestion) {
                // Actualiza los datos del usuario existente
                const today = new Date();
                const date = today.toISOString().split('T')[0];

                const userDoc = doc(db, "questions", editingQuestion.id);
                await updateDoc(userDoc, {
                    title,
                    question,
                    optionresponse: items,
                    state,
                    date,
                });

                // Actualiza el estado local
                setNoticias((prevNoticias) =>
                    prevNoticias.map((noticia) =>
                        noticia.id === editingQuestion.id
                            ? { ...noticia, title, question, state, date }
                            : noticia
                    )
                );

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
                    title: "Pregunta actualizado exitosamente"
                });

            }

            // Limpia y cierra el modal
            handleCancel();
        } catch (err) {
            console.error("Error al actualizar pregunta:", err);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        try {
            // Confirmación con SweetAlert2
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¡No podrás recuperar esta pregunta!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                // Eliminar la pregunta de Firestore
                const questionDoc = doc(db, "questions", id);
                await deleteDoc(questionDoc);

                // Actualizar el estado local
                setNoticias((prevNoticias) =>
                    prevNoticias.filter((noticia) => noticia.id !== id)
                );

                // Confirmación exitosa
                Swal.fire(
                    '¡Eliminada!',
                    'La pregunta ha sido eliminada correctamente.',
                    'success'
                );
            }
        } catch (error) {
            console.error("Error al eliminar la pregunta:", error);
            Swal.fire('Error', 'Hubo un problema al eliminar la pregunta.', 'error');
        }
    };

    return (

        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-t-lg">
                <div className="flex items-center bg-white shadow-sm rounded-lg">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-2" />
                    <input
                        type="text"
                        placeholder="Buscar Noticia"
                        className="outline-none px-2 py-3 bg-transparent w-96 text-gray-600 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex space-x-3 text-sm">
                    <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center" onClick={() => exportToCSV(noticias)}>
                        <FontAwesomeIcon icon={faFileExport} className="mr-2" />
                        Exportar
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center" onClick={() => setVisible(true)}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Nueva Pregunta
                    </button>
                </div>
            </div>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full  max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">
                            Preguntas
                        </h3>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            {/* <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Imagen
                            </th> */}
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Titulo
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Pregunta
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Estado
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Fecha
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNoticias.map((noticia) => (
                            <tr key={noticia.id}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    {noticia.title}
                                </th>

                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    {noticia.question}
                                </th>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    <span style={{ color: noticia?.state === 1 ? 'green' : '#ffc107' }}>
                                        {noticia?.state === 1 ? 'Activo' : 'Inactivo'}
                                    </span>
                                </th>

                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {new Date(noticia.date).toLocaleDateString()}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <button onClick={() => handleEdit(noticia)}>
                                        <FontAwesomeIcon icon={faEdit} className={"fas fa-tools ml-3 text-sm "} />
                                    </button>

                                    <FontAwesomeIcon onClick={() => handleDelete(noticia.id)} icon={faTrash} className={"fas fa-tools ml-4 text-sm text-red-600"} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <Dialog
                        header={editingQuestion ? "Editar Pregunta" : "Nueva Pregunta"}
                        visible={visible}
                        style={{ width: "50vw" }}
                        onHide={handleCancel}
                    >
                        <form onSubmit={editingQuestion ? handleSave : handleSubmit}>
                            {/* Campo para el título */}
                            <div className="mb-3">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    placeholder="Título de la pregunta"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Pregunta a la gente
                                </label>
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    placeholder="Crees tu que la delincuencia en Juliaca termine?"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Opciones
                                </label>
                                <div className="flex gap-x-5">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => setOption(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        placeholder="Sí"
                                    />
                                    <button
                                        onClick={handleAddoption}
                                        type="button"
                                        className="bg-blue-500 px-4 rounded-md text-white"
                                    >
                                        Añadir
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Opciones añadidas:
                                </label>
                                {/* Renderiza los elementos añadidos como una lista */}
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between mt-2 px-3 py-2 border rounded-lg text-sm bg-gray-100"
                                    >
                                        <span>{item}</span>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="fas fa-tools ml-4 text-sm text-red-600 cursor-pointer"
                                            onClick={() => {
                                                // Función para eliminar la opción seleccionada
                                                const updatedItems = items.filter((_, i) => i !== index);
                                                setItems(updatedItems);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>


                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setSatate(1)}
                                        className={`px-4 py-2 rounded-lg border ${state === 1 ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                                    >
                                        Activo
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSatate(0)}
                                        className={`px-4 py-2 rounded-lg border ${state === 0 ? "bg-blue-100 border-yellow-500 text-yellow-500" : "border-gray-300 text-gray-500"}`}
                                    >
                                        Inactivo
                                    </button>
                                </div>
                            </div>
                            {/* Progreso de subida */}
                            {progress > 0 && (
                                <div className="mb-3">
                                    <p className="text-sm text-gray-700">Progreso: {progress}%</p>
                                    <div className="w-full bg-gray-200 rounded-full">
                                        <div
                                            className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                            style={{ width: `${progress}%` }}
                                        >
                                            {progress}%
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Botones */}
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </Dialog>
                </table>
            </div>
        </div>
    );
};

export default TableadminQuestions;
