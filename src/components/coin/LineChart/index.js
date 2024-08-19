import React, { useEffect, useRef } from "react";
import { convertNumber } from "../../../functions/convertNumber";
import Chart from "chart.js/auto";

function LineChart({ chartData, priceType, multiAxis }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous chart instance
    }

    const options = {
      plugins: {
        legend: {
          display: multiAxis ? true : false,
        },
      },
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              if (priceType === "prices") return "$" + value.toLocaleString();
              else {
                return "$" + convertNumber(value);
              }
            },
          },
        },
      },
    };

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "line",
      data: chartData,
      options: options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Cleanup on component unmount
      }
    };
  }, [chartData, priceType, multiAxis]); // Re-create chart when dependencies change

  return <canvas ref={chartRef}></canvas>;
}

export default LineChart;
