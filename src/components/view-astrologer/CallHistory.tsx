// app/astrologer/view-astrologer/components/call-history.tsx
import React, { useEffect, useState } from "react";
import moment from "moment";
import { IndianRupee, secondsToHMS } from "@/utils/common-function";
import MainDatatable from "@/components/datatable/MainDatatable";
import { TableColumn } from "react-data-table-component";
import { base_url, get_call_history_by_astrologer_id } from "@/lib/api-routes";

interface CallHistoryData {
  _id: string;
  astrologerId: {
    _id: string;
    astrologerName: string;
  };
  customerId: {
    _id: string;
    customerName: string;
  };
  totalPrice: number;
  adminPrice: number;
  partnerPrice: number;
  duration: number;
  startTime: string;
  endTime: string;
  createdAt: string;
}

interface CallHistoryProps {
  astrologerId: string;
}

const CallHistory: React.FC<CallHistoryProps> = ({ astrologerId }) => {
  const [callHistory, setCallHistory] = useState<CallHistoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns: TableColumn<CallHistoryData>[] = [
    { 
      name: 'S.No.', 
      cell: (row, rowIndex) => <div>{(rowIndex || 0) + 1}</div>,
      width: '80px' 
    },
    { 
      name: 'Astrologer', 
      selector: (row: CallHistoryData) => row?.astrologerId?.astrologerName || 'N/A',
      sortable: true 
    },
    { 
      name: 'Customers', 
      selector: (row: CallHistoryData) => row?.customerId?.customerName || 'N/A',
      sortable: true 
    },
    { 
      name: 'Total Price', 
      selector: (row: CallHistoryData) => row?.totalPrice ? IndianRupee(row.totalPrice) : 'N/A' 
    },
    { 
      name: 'Admin Share', 
      selector: (row: CallHistoryData) => row?.adminPrice ? IndianRupee(row.adminPrice) : 'N/A' 
    },
    { 
      name: 'Astrologer Share', 
      selector: (row: CallHistoryData) => row?.partnerPrice ? IndianRupee(row.partnerPrice) : 'N/A' 
    },
    { 
      name: 'Duration', 
      selector: (row: CallHistoryData) => row?.duration ? secondsToHMS(row.duration) : 'N/A' 
    },
    { 
      name: 'Start Time', 
      selector: (row: CallHistoryData) => row?.startTime ? moment(row.startTime).format('hh:mm:ss a') : 'N/A' 
    },
    { 
      name: 'End Time', 
      selector: (row: CallHistoryData) => row?.endTime ? moment(Number(row.endTime)).format('hh:mm:ss a') : 'N/A' 
    },
    { 
      name: 'Date', 
      selector: (row: CallHistoryData) => row?.createdAt ? moment(row.createdAt).format('DD MMMM YYYY') : 'N/A', 
      width: "180px" 
    },
  ];

  useEffect(() => {
    const fetchCallHistory = async () => {
      if (!astrologerId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`${base_url}${get_call_history_by_astrologer_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            astrologerId: astrologerId,
            type: 'call'
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setCallHistory(data.callHistory || data.data || data);
        }
      } catch (error) {
        console.error('Error fetching call history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCallHistory();
  }, [astrologerId]);

  return (
    <MainDatatable 
      data={callHistory} 
      columns={columns} 
      isLoading={isLoading}
    />
  );
};

export default CallHistory;