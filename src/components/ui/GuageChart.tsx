"use client";
import { Chart as ChartJS, ArcElement, Legend, Colors } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Legend);

export const GuageChart = ({
  type,
  marks,
}: {
  type: string;
  marks: number;
}) => {
  function getGradient(chart: ChartJS) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;
    const gradient = ctx.createLinearGradient(left, 0, right, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "orange");
    gradient.addColorStop(1, "green");
    return gradient;
  }
  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart: ChartJS<"doughnut">) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bolder 20px sans-serif";
      ctx.fillStyle = "Black";
      ctx.fillText(
        data.datasets?.[0].data[0] + "%",
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">{`Avg Marks ${type}`}</h1>
      <Doughnut
        data={{
          labels: ["Avg Marks", null],
          datasets: [
            {
              label: "Marks",
              data: [marks, 100 - marks],
              backgroundColor: (context): any => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                  // This case happens on initial chart load
                  return null;
                }
                if (context.dataIndex === 0) return getGradient(chart);
                else return "white";
              },
              borderWidth: 0,
              circumference: 260,
              rotation: 230,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          cutout: "80%",
        }}
        plugins={[textCenter]}
      />
    </div>
  );
};
