import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../constants/firebaseConfig";

ChartJS.register(BarController, BarElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

// Función para convertir la fecha en diferentes formatos a un objeto Date
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

const CardBarChart = () => {
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "noticias"));
      const fuentesMap = { "los andes": "Los Andes", "sin fronteras": "Sin Fronteras", "tv sur": "TV Sur" };
      const monthlyCounts = { "Los Andes": Array(12).fill(0), "Sin Fronteras": Array(12).fill(0), "TV Sur": Array(12).fill(0) };

      snapshot.forEach((data) => {
        const noticias = data.data();
        const fecha = parseFechaString(noticias.fecha);
        if (fecha) {
          const fuente = fuentesMap[noticias.fuente.trim().toLowerCase()];
          const month = fecha.getMonth();
          if (fuente && monthlyCounts[fuente]) monthlyCounts[fuente][month] += 1;
        }
      });

      updateChartData(monthlyCounts);
    };

    fetchData();
  }, []);

  const updateChartData = (monthlyCounts) => {
    const config = {
      type: "bar",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        datasets: [
          { label: "Los Andes", backgroundColor: "#ed64a6", borderColor: "#ed64a6", data: monthlyCounts["Los Andes"], barThickness: 8 },
          { label: "Sin Fronteras", backgroundColor: "#4c51bf", borderColor: "#4c51bf", data: monthlyCounts["Sin Fronteras"], barThickness: 8 },
          { label: "TV Sur", backgroundColor: "#2dce89", borderColor: "#2dce89", data: monthlyCounts["TV Sur"], barThickness: 8 },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: { align: "end", position: "bottom" },
        scales: { xAxes: [{ display: false }], yAxes: [{ display: true }] },
      },
    };

    let ctx = document.getElementById("bar-chart").getContext("2d");
    new ChartJS(ctx, config);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Total de Noticias por Mes
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBarChart;
