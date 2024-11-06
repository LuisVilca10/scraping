const Header = () => {
    return (<div className="bg-white shadow-md p-4 flex justify-end items-center ml-64 pr-7">
        <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-search"></i> {/* Icono de búsqueda */}
            </button>
            <button className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-chart-bar"></i> {/* Icono de gráficos */}
            </button>
            <button className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-layer-group"></i> {/* Icono de capas */}
            </button>
            <button className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-comment-dots"></i> {/* Icono de comentarios */}
            </button>
            <button className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-th"></i> {/* Icono de cuadrícula */}
            </button>
            <div className="bg-blue-100 text-blue-600 rounded-full px-3 py-1">LM</div> {/* Iniciales */}
        </div>
    </div>)
};

export default Header;