import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../constants/firebaseConfig';
import Navbar from '../components/moleculas/Navbar';
import Footer from '../components/moleculas/Footer';
import { Link } from 'react-router-dom';


function App() {
  const [noticias, setNoticias] = useState([]);
  const [deportes, setDeportes] = useState([]);
  const [politica, setPolitica] = useState([]);
  const [sponsor, setSponsor] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const userData = JSON.parse(localStorage.getItem('userData')) || null;
  console.log(userData)
  useEffect(() => {
    const fetchNoticias = async () => {
      const querySnapshot = await getDocs(collection(db, 'noticias'));
      const querydeportes = await getDocs(collection(db, 'deportes'));
      const queryolitica = await getDocs(collection(db, 'politica'));
      const querysponsors = await getDocs(collection(db, 'sponsors'));
      const queryquestions = await getDocs(collection(db, 'questions'));
      const noticiasArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const deportessArray = querydeportes.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const politicasArray = queryolitica.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sponsorArray = querysponsors.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const questionsArray = querysponsors.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNoticias(shuffle(noticiasArray));
      setDeportes(shuffle(deportessArray));
      setPolitica(shuffle(politicasArray));
      setSponsor(shuffle(sponsorArray));
      setQuestions(shuffle(questionsArray));
    };

    fetchNoticias();
  }, []);

  if (noticias.length === 0) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % noticias.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + noticias.length) % noticias.length);
  };
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  console.log(noticias);
  return (
    <>
      <Navbar />



      {/*  */}
      <section className="container mx-auto my-5 mt-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className='pr-6'>
            {(userData?.plan === "Premium" || userData?.plan === "Super-VIP") && (
              <div className="p-4 bg-blue-100 rounded mb-10">
                <h3 className="font-bold text-lg">Clima en tu región</h3>
                <p>22°C | Soleado</p>
              </div>
            )
            }
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

            {(userData === null || userData?.plan === "Básico" || userData?.plan === "Premium") && (

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Patrocinado</h2>
                {sponsor.map((item, index) => (
                  <div
                    className="bg-gray-200 h-48 rounded-lg shadow-md flex items-center justify-center relative mb-8 "
                    style={{
                      backgroundImage: "url('data:image/jpeg;base64,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')",
                      backgroundSize: "cover",
                      height: "full",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      borderRadius: "12px",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center rounded-lg justify-center bg-black bg-opacity-50">
                      <p className="text-white font-bold text-center">
                        {item.title} - ¡{item.description}!
                      </p>
                    </div>
                  </div>
                ))}

                {/* Otro contenedor con imagen */}
              </div>
            )
            }

          </div>

          {/* Sección de Noticias Regionales */}
          <div className="col-span-2">

            <h2 className="text-2xl font-bold mb-5 ">Destacados del día</h2>
            <div className="relative w-full h-80 overflow-hidden mb-6">
              {noticias.map((item, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-200 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full`}
                >
                  <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:w-1/2 bg-[#c5dff5] p-5 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold mt-2 mb-4">{item.titulo}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-6">{item.descripcion}</p>
                    </div>
                    <div className="md:w-1/2">
                      <img src={item.image} alt={item.titulo} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-0.5 transform -translate-y-10 text-blue-600  p-2 rounded-full"
              >
                &#10094;
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-0.5 transform -translate-y-10 text-blue-600 p-2 rounded-full"
              >
                &#10095;
              </button>
            </div>
            {userData?.plan === "Premium" || userData?.plan === "Super-VIP" && (
              <div className="flex items-center mb-6">
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
            )}

            {userData?.plan === "Super-VIP" && (
              <div className="flex items-center border p-2 rounded my-4">
                <input
                  type="text"
                  placeholder="Buscar noticias..."
                  className="flex-grow p-2 outline-none"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Buscar</button>
              </div>
            )

            }


            <div className="flex mb-4">
              <h2 className="text-xl font-bold pr-4 border-r-4 border-[#25679c]">Noticias Regionaes</h2>
              <Link to={"/noticias"} href='#' className="text-gray-600 mt-1 ml-3">Ver más</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {noticias.slice(0, 5).map((noticia, index) => (
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

            <div className="flex my-5">
              <h2 className="text-xl font-bold pr-4 border-r-4 border-[#25679c]">Deportes</h2>
              <Link to={"/deportes"} href='#' className="text-gray-600 mt-1 ml-3">Ver más</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Limitando el número de noticias a 6 */}
              {deportes.slice(0, 5).map((noticia, index) => (
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

            <div className="flex my-5">
              <h2 className="text-xl font-bold pr-4 border-r-4 border-[#25679c]">Politica</h2>
              <Link to={"/politicas"} href='#' className="text-gray-600 mt-1 ml-3">Ver más</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Limitando el número de noticias a 6 */}
              {politica.slice(0, 5).map((noticia, index) => (
                <Card key={index} className="border rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={noticia.image}
                    alt={noticia.titulo}
                    className="align-middle h-full w-full object-contain"
                  />
                  <div className="p-4">
                    <Link to={`/politica/${noticia.id}`}><h3 className="font-semibold text-lg line-clamp-2 hover:text-[#357cb6]">{noticia.titulo}</h3></Link>
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

          {/* Sección de Últimas Noticias */}
          <div className="col-span-1 pl-7 py-4">
            <h2 className="text-xl font-bold mb-4">Últimas Noticias</h2>
            {noticias.slice(0, 37).map((noticia, index) => (
              <ul key={index} className="divide-y divide-gray-200">
                <li className="py-2">
                  <a href="#" className="block text-gray-800 hover:text-[#357cb6]">
                    <Link to={`/noticiadetalle/${noticia.id}`}><h3 className="font-semibold text-lg line-clamp-2 hover:text-[#357cb6]">{noticia.titulo}</h3></Link>
                  </a>
                  <p className="text-[#054D88] text-xs">Fecha: {noticia.fecha}</p>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </section>
      {/*  */}

      <Footer />
    </>

  )
}

export default App
