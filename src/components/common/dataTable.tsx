'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Download, Plus } from 'lucide-react';

// Types
interface DatatableHeadingProps {
  title: string;
  url?: string;
  data?: any[];
}

const DatatableHeading: React.FC<DatatableHeadingProps> = ({ 
  title, 
  url, 
  data = [] 
}) => {
  const router = useRouter();

  // Function to convert data to CSV and download
  const downloadCSV = () => {
    if (data.length === 0) return;

    // Get headers from first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    const csvContent = [
      headers.join(','), // Header row
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle nested objects, arrays, and special characters
          if (value === null || value === undefined) return '';
          if (typeof value === 'object') return JSON.stringify(value).replace(/,/g, ';');
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${title}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-between items-center mb-5 bg-white">
      <h1 className="text-[22px] font-medium text-gray-900">{title}</h1>

      <div className="flex gap-10 items-center">
        {/* CSV Download Button */}
        {data.length > 0 && (
          <button
            onClick={downloadCSV}
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2.5 cursor-pointer"
            title="Download CSV"
          >
            <Download size={20} />
          </button>
        )}

        {/* Add Button */}
        {url && (
          <button
            onClick={() => router.push(url)}
            className="font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span className="text-[15px]">Add</span>
            <Plus size={18} strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DatatableHeading;