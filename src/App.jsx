import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
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

  const header = (noticia) => (
    <div className="mb-5 rounded-lg overflow-hidden">
      <img
        alt="Card"
        src={noticia.image}
        className="align-middle h-full w-full object-contain"
      />
    </div>
  );
  const footer = (
    <div className="flex justify-end gap-x-2">
      <Button label="Ver mas" icon="pi pi-plus" className="bg-gradient text-white px-4 py-2 rounded hover:bg-black mr-2 border-none" />
    </div>
  );

  console.log(noticias);
  return (
    <>
      <div>
        {/* nav bar */}
        <div className="bg-gradient w-full">
          <div className=" container mx-auto w-full m-auto items-center text-center text-white uppercase md:text-4xl text-2xl py-3 font-semibold  border-b-2 ">
            Portal web de noticias con Scraping
          </div>
        </div>
      </div>

      <section className="container mx-auto my-5">
        <div className='className="mx-2 grid md:grid-cols-2 lg:grid-cols-3 gap-x-3"'>
          {noticias.map(noticia => (
            <Card
              title={noticia.titulo}
              header={header(noticia)}
              footer={footer}
              className='container mx-auto mb-7 w-ful  max-w-sm border rounded-lg shadow-xl p-5'
            >
              <span className="text-end flex justify-end mb-5 text-sm font-semibold">
                Fecha: {noticia.fecha}
              </span>
              
              <div className="mb-6">
                <p className="text-gray-500 line-clamp-3">
                  {noticia.descripcion}
                </p>
              </div>
              
            </Card>
          ))}
        </div>
      </section>

    </>

  )
}

export default App
