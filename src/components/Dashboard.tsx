import { useEffect } from "react";
import { Transaction } from "../service/getTaskResult";
import {
  getTransactionSummaryByCategory,
  getTransactionSummaryByMonth,
  transformToBarChartData,
  transformToPieChartData,
} from "../service/reports.service";
import { Bar } from "@nivo/bar";
import { PieComponent } from "./Pie";
import { CHART_THEME } from "../utils/nivo.config";

export function Dashboard() {
  const report: Transaction[] = JSON.parse(
    localStorage.getItem("jsonReport") as string
  );

  const summary = getTransactionSummaryByMonth(report, "2022");
  const catSummary = getTransactionSummaryByCategory(report, "2022");
  console.log(transformToPieChartData(catSummary));
  const chartData = transformToBarChartData(summary);

  console.log("BBB", chartData);

  useEffect(() => {}, [report]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3 min-h-screen">
      <div>
        <Bar
          data={chartData}
          theme={CHART_THEME}
          keys={["Paybill", "Merchant Payment", "Send Money", "Charge"]}
          indexBy="month"
          margin={{ top: 50, right: 200, bottom: 50, left: 75 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          groupMode="stacked"
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "dark2" }}
          valueFormat={" >-.2f"}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Amount (Ksh)",
            legendPosition: "middle",
            legendOffset: -55,
            truncateTickAt: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          width={800}
          height={500}
        />
      </div>
      <div>
        <PieComponent data={transformToPieChartData(catSummary)} />
      </div>
      {/* <div>
        <PieComponent data={transformToPieChartData(catSummary)} />
      </div> */}
    </div>
  );
}
