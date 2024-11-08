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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNoticias = async () => {
      const querySnapshot = await getDocs(collection(db, 'noticias'));
      const querydeportes = await getDocs(collection(db, 'deportes'));
      const queryolitica = await getDocs(collection(db, 'politica'));
      const noticiasArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const deportessArray = querydeportes.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const politicasArray = queryolitica.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNoticias(shuffle(noticiasArray));
      setDeportes(shuffle(deportessArray));
      setPolitica(shuffle(politicasArray));
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
          <div className="col-span-1 px-12 py-4">
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
