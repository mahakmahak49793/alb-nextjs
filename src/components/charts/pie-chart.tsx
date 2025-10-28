"use client";

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

interface ServiceItem {
  type: string;
  count: number;
}

// Use MUI's PieValueType instead of custom interface for better compatibility
interface PieDataItem {
  label: string;
  value: number;
  id?: string | number;
  color?: string;
}

const getColor = (label: string): string => {
  switch (label) {
    case "Video Call":
      return "#ff6384";
    case "Chat":
      return "#36a2eb";
    case "Live Call":
      return "#cc65fe";
    case "Gift":
      return "#ffce56";
    case "Call":
      return "red";
    case "Puja":
      return "yellow";
    case "Wallet Recharge":
      return "green";
    default:
      return "#000000";
  }
};

export const ServicesChart = (): React.JSX.Element => {
  const { serviceUsedReportData } = useAppSelector((state: any) => state?.dashboardReducer);

  const servicesData: PieDataItem[] = React.useMemo(() => {
    if (!serviceUsedReportData || !Array.isArray(serviceUsedReportData)) {
      return [];
    }
    
    return serviceUsedReportData.map((item: ServiceItem, index: number) => {
      switch (item?.type) {
        case "gift": return { label: "Gift", value: item?.count || 0, id: index };
        case "call": return { label: "Call", value: item?.count || 0, id: index };
        case "chat": return { label: "Chat", value: item?.count || 0, id: index };
        case "live_video_call": return { label: "Live Call", value: item?.count || 0, id: index };
        case "VideoCall": return { label: "Video Call", value: item?.count || 0, id: index };
        case "puja": return { label: "Puja", value: item?.count || 0, id: index };
        case "Wallet Recharge": return { label: "Wallet Recharge", value: item?.count || 0, id: index };
        default: return { label: "Unknown", value: 0, id: index };
      }
    });
  }, [serviceUsedReportData]);

  if (!serviceUsedReportData || servicesData.length === 0) {
    return <div className="flex items-center justify-center h-80">No data available</div>;
  }

  return (
    <PieChart
      series={[{
        arcLabel: (item) => `${item.label} (${item.value})`,
        arcLabelMinAngle: 45,
        data: servicesData.map((item, index) => ({ 
          ...item, 
          color: getColor(item.label),
          id: item.id || index
        })),
      }]}
      sx={{ 
        [`& .${pieArcLabelClasses.root}`]: { fill: "white", fontWeight: "bold" } 
      }}
      width={450}
      height={300}
    />
  );
};

export const EarningChart = (): React.JSX.Element => {
  const { earningReportData } = useAppSelector((state: any) => state?.dashboardReducer);

  const earningData: PieDataItem[] = [
    { label: "Video Call", value: Number(earningReportData?.VideoCall || 0), id: 1 },
    { label: "Chat", value: Number(earningReportData?.chat || 0), id: 2 },
    { label: "Live Call", value: Number(earningReportData?.live_video_call || 0), id: 3 },
    { label: "Gift", value: Number(earningReportData?.gift || 0), id: 4 },
    { label: "Call", value: Number(earningReportData?.call || 0), id: 5 },
    { label: "Puja", value: Number(earningReportData?.puja || 0), id: 6 },
    { label: "Wallet Recharge", value: Number(earningReportData?.['Wallet Rechrge'] || 0), id: 7 },
  ];

  if (!earningReportData) {
    return <div className="flex items-center justify-center h-80">No data available</div>;
  }

  return (
    <PieChart
      series={[{
        arcLabel: (item) => `${item.label} (${item.value})`,
        arcLabelMinAngle: 45,
        data: earningData.map((item) => ({ 
          ...item, 
          color: getColor(item.label),
        })),
      }]}
      sx={{ 
        [`& .${pieArcLabelClasses.root}`]: { 
          fill: "white", 
          fontWeight: "bold", 
        }, 
      }}
      width={450}
      height={300}
    />
  );
};