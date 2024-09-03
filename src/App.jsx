import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function App() {
  const header = (
    <div className="mb-5 rounded-lg overflow-hidden">
      <img
        alt="Card"
        src="https://imgmedia.larepublica.pe/612x361/larepublica/original/2024/09/01/66d3806c2d7a032cea208024.png"
        className="align-middle h-full w-full object-contain"
      />
    </div>

  );

  const footer = (
    <div className="flex justify-between mt-3 gap-x-2">
      <Button label="Save" icon="pi pi-check" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2 border-none" />
      <Button label="Cancel" icon="pi pi-times" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 border-none" />
    </div>
  );
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
      {/* nav bar */}
      {/* <section className="w-full gradient-form bg-gradient">
        <div className="container m-auto py-6 px-6 h-full w-full">
          <div className="flex w-full justify-center items-center flex-wrap h-full g-6 text-white">
            <div className="xl:w-9/12">
              <div className="block shadow-lg rounded-3xl w-full">
                <div className="lg:flex lg:flex-wrap">
                  <div className="hidden lg:block bg-[#186896] rounded-3xl lg:w-6/12 items-center py-10 lg:rounded-r-lg rounded-b-lg ">
                    <img
                      className="w-96 container mx-auto "
                      src="https://imgmedia.larepublica.pe/612x361/larepublica/original/2024/09/01/66d3806c2d7a032cea208024.png"
                      alt="logo"
                    />

                  </div>

                  <div className="lg:w-6/12 px-6 pt-6 pb-0.5 md:px-0">
                    <div className="container m-auto md:p-12">
                      <div className="text-center">
                        <h4 className="font-bold mt-1 mb-8 pb-1 text-4xl">
                          asd
                        </h4>
                      </div>
                      asdasd
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* fin seeccion */}
      <section className="container mx-auto my-5">
        <div className='className="mx-2 grid md:grid-cols-2  lg:grid-cols-4 gap-x-3 "'>
          <Card
            title="Advanced Card"
            header={header}
            footer={footer}
            className='container mx-auto mb-7 w-ful  max-w-sm border rounded-lg shadow-xl p-5'
          >
            <div className="mb-6">
              <p className="text-gray-500 line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
                cupiditate neque quas!
              </p>
            </div>
          </Card>
        </div>
      </section>

    </>

  )
}

export default App
