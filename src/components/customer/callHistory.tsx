'use client';

import moment from "moment";
import React, { useEffect, useState } from "react";
import MainDatatable from "../common/MainDatatable";
import { IndianRupee, secondsToHMS } from "@/utils/common-function";

// Types
interface Astrologer {
  _id: string;
  astrologerName: string;
}

interface Customer {
  _id: string;
  customerName: string;
}

interface CallHistoryItem {
  _id: string;
  astrologerId: Astrologer;
  customerId: Customer;
  totalPrice: number;
  adminPrice: number;
  partnerPrice: number;
  duration: number;
  startTime: number;
  endTime: number;
  createdAt: string;
}

interface CallHistoryProps {
  customerId: string;
}

// Temporary Invoice Component
const TempInvoiceOne = ({ data, type }: { data: CallHistoryItem; type: string }) => {
  const handleDownload = () => {
    console.log('Download invoice for:', data._id, 'Type:', type);
    // Add your invoice download logic here
    alert(`Download ${type} invoice for ${data._id}`);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
    >
      Download
    </button>
  );
};

const CallHistory: React.FC<CallHistoryProps> = ({ customerId }) => {
  const [callHistoryData, setCallHistoryData] = useState<CallHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API Function to fetch call history
  const fetchCallHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/customer_chat_history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          customerId, 
          type: 'call' 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch call history');
      }

      const data = await response.json();
      
      if (data.success) {
        setCallHistoryData(data.callHistory || data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch call history');
      }
    } catch (error) {
      console.error('Error fetching call history:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Data-Table Column
  const columns = [
    { 
      name: 'S.No.', 
      selector: (row: CallHistoryItem) => callHistoryData.indexOf(row) + 1, 
      width: '80px' 
    },
    { 
      name: 'Astrologer', 
      selector: (row: CallHistoryItem) => row?.astrologerId?.astrologerName ? row?.astrologerId?.astrologerName : 'N/A' 
    },
    { 
      name: 'Customers', 
      selector: (row: CallHistoryItem) => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A' 
    },
    { 
      name: 'Total Price', 
      selector: (row: CallHistoryItem) => row?.totalPrice && IndianRupee(row?.totalPrice) 
    },
    { 
      name: 'Admin Share', 
      selector: (row: CallHistoryItem) => row?.adminPrice && IndianRupee(row?.adminPrice) 
    },
    { 
      name: 'Astrologer Share', 
      selector: (row: CallHistoryItem) => row?.partnerPrice && IndianRupee(row?.partnerPrice) 
    },
    { 
      name: 'Duration', 
      selector: (row: CallHistoryItem) => row?.duration ? secondsToHMS(row?.duration) : 'N/A' 
    },
    { 
      name: 'Start Time', 
      selector: (row: CallHistoryItem) => row?.startTime ? moment(row?.startTime).format('hh:mm:ss a') : 'N/A' 
    },
    { 
      name: 'End Time', 
      selector: (row: CallHistoryItem) => row?.endTime ? moment(Number(row?.endTime)).format('hh:mm:ss a') : 'N/A' 
    },
    { 
      name: 'Date', 
      selector: (row: CallHistoryItem) => row?.endTime ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', 
      width: "180px" 
    },
    { 
      name: 'Invoice', 
      cell: (row: CallHistoryItem) => <TempInvoiceOne data={row} type={'Call'} />, 
      centre: true 
    }
  ];

  useEffect(() => {
    if (customerId) {
      fetchCallHistory();
    }
  }, [customerId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading call history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button 
            onClick={fetchCallHistory}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <MainDatatable
        data={callHistoryData} 
        columns={columns} 
        title={'Call History'}
        isLoading={loading}
      />
    </div>
  );
};

export default CallHistory;