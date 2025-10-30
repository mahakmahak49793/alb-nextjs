"use client";

import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Color } from "@/assets/colors";

interface RechargeReportData {
  [key: string]: number;
}

interface TransformedDataItem {
  name: number;
  quantity: number;
}

interface TransformedData {
  year: string;
  month: string;
  data: TransformedDataItem[];
}

interface RechargeReportProps {
  rechargeReportData?: RechargeReportData;
}

// ✅ Get days in month (handles leap years)
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// ✅ Transform API data
function transformData(originalData: RechargeReportData): TransformedData | null {
  if (!originalData || Object.keys(originalData).length === 0) return null;

  const firstDate = Object.keys(originalData)[0];
  const year = firstDate.slice(0, 4);
  const month = firstDate.slice(5, 7);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[parseInt(month, 10) - 1];
  const daysInMonth = getDaysInMonth(parseInt(year), parseInt(month, 10) - 1);

  const data: TransformedDataItem[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month.padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    data.push({ name: day, quantity: originalData[dateKey] || 0 });
  }

  return { year, month: monthName, data };
}

const RechargeReport = ({ rechargeReportData }: RechargeReportProps): React.JSX.Element => {
  const [transformed, setTransformed] = useState<TransformedData | null>(null);

  useEffect(() => {
    if (rechargeReportData) {
      const transformedData = transformData(rechargeReportData);
      setTransformed(transformedData);
    }
  }, [rechargeReportData]);

  const data = transformed?.data || [];
  const maxQuantity = data.length > 0 ? Math.max(...data.map((item) => item.quantity)) : 0;
  const minQuantity = data.length > 0 ? Math.min(...data.map((item) => item.quantity)) : 0;

  const colorMap = {
    type: "piecewise" as const,
    thresholds: [minQuantity + 1, maxQuantity],
    colors: ["red", Color?.primary, "green"],
  };

  return (
    <div className="w-full">
      {/* Month Subtitle */}
      <div className="text-center text-md font-medium text-gray-600 mb-3">
        {transformed?.month || "No Data"}
      </div>

      <div className="overflow-x-auto">
        <BarChart
          xAxis={[
            {
              label: "Date Of Month",
              data: data.map((item) => item.name),
              scaleType: "band",
            },
          ]}
          series={[
            {
              label: transformed?.month || "",
              data: data.map((item) => item.quantity),
              color: Color?.primary,
            },
          ]}
          yAxis={[
            {
              colorMap: colorMap,
            },
          ]}
          width={750}
          height={320}
          margin={{ top: 20, bottom: 60, left: 60, right: 20 }}
        />
      </div>
    </div>
  );
};

export { RechargeReport };
