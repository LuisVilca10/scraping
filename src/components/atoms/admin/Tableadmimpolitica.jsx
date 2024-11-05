import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../constants/firebaseConfig";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Tableadmimpolitica = () => {
  const [noticias, setNoticias] = useState([]);

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

  return (

    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Noticias
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
            {noticias.map((noticia) => (
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
                  <Link to={`/politica/${noticia.id}`}>
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

export default Tableadmimpolitica;
