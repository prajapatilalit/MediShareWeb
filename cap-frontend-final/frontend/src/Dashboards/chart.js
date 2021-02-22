import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const Chart = (data) => {
  console.log(data);
  const labels = ["Heart_rate", "Blood_pressure", "Cholestrol", "Blood_sugar"];
  const dataVal = data.data;
  const Chartdata = {
    labels: labels,
    datasets: [
      {
        label: "Patient health chart",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
        data: dataVal,
      },
    ],
  };

  return (
    <div>
      <div
        style={{
          width: "90%",
          height: "400px",
          display: "inline-flex",
          backgroundColor: "antiquewhite",
        }}
      >
        <Bar
          data={Chartdata}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Patient health chart",
              fontSize: 25,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontSize: 15,
                    fontColor: "#000",

                    stepSize: 5,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    fontSize: 15,
                    fontcolor: "#000",
                  },
                },
              ],
            },
          }}
        ></Bar>
      </div>
    </div>
  );
};

export default Chart;
