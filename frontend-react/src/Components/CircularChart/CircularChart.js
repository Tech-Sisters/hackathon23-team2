import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CircularChart = () => {
  const s = 15;
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const canvas = chartRef.current;
    const context = canvas.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(context, {
      type: "doughnut",
      data: {
        labels: [`Weak: ${s}`, `Medium: ${s}`, `Strong: ${s}`],
        datasets: [
          {
            label: "Circular Chart",
            data: [15, 15, 15],
            backgroundColor: ["#D39898", "#D3C398", "#A7C39F"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "90%",
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default CircularChart;
