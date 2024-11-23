import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../constants/firebaseConfig";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "primereact/dialog";
import { faEdit, faFileExport, faFilter, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaImage, FaSmile } from "react-icons/fa";

const Tableadmimpolitica = () => {
  const [visible, setVisible] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [descripcion, setDescripcion] = useState("");
  const [image, setImage] = useState("");
  const [state, setState] = useState(0);
  const [titulo, setTitulo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const exportToCSV = (data, filename = 'politica.csv') => {
    const csvRows = [];
    const headers = ['Título', 'Descripción', 'Fuente', 'Fecha'];
    csvRows.push(headers.join(','));

    data.forEach(noticia => {
      const row = [
        noticia.titulo,
        noticia.descripcion.replace(/,/g, ''), // Evitar que las comas rompan el CSV
        noticia.fuente,
        new Date(noticia.fecha).toLocaleDateString()
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = `data:text/csv;charset=utf-8,${csvRows.join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Función para obtener las noticias desde Firestore
  const fetchNoticias = async () => {
    const noticiasCollection = collection(db, "politica");
    const noticiasSnapshot = await getDocs(noticiasCollection);
    const noticiasList = noticiasSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNoticias(noticiasList);
  };

  // Llamada al efecto para obtener las noticias al cargar el componente
  useEffect(() => {
    fetchNoticias();
  }, []);

  const filteredNoticias = noticias.filter(noticia =>
    noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCancel = () => {
    setEditingNews(null); // Limpia el usuario en edición
    setTitulo('');
    setDescripcion('');
    setImage('');
    setState(0);
    setVisible(false); // Cierra el modal
  };
  const handleEdit = (question) => {
    setEditingNews(question);
    setTitulo(question.titulo)
    setState(question.state || 1);
    setDescripcion(question.descripcion);
    setVisible(true);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      const newNews = {
        image: image,
        titulo: titulo,
        descripcion: descripcion,
        state: state,
        fuente: 'ManisNews',
        fecha: formattedDate

      };

      // Guardar los datos adicionales en Firestore
      const docRef = await addDoc(collection(db, "politica"), newNews);

      const newsWithId = {
        ...newNews,
        id: docRef.id // Se obtiene el ID generado automáticamente por Firestore
      };

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

      setNoticias((prevNoticias) => [newsWithId, ...prevNoticias]);

      setVisible(false);
      Toast.fire({
        icon: "success",
        title: "Noticia registrada exitosamente"
      });
      // Redireccionar al usuario después de registrarse
    } catch (err) {
      setError(err.message);
      console.log(err)
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingNews) {
        // Actualiza los datos del usuario existente
        const today = new Date();
        const date = today.toISOString().split('T')[0];

        const userDoc = doc(db, "politica", editingNews.id);
        await updateDoc(userDoc, {
          titulo,
          descripcion,
          fuente: 'ManisNews',
          state,
          fecha: date,
        });

        // Actualiza el estado local
        setNoticias((prevNoticias) =>
          prevNoticias.map((noticia) =>
            noticia.id === editingNews.id
              ? { ...noticia, titulo, descripcion }
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
          title: "Noticia actualizado exitosamente"
        });

      }

      // Limpia y cierra el modal
      handleCancel();
    } catch (err) {
      console.error("Error al actualizar la noticia:", err);
    } finally {
      setLoading(false);
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
          <button onClick={() => setVisible(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center ">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Nueva Noticia
          </button>
        </div>
      </div>
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full  max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Noticias sobre Politica
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Título
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Descripción
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Fuente
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
                  {noticia.titulo}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {noticia.descripcion.length > 10
                    ? `${noticia.descripcion.substring(0, 10)}...`
                    : noticia.descripcion}
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {noticia.fuente}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {new Date(noticia.fecha).toLocaleDateString()}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <FontAwesomeIcon onClick={() => handleEdit(noticia)} icon={faEdit} className={"fas fa-tools ml-3 text-sm "} />
                  <FontAwesomeIcon onClick={() => handleDelete(noticia.id)} icon={faTrash} className={"fas fa-tools ml-4 text-sm text-red-600"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog header={editingNews ? "Editar Noticia" : "Nuevo Noticia"} visible={visible} style={{ width: '50vw' }} onHide={handleCancel}>
          <form onSubmit={editingNews ? handleSave : handleRegister}>
            {
              !editingNews && (
                <div className="mb-3">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
                    Link de imagen
                  </label>
                  <div className="relative">
                    <input
                      className="w-full pl-8 relative px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="image"
                      type="text"
                      placeholder="https://images.com"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      required
                    />
                    <FaImage className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              )
            }
            <div className="mb-3">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
                Titulo
              </label>
              <div className="relative">
                <input
                  className="w-full pl-8 relative px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="titulo"
                  type="text"
                  placeholder="Zela Alex será el teniente de Juliaca"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
                <FaSmile className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-3 py-3 border rounded-lg  text-sm"
                placeholder="Escribe una breve descripción..."
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado:</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setState(1)}
                  className={`px-4 py-2 rounded-lg border ${state === 1 ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                >
                  Activo
                </button>
                <button
                  type="button"
                  onClick={() => setState(0)}
                  className={`px-4 py-2 rounded-lg border ${state === 0 ? "bg-blue-100 border-red-500 text-red-500" : "border-gray-300 text-gray-500"}`}
                >
                  Inactivo
                </button>
              </div>
            </div>
            <div className="flex gap-x-20 justify-center text-center pt-1 mb-12 pb-1">
              <button
                className={"w-full px-4 py-2 font-bold text-black bg-[#e0e8ee] rounded-full focus:outline-none focus:shadow-outline $"}
                onClick={handleCancel}
              >

                <div className="flex justify-center items-center">

                  Cancelar
                </div>

              </button>
              <button
                className={`w-full px-4 py-2 font-bold text-white bg-[#054D88] rounded-full focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                type="submit"
                disabled={loading}
              >
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
                  "Guardar"
                )}
              </button>
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default Tableadmimpolitica;
