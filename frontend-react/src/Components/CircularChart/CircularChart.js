import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CircularChart = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const surahStrengthCount = props.surahStrengthCount;
  useEffect(() => {
    const canvas = chartRef.current;
    const context = canvas.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(context, {
      type: "doughnut",
      data: {
        labels: [
          `Weak: ${surahStrengthCount.weakCount} Surah`,
          `Medium: ${surahStrengthCount.mediumCount} Surah`,
          `Strong: ${surahStrengthCount.strongCount} Surah`,
          `Not Selected: ${surahStrengthCount.emptyCount} Surah`,
        ],
        datasets: [
          {
            label: "Circular Chart",
            data: [
              surahStrengthCount.weakCount,
              surahStrengthCount.mediumCount,
              surahStrengthCount.strongCount,
              surahStrengthCount.emptyCount,
            ],
            backgroundColor: ["#D39898", "#D3C398", "#A7C39F", "#847EA7"],
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
