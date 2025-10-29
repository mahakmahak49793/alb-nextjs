'use client';

import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';
import Swal from 'sweetalert2';

// Types
interface MainDatatableProps {
  data?: any[];
  columns: TableColumn<any>[];
  url?: string;
  title?: string;
  addButtonActive?: boolean;
  buttonMessage?: string;
  isLoading?: boolean;
}

interface Color {
  black: string;
  primary: string;
  white: string;
}

// Color constants
const Color: Color = {
  black: '#000000',
  primary: '#007bff',
  white: '#ffffff',
};

// Custom styles for DataTable
const DataTableCustomStyles = {
  headCells: {
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      backgroundColor: '#f8f9fa',
    },
  },
  rows: {
    style: {
      fontSize: '14px',
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
    },
  },
};

// Deep search function
const DeepSearchSpace = (data: any[], searchText: string): any[] => {
  if (!searchText) return data;
  
  const lowerSearchText = searchText.toLowerCase();
  
  return data.filter((item) => {
    const searchInObject = (obj: any): boolean => {
      if (obj === null || obj === undefined) return false;
      
      if (typeof obj === 'string' || typeof obj === 'number') {
        return String(obj).toLowerCase().includes(lowerSearchText);
      }
      
      if (Array.isArray(obj)) {
        return obj.some(searchInObject);
      }
      
      if (typeof obj === 'object') {
        return Object.values(obj).some(searchInObject);
      }
      
      return false;
    };
    
    return searchInObject(item);
  });
};

// Download SVG Component
const DownloadSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15L7 10H17L12 15Z" fill="#667284" />
  </svg>
);

const MainDatatable: React.FC<MainDatatableProps> = ({
  data = [],
  columns,
  url,
  title = 'Title',
  addButtonActive = true,
  buttonMessage = '',
  isLoading = false,
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = DeepSearchSpace(data, searchText);

  const onClickAdd = () => {
    if (addButtonActive) {
      if (url) {
        router.push(url);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: "Sorry can't add more",
        text: 'Maximum 10 banners are allowed.',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

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
      {isLoading ? (
        <div
          style={{
            color: 'black',
            textAlign: 'center',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          <Image
            src="/logo-small.png"
            alt="Loading"
            width={100}
            height={100}
            style={{ animation: 'rotation 2s infinite linear' }}
          />
        </div>
      ) : (
        data && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                backgroundColor: '#fff',
              }}
            >
              <div style={{ fontSize: '22px', fontWeight: '500', color: Color.black }}>
                {title}
              </div>

              <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                {/* <CSVLink
                  filename={`${title}`}
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
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#667284' }}>
                    <DownloadIcon />
                  </div>
                  <DownloadSvg />
                </CSVLink> */}

                {url && (
                  <div
                    onClick={onClickAdd}
                    style={{
                      fontWeight: '500',
                      backgroundColor: Color.primary,
                      color: Color.white,
                      padding: '2px 5px',
                      borderRadius: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '15px' }}>Add</div>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>+</div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <input
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
                type="search"
                value={searchText}
                onChange={handleSearch}
                placeholder="Search"
              />
            </div>

            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              customStyles={DataTableCustomStyles}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50, 100, 200]}
              paginationComponentOptions={{ rowsPerPageText: 'Rows Per Page :' }}
              fixedHeader
            />
          </>
        )
      )}
    </div>
  );
};

export default MainDatatable;