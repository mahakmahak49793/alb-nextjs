"use client";

import React from 'react';
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

// Types
interface ServiceItem {
  type: string;
  count: number;
}

interface PieDataItem {
  label: string;
  value: number;
  id?: string | number;
  color?: string;
}

interface ServicesChartProps {
  serviceUsedReportData?: ServiceItem[];
}

interface EarningChartProps {
  earningReportData?: {
    VideoCall?: number;
    chat?: number;
    live_video_call?: number;
    gift?: number;
    call?: number;
    puja?: number;
    'Wallet Rechrge'?: number;
  };
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
      return "#ff4444";
    case "Puja":
      return "#ffdd59";
    case "Wallet Recharge":
      return "#4cd964";
    default:
      return "#888888";
  }
};

export const ServicesChart: React.FC<ServicesChartProps> = ({ serviceUsedReportData }) => {
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
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        No service data available
      </div>
    );
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
        [`& .${pieArcLabelClasses.root}`]: { 
          fill: "white", 
          fontWeight: "bold",
          fontSize: "12px"
        } 
      }}
      width={450}
      height={300}
    />
  );
};

export const EarningChart: React.FC<EarningChartProps> = ({ earningReportData }) => {
  const earningData: PieDataItem[] = React.useMemo(() => [
    { label: "Video Call", value: Number(earningReportData?.VideoCall || 0), id: 1 },
    { label: "Chat", value: Number(earningReportData?.chat || 0), id: 2 },
    { label: "Live Call", value: Number(earningReportData?.live_video_call || 0), id: 3 },
    { label: "Gift", value: Number(earningReportData?.gift || 0), id: 4 },
    { label: "Call", value: Number(earningReportData?.call || 0), id: 5 },
    { label: "Puja", value: Number(earningReportData?.puja || 0), id: 6 },
    { label: "Wallet Recharge", value: Number(earningReportData?.['Wallet Rechrge'] || 0), id: 7 },
  ], [earningReportData]);

  const hasData = earningData.some(item => item.value > 0);

  if (!earningReportData || !hasData) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        No earning data available
      </div>
    );
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
          fontSize: "12px"
        }, 
      }}
      width={450}
      height={300}
    />
  );
};