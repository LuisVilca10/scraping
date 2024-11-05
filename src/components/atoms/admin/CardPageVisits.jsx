import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../constants/firebaseConfig";
import { useEffect, useState } from "react";

const parseFechaString = (fechaString) => {
  const mesesEspañol = { enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5, julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11 };
  const mesesIngles = { january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6, august: 7, september: 8, october: 9, november: 10, december: 11 };
  const partes = fechaString.replace(",", "").split(" ");

  if (partes.length === 3) {
    const [p1, p2, anio] = partes;
    const anioNum = parseInt(anio);
    if (!isNaN(parseInt(p1)) && mesesEspañol[p2.toLowerCase()] !== undefined) return new Date(anioNum, mesesEspañol[p2.toLowerCase()], parseInt(p1));
    if (mesesIngles[p1.toLowerCase()] !== undefined && !isNaN(parseInt(p2))) return new Date(anioNum, mesesIngles[p1.toLowerCase()], parseInt(p2));
    if (mesesEspañol[p1.toLowerCase()] !== undefined && !isNaN(parseInt(p2))) return new Date(anioNum, mesesEspañol[p1.toLowerCase()], parseInt(p2));
  }
  return null;
};

const CardPageVisits = () => {
  const [noticias, setNoticias] = useState([]);

  const fetchNoticias = async () => {
    const noticiasCollection = collection(db, "noticias");
    const noticiasSnapshot = await getDocs(noticiasCollection);
    const noticiasList = noticiasSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      fechaDate: parseFechaString(doc.data().fecha), // Convertir fecha a objeto Date
    }));

    // Ordenar las noticias por fecha en orden descendente
    const noticiasOrdenadas = noticiasList
      .filter((noticia) => noticia.fechaDate) // Filtrar noticias con fechas válidas
      .sort((a, b) => b.fechaDate - a.fechaDate) // Ordenar por fecha
      .slice(0, 5); // Limitar a las 5 más recientes

    setNoticias(noticiasOrdenadas);
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Últimas Noticias
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
                  Fecha
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Fuente
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
                    {noticia.fecha}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {noticia.fuente}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CardPageVisits;
