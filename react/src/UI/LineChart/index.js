import React from "react";

import { Line } from "react-chartjs-2";

const LineChart = ({ label, data, borderColor, backgroundColor, labels }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    tooltips: {
      displayColors: false,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: true,
        },
      ],
      yAxes: [
        {
          display: true,
        },
      ],
    },
  };

  return (
    <>
        <h1>Graph</h1>
      <Line
        width={100}
        height={30}
        data={{
          ...{
            datasets: [
              {
                label,
                data,
                backgroundColor: [backgroundColor],
                borderColor: [borderColor],
              },
            ],
          },
          labels,
        }}
        options={options}
      />
    </>
  );
};
export default LineChart;
