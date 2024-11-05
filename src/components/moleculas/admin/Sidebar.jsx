import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faNewspaper, faTv } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Toggler */}
        <button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {/* Brand */}
        <Link
          className="md:block text-left  text-blueGray-600 mr-0 inline-block whitespace-nowrap text-2xl uppercase font-bold mt-2 px-0"
        >
          Noticiero
        </Link>
       
        <div
          className={
            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-1 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
            collapseShow
          }
        >
          {/* Collapse header */}
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <Link
                  className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace- text-sm uppercase font-bold p-4 px-0"
                  to="/"
                >
                  Notus React
                </Link>
              </div>
              <div className="w-6/12 flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow("hidden")}
                >
                 
                </button>
              </div>
            </div>
          </div>
         

          {/* Divider */}
          <hr className="my-4 md:min-w-full border border-black" />
          {/* Heading */}
          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Panel de Administrador
          </h6>
          {/* Navigation */}

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/admin/dashboard") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                to="/admin/"
              >
                <FontAwesomeIcon icon={faTv} className={
                    "fas fa-tv mr-2 text-sm " +
                    (window.location.href.indexOf("/admin/dashboard") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  } />{" "}
                Dashboard
              </Link>
            </li>

            <li className="items-center">
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/admin/settings") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                to="/admin/noticias"
              >
                <FontAwesomeIcon icon={faNewspaper} className={
                    "fas fa-tools mr-2 text-sm " +
                    (window.location.href.indexOf("/admin/settings") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  } />{" "}
                Noticias
              </Link>
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/admin/settings") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                to="/admin/deportes"
              >
                <FontAwesomeIcon icon={faNewspaper} className={
                    "fas fa-tools mr-2 text-sm " +
                    (window.location.href.indexOf("/admin/settings") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  } />{" "}
                Deportes
              </Link>
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/admin/settings") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                to="/admin/politica"
              >
                <FontAwesomeIcon icon={faNewspaper} className={
                    "fas fa-tools mr-2 text-sm " +
                    (window.location.href.indexOf("/admin/settings") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  } />{" "}
                Politica
              </Link>
            </li>

            {/* <li className="items-center">
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/admin/tables") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                to="/admin/tables"
              >
                <i
                  className={
                    "fas fa-table mr-2 text-sm " +
                    (window.location.href.indexOf("/admin/tables") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}
                Tables
              </Link>
            </li> */}

            {/* <li className="items-center">
              <Link
                className={
                  "text-xs uppercase py-3 font-bold block " +
                  (window.location.href.indexOf("/admin/maps") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
                
              >
                <i
                  className={
                    "fas fa-map-marked mr-2 text-sm " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}
                Maps
              </Link>
            </li> */}
          </ul>

        

          {/* Divider */}
          <hr className="my-4 md:min-w-full border border-black" />
          {/* Heading */}
          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Ajustes
          </h6>
          {/* Navigation */}
          <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            {/* <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/colors/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
              >
                <i className="fas fa-paint-brush mr-2 text-blueGray-300 text-base"></i>
                Styles
              </a>
            </li> */}
{/* 
            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
              >
                <i className="fab fa-css3-alt mr-2 text-blueGray-300 text-base"></i>
                CSS Components
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
              >
                <i className="fab fa-angular mr-2 text-blueGray-300 text-base"></i>
                Angular
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
              >
                <i className="fab fa-js-square mr-2 text-blueGray-300 text-base"></i>
                Javascript
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
              >
                <i className="fab fa-react mr-2 text-blueGray-300 text-base"></i>
                NextJS
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
              >
                <i className="fab fa-react mr-2 text-blueGray-300 text-base"></i>
                React
              </a>
            </li>

            <li className="inline-flex">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/svelte/overview/notus"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
              >
                <i className="fas fa-link mr-2 text-blueGray-300 text-base"></i>
                Svelte
              </a>
            </li> */}

            <li className="inline-flex">
              <Link
                to={"/"}
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
              >
                <i className="fab fa-vuejs mr-2 text-blueGray-300 text-base"></i>
                Cerrar Sesion
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;