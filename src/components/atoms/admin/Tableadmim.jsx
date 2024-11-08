import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../constants/firebaseConfig";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileExport, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

// Función para exportar datos a CSV
const exportToCSV = (data, filename = 'noticias.csv') => {
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

const AdminNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Función para obtener las noticias desde Firestore
  const fetchNoticias = async () => {
    const noticiasCollection = collection(db, "noticias");
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
          <button
            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center"
            onClick={() => exportToCSV(noticias)}
          >
            <FontAwesomeIcon icon={faFileExport} className="mr-2" />
            Exportar
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center ">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Nueva Noticia
          </button>
        </div>
      </div>
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Noticias Regionales
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
                  <Link to={`/noticiadetalle/${noticia.id}`}>
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

export default AdminNoticias;
