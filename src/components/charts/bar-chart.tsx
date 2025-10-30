"use client";

import React from 'react';
import { useAppSelector } from '@/store/hooks';
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

// Function to get the number of days in a month, accounting for leap years in February
function getDaysInMonth(year: number, month: number): number {
  // Month is 0-based for the Date object (0 = January, 1 = February, etc.)
  return new Date(year, month + 1, 0).getDate();
}

// Function to transform the original data into the required format
function transformData(originalData: RechargeReportData): TransformedData | null {
  if (!originalData || Object.keys(originalData).length === 0) {
    return null;
  }

  // Extract year and month from the first date in the original data
  const firstDate = Object.keys(originalData)[0];
  const year = firstDate?.slice(0, 4); // First 4 characters for the year
  const month = firstDate?.slice(5, 7); // Characters at index 5 and 6 for the month

  // Convert the month number to a month name
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[parseInt(month, 10) - 1];

  // Get the number of days in the month
  const daysInMonth = getDaysInMonth(parseInt(year), parseInt(month, 10) - 1);

  // Prepare the final transformed data
  const transformedData: TransformedData = {
    year: year,
    month: monthName,
    data: []
  };

  // Loop through all the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    // Format the date key (e.g., '2025-01-01')
    const dateKey = `${year}-${month.padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    // Get the quantity for this date, defaulting to 0 if not found
    const quantity = originalData[dateKey] || 0;

    // Push the day and quantity into the data array
    transformedData.data.push({ name: day, quantity: quantity });
  }

  return transformedData;
}

const RechargeReport = (): React.JSX.Element => {
  const { rechargeReportData } = useAppSelector((state: any) => state?.dashboardReducer);

  const rechargeReportDataa = rechargeReportData && transformData(rechargeReportData);
  const data = rechargeReportDataa?.data || [];

  const maxQuantity = data.length > 0 ? Math.max(...data.map((item: { quantity: any; }) => item?.quantity)) : 0;
  const minQuantity = data.length > 0 ? Math.min(...data.map((item: { quantity: any; }) => item?.quantity)) : 0;

  const colorMap = { 
    type: 'piecewise' as const, 
    thresholds: [minQuantity + 1, maxQuantity], 
    colors: ['red', Color?.primary, 'green'] 
  };  //! Set thresholds and colors for lowest, middle, and highest data values

  return (
    <>
      <div style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: '16px',height:400}}>
        Recharge report for {rechargeReportDataa?.year}
      </div>

      {rechargeReportData && rechargeReportDataa && (
        <BarChart
          xAxis={[
            {
              label: 'Date Of Month',
              data: rechargeReportDataa?.data?.map((item: { name: any; }) => item?.name),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              label: rechargeReportDataa?.month,
              data: rechargeReportDataa?.data?.map((item: { quantity: any; }) => item?.quantity),
              color: Color?.primary
            },
          ]}
          yAxis={[
            {
              colorMap: colorMap,
            },
          ]}
          width={800}
          height={370}
          sx={{ margin: 'auto', marginTop: 4 }}
        />
      )}
    </>
  );
};

export { RechargeReport };