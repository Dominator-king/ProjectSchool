"use client";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip);
type student = {
  name: string;
  gender: string;
  maths: number;
  english: number;
  physics: number;
  chemistry: number;
};

export const BarChartHorizontal = ({
  male,
  female,
}: {
  male: student[];
  female: student[];
}) => {
  const mathAvgM =
    male.map((student) => student.maths).reduce((a, b) => a + b, 0) /
    male.length;
  const chemAvgM =
    male.map((student) => student.chemistry).reduce((a, b) => a + b, 0) /
    male.length;
  const phyAvgM =
    male.map((student) => student.physics).reduce((a, b) => a + b, 0) /
    male.length;
  const engAvgM =
    male.map((student) => student.english).reduce((a, b) => a + b, 0) /
    male.length;

  const mathAvgF =
    female.map((student) => student.maths).reduce((a, b) => a + b, 0) /
    female.length;
  const chemAvgF =
    female.map((student) => student.chemistry).reduce((a, b) => a + b, 0) /
    female.length;
  const phyAvgF =
    female.map((student) => student.physics).reduce((a, b) => a + b, 0) /
    female.length;
  const engAvgF =
    female.map((student) => student.english).reduce((a, b) => a + b, 0) /
    female.length;
  const data: ChartData<"bar"> = {
    labels: ["Maths", "English", "Physics", "Chemistry"],
    datasets: [
      {
        label: "Avg Marks Male",
        data: [mathAvgM, engAvgM, phyAvgM, chemAvgM],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Avg Marks Female",
        data: [mathAvgF, engAvgF, phyAvgF, chemAvgF],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options: ChartOptions<"bar"> = { indexAxis: "y" };
  return (
    <div className="shadow-lg h-80 ">
      <Bar height={300} data={data} options={options}></Bar>
    </div>
  );
};
