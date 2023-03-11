import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: props?.labelArray,
    datasets: props?.data.map((e) => ({
      label: e?.label || "Chart Title",
      data: e?.dataArray || [],
      borderColor: e?.borderColor || "rgb(53, 162, 235)",
      backgroundColor: e?.backgroundColor || "rgba(53, 162, 235, 0.5)",
    })),
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props?.title || "Net worth with Compound Interest",
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
