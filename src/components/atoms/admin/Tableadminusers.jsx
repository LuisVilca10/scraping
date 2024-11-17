import { useState, useEffect } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../../../constants/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileExport, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { FaEnvelope, FaKey, FaUser } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const Tableadminusers = () => {
  const [noticias, setNoticias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [typeuser, setTypeUser] = useState(3);
  const [typeplan, setTypePlan] = useState('');
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const newUser = {
        id: user.uid, // Usamos el UID generado por Firebase Auth como ID
        name: name,
        lastName: lastName,
        email: email,
        plan: typeplan,
        type_user: typeuser,
      };

      // Guardar los datos adicionales en Firestore
      await setDoc(doc(db, "usuarios", user.uid), newUser);


      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      // Actualizar el estado de noticias para incluir al nuevo usuario
      setNoticias((prevNoticias) => [newUser, ...prevNoticias]);

      setVisible(false);
      Toast.fire({
        icon: "success",
        title: "Usuario registrado exitosamente"
      });
      // Redireccionar al usuario después de registrarse
    } catch (err) {
      setError(err.message);
      console.log(error)
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

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
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center " onClick={() => setVisible(true)}>
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
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                plan
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Rol
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
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {noticia.plan}
                </td>
                {noticia.type_user === 1 && (<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  Administrador
                </td>)}
                {noticia.type_user === 2 && (<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  Pediodista
                </td>)}
                {noticia.type_user === 3 && (<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  Cliente
                </td>)}
                {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {new Date(noticia.fecha).toLocaleDateString()}
                </td> */}
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button onClick={() => setVisible(true)}>
                    <FontAwesomeIcon icon={faEdit} className={"fas fa-tools ml-3 text-sm "} />
                  </button>

                  <FontAwesomeIcon icon={faTrash} className={"fas fa-tools ml-4 text-sm text-red-600"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog header="Nuevo Usuario" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
                Nombre Completo
              </label>
              <div className="relative">
                <input
                  className="w-full pl-8 relative px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Juan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <FaUser className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastname">
                Apellidos Completo
              </label>
              <div className="relative">
                <input
                  className="w-full pl-8 relative px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  placeholder="Pérez Pérez"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <FaUser className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  className="w-full pl-8 relative px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FaEnvelope className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setTypeUser(1)}
                  className={`px-4 py-2 rounded-lg border ${typeuser === 1 ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                >
                  Administrador
                </button>
                <button
                  type="button"
                  onClick={() => setTypeUser(2)}
                  className={`px-4 py-2 rounded-lg border ${typeuser === 2 ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                >
                  Pediodista
                </button>
                <button
                  type="button"
                  onClick={() => setTypeUser(3)}
                  className={`px-4 py-2 rounded-lg border ${typeuser === 3 ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                >
                  Cliente
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setTypePlan('Básico')}
                  className={`px-4 py-2 rounded-lg border ${typeplan === 'Básico' ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                >
                  Básico
                </button>
                <button
                  type="button"
                  onClick={() => setTypePlan('Super-VIP')}
                  className={`px-4 py-2 rounded-lg border ${typeplan === 'Super-VIP' ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                >
                  Premium
                </button>
                <button
                  type="button"
                  onClick={() => setTypePlan('Premium')}
                  className={`px-4 py-2 rounded-lg border ${typeplan === 'Premium' ? "bg-blue-100 border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
                >
                  Super VIP
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="w-full pl-8 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FaKey className="absolute left-3 top-2.5 text-gray-400" />
                <i className="fas fa-lock absolute left-3 top-2 text-gray-400"></i>
              </div>
            </div>
            <div className="text-center pt-1 mb-12 pb-1">
              <button
                className={`w-full px-4 py-2 font-bold text-white bg-[#054D88] rounded-full focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Cargando...
                  </div>
                ) : (
                  "Registrarse"
                )}
              </button>
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default Tableadminusers;
