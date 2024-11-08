import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../constants/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileExport, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Tableadminusers = () => {
  const [noticias, setNoticias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // Función para obtener las noticias desde Firestore
  const fetchNoticias = async () => {
    const noticiasCollection = collection(db, "usuarios");
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
    noticia.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.email.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (

    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-t-lg">
        <div className="flex items-center bg-white shadow-sm rounded-lg">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Buscar Usuario"
            className="outline-none px-2 py-3 bg-transparent w-96 text-gray-600 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-3 text-sm">
          <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center">
            <FontAwesomeIcon icon={faFileExport} className="mr-2" />
            Exportar
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center ">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Nuevo Usuario
          </button>
        </div>
      </div>
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Usuarios
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Nombres
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Apellidos
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Correo
              </th>
              {/* <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Fecha
              </th> */}
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredNoticias.map((noticia) => (
              <tr key={noticia.id}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {noticia.name}
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {noticia.lastName}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {noticia.email}
                </td>
                {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {new Date(noticia.fecha).toLocaleDateString()}
                </td> */}
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <Link to={`/deportedetalle/${noticia.id}`}>
                    <FontAwesomeIcon icon={faEdit} className={"fas fa-tools ml-3 text-sm "} />
                  </Link>

                  <FontAwesomeIcon icon={faTrash} className={"fas fa-tools ml-4 text-sm text-red-600"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tableadminusers;
