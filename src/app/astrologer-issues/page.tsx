'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';
import { DeepSearchSpace } from '@/utils/common-function';
import MainDatatable from '@/components/datatable/MainDatatable';
import { Color } from '@/assets/colors';
import { base_url } from '@/lib/api-routes';

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------
interface AstrologerIssue {
  _id: string;
  astrologerId: {
    astrologerName: string;
  };
  description: string;
  createdAt: string;
}

// ---------------------------------------------------------------------
// Datatable Heading Component
// ---------------------------------------------------------------------
interface DatatableHeadingProps {
  title: string;
  data: AstrologerIssue[];
}

const DatatableHeading: React.FC<DatatableHeadingProps> = ({ title, data = [] }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        backgroundColor: '#fff',
      }}
    >
      <div style={{ fontSize: '22px', fontWeight: 500, color: Color.black }}>
        {title}
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {data.length > 0 && (
          <CSVLink
            filename={`${title}.csv`}
            data={data}
            style={{
              color: '#000',
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 500, color: '#667284' }}>
              <DownloadIcon />
            </div>
          </CSVLink>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// Main Client Component
// ---------------------------------------------------------------------
const AstrologerIssues = () => {
  const [issues, setIssues] = useState<AstrologerIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const filteredData = DeepSearchSpace(issues, searchText);

  // -----------------------------------------------------------------
  // Fetch Astrologer Issues from API
  // -----------------------------------------------------------------
  const fetchAstrologerIssues = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${base_url}api/admin/get_all_astrologers_issue`); // ✅ Replace with your actual API route
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setIssues(data);
      } else if (Array.isArray(data?.issues)) {
        setIssues(data.issues);
      } else {
        console.warn('Unexpected response format:', data);
        setIssues([]);
      }
    } catch (err) {
      console.error('Error fetching issues:', err);
      setIssues([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAstrologerIssues();
  }, []);

  // -----------------------------------------------------------------
  // Table Columns
  // -----------------------------------------------------------------
  const columns = [
    {
      name: 'S.No.',
      selector: (row: AstrologerIssue, index?: number) => (index ?? 0) + 1,
      width: '80px',
    },
    {
      name: 'Astrologer',
      selector: (row: AstrologerIssue) =>
        row?.astrologerId?.astrologerName?.toUpperCase() || 'N/A',
      width: '200px',
    },
    {
      name: 'Description',
      selector: (row: AstrologerIssue) => row?.description || 'N/A',
      wrap: true,
    },
    {
      name: 'Created Date',
      selector: (row: AstrologerIssue) =>
        moment(row.createdAt).format('DD-MMM-YYYY @ hh:mm a'),
      width: '180px',
    },
  ];

  // -----------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#fff',
        marginBottom: '20px',
        boxShadow: '0px 0px 5px lightgrey',
        borderRadius: '10px',
      }}
    >
      {/* Heading */}
      <DatatableHeading title="Astrologer Issues" data={issues} />

      {/* Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '20px',
          alignItems: 'center',
          marginBottom: '20px',
          backgroundColor: '#fff',
        }}
      >
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search your data..."
          style={{
            padding: '5px 10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '250px',
            fontSize: '15px',
            outline: 'none',
          }}
        />
      </div>

      {/* Datatable */}
      <MainDatatable columns={columns} data={filteredData} isLoading={isLoading} />
    </div>
  );
};

export default AstrologerIssues;
