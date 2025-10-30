"use client";

import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Color } from '@/assets/colors';

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

// Get days in month (handles leap years)
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Transform API data
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
    const dateKey = `${year}-${month.padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    data.push({ name: day, quantity: originalData[dateKey] || 0 });
  }

  return { year, month: monthName, data };
}

const RechargeReport: React.FC<RechargeReportProps> = ({ rechargeReportData }) => {
  const transformed = rechargeReportData ? transformData(rechargeReportData) : null;
  const data = transformed?.data || [];

  if (!rechargeReportData || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        No recharge data available
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Month Subtitle */}
      <div className="text-center text-md font-medium text-gray-600 mb-3">
        {transformed?.month}
      </div>

      <div className="overflow-x-auto">
        <BarChart
          xAxis={[
            {
              label: 'Date of Month',
              data: data.map(d => d.name),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: data.map(d => d.quantity),
              color: Color?.primary || '#3b82f6',
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