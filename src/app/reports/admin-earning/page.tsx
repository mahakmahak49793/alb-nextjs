'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { TableColumn } from 'react-data-table-component';
import MainDatatable from '@/components/common/MainDatatable';

// Types
interface CustomerDetails {
  _id: string;
  customerName: string;
  email: string;
}

interface AstrologerDetails {
  _id: string;
  astrologerName: string;
  email?: string;
}

interface AdminEarningRow {
  _id: string;
  type: string;
  astrologerId: string | null | AstrologerDetails;
  customerId: CustomerDetails | null;
  transactionId: string;
  totalPrice: string;
  adminPrice: string;
  partnerPrice: string;
  historyId: string;
  duration: number;
  chargePerMinutePrice: number;
  startTime: string;
  endTime: string;
  transactionType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  history: AdminEarningRow[];
}

// Utility functions
const IndianRupee = (amount: string | number): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount);
};

const secondsToHMS = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = secs.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

// API function to fetch admin earnings
const getAdminEarnings = async (): Promise<AdminEarningRow[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_admin_earnig_history`);
    if (!response.ok) {
      throw new Error('Failed to fetch admin earnings');
    }
    const data: ApiResponse = await response.json();
    return data.history || [];
  } catch (error) {
    console.error('Error fetching admin earnings:', error);
    return [];
  }
};

const AdminEarning: React.FC = () => {
  const [adminEarningData, setAdminEarningData] = useState<AdminEarningRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // DataTable Columns
  const columns: TableColumn<AdminEarningRow>[] = [
    {
      name: 'S.No.',
      selector: (row) => adminEarningData.indexOf(row) + 1,
      width: '80px',
    },
    {
      name: 'Type',
      selector: (row) => row?.type,
      cell: (row) => (
        <div style={{ textTransform: 'capitalize' }}>
          {row?.type === 'live_video_call' ? 'Live Call' : row?.type}
        </div>
      ),
    },
    {
      name: 'Astrologers',
      selector: (row) => {
        if (!row?.astrologerId) return 'N/A';
        if (typeof row.astrologerId === 'object' && row.astrologerId !== null) {
          return (row.astrologerId as AstrologerDetails).astrologerName || '';
        }
        return 'N/A';
      },
    },
    {
      name: 'Customers',
      selector: (row) => row?.customerId?.customerName || row?.customerId?.email || 'N/A',
    },
    {
      name: 'Total Price',
      selector: (row) => row?.totalPrice,
      cell: (row) => IndianRupee(row?.totalPrice),
    },
    {
      name: 'Admin Share',
      selector: (row) => row?.adminPrice,
      cell: (row) => IndianRupee(row?.adminPrice),
    },
    {
      name: 'Astro Share',
      selector: (row) => row?.partnerPrice,
      cell: (row) => IndianRupee(row?.partnerPrice),
    },
    {
      name: 'Duration',
      selector: (row) => row?.duration || 0,
      cell: (row) => (row?.duration ? `${row.duration} min` : 'N/A'),
    },
    {
      name: 'Charge/Min',
      selector: (row) => row?.chargePerMinutePrice || 0,
      cell: (row) => row?.chargePerMinutePrice ? IndianRupee(row.chargePerMinutePrice) : 'N/A',
    },
    {
      name: 'Start Time',
      selector: (row) => row?.startTime || '',
      cell: (row) => row?.startTime || 'N/A',
    },
    {
      name: 'End Time',
      selector: (row) => row?.endTime || '',
      cell: (row) => row?.endTime || 'N/A',
    },
    {
      name: 'Date',
      selector: (row) => row?.createdAt || '',
      cell: (row) =>
        row?.createdAt ? moment(row?.createdAt).format('DD-MM-YYYY') : 'N/A',
    },
    // {
    //   name: 'Transaction Type',
    //   selector: (row) => row?.transactionType || '',
    //   cell: (row) => (
    //     <div style={{ 
    //       color: row?.transactionType === 'CREDIT' ? '#10b981' : '#ef4444',
    //       fontWeight: '500'
    //     }}>
    //       {row?.transactionType || 'N/A'}
    //     </div>
    //   ),
    // },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getAdminEarnings();
      setAdminEarningData(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <MainDatatable
        data={adminEarningData}
        columns={columns}
        title="Admin Earning"
        isLoading={isLoading}
      />
    </>
  );
};

export default AdminEarning;