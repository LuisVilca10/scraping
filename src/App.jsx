import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './constants/firebaseConfig';

function App() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      const querySnapshot = await getDocs(collection(db, 'noticiastvsur'));
      const noticiasArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNoticias(noticiasArray);
    };

    fetchNoticias();
  }, []);

  console.log(noticias);
  return (
    <>
      <div>
        {/* nav bar */}
        <div className="bg-[#054D88] w-full">
          <div className=" container mx-auto w-full m-auto items-center text-center text-white uppercase md:text-5xl text-2xl py-3 font-black">
            Portal web de noticias con Scraping
          </div>
        </div>
      </div>
      {/*  */}
      * <section className="w-full gradient-form">
        <div className="container mx-auto h-full w-full">
          <div className="flex justify-center w-full  my-5 items-center flex-wrap h-full g-6 text-white ">
            <div className="xl:w-10/12 border">
              <div className="block shadow-lg rounded-3xl w-full">
                <div className="lg:flex lg:flex-wrap">
                  <div class="relative w-full max-w-lg rounded-3xl overflow-hidden">
                    <img
                      class="w-full"
                      src="https://imgmedia.larepublica.pe/612x361/larepublica/original/2024/09/01/66d3806c2d7a032cea208024.png"
                      alt="logo"
                    />
                    <div class="absolute bottom-4 left-4 right-4 font-semibold bg-black bg-opacity-60 text-white py-2 px-4 rounded-md">
                      <p className="text-[#3794e0] mb-2 font-extralight">Fecha: 2 septiembre, 2024</p>
                      <a href="#">
                        PJ dicta 15 meses de prisión preventiva contra policías implicados en secuestro de Iván Siucho
                      </a>
                    </div>
                  </div>

                  <div className="lg:w-7/12 px-6  pb-0.5 md:px-0 text-black">
                    <div className="container mx-auto py-2 px-5">
                      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">

                        <div className="w-1/3">
                          <img
                            className="object-cover w-full h-full"
                            src="https://imgmedia.larepublica.pe/612x361/larepublica/original/2024/09/01/66d3806c2d7a032cea208024.png"
                            alt="Descripción de la imagen"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <h2 className="text-lg font-semibold">
                            Trabajador del Parque de las Leyendas murió por asfixia por sumersión
                          </h2>
                          <p className="text-[#25679c] mt-2 font-extralight">Fecha: 2 septiembre, 2024</p>
                        </div>
                      </div>
                    </div>
                    <div className="container mx-auto py-2 px-5">
                      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">

                        <div className="w-1/3">
                          <img
                            className="object-cover w-full h-full"
                            src="https://imgmedia.larepublica.pe/612x361/larepublica/original/2024/09/01/66d3806c2d7a032cea208024.png"
                            alt="Descripción de la imagen"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <h2 className="text-lg font-semibold">
                            Trabajador del Parque de las Leyendas murió por asfixia por sumersión
                          </h2>
                          <p className="text-[#25679c] mt-2 font-extralight">Fecha: 2 septiembre, 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}


      {/*  */}
      <section className="container mx-auto my-5 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Sección de Noticias Regionales */}
          <div className="col-span-2">
            <div className="flex mb-4">
              <h2 className="text-xl font-bold pr-4 border-r-4 border-[#25679c]">Regionales</h2>
              <a href='#' className="text-gray-600 mt-1 ml-3">Ver más</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {noticias.map((noticia, index) => (
                <Card
                  key={index}
                  className="border rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={noticia.image}
                    alt={noticia.titulo}
                    className="align-middle h-full w-full object-contain"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-2">{noticia.titulo}</h3>
                    <p className="text-gray-600 mt-2 text-sm">{noticia.descripcion}</p>
                    <p className="text-[#054D88] mt-5 text-end text-xs">Fecha: {noticia.fecha}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sección de Últimas Noticias */}
          <div className="col-span-1 px-12 py-4">
            <h2 className="text-xl font-bold mb-4">Últimas Noticias</h2>
            {noticias.map((noticia) => (
              <ul className="divide-y divide-gray-200">
                <li className="py-2">
                  <a href="#" className="block text-gray-800 hover:text-[#357cb6]">
                    <h4 className="font-semibold">{noticia.titulo}</h4>
                  </a>
                  <p className="text-[#054D88] text-xs">Fecha: {noticia.fecha}</p>
                </li>
              </ul>

            ))}
          </div>
        </div>
      </section>
      {/*  */}
      {/*  */}
      <footer className="bg-[#054D88] text-black py-1">
        <div className="container mx-auto">
          <div className="mx-8 lg:mx-3 flex flex-col gap-y-4 lg:flex-row items-center justify-between py-2 text-center ">
            <div className="flex gap-x-3 flex-col items-center">
              {/* <img
                className="h-10 w-1/2"
                src="../src/assets/logo.png"
                alt=""
              /> */}
              <div className=" font-serif text-white ">
                30 de agosto del 2024
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <div className="text-center lg:text-left text-white">
                © 2024 LuisDev´s , All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/*  */}
    </>

  )
}

export default App
