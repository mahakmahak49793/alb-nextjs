'use client';

import React from 'react';
import DataTable, { TableColumn, TableStyles } from 'react-data-table-component';
import LogoIcon from '@/assets/images/logo-small.png';
import { DataTableCustomStyles } from '@/assets/styles/datatable';

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------
interface MainDatatableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading: boolean;
}

// ---------------------------------------------------------------------
// Custom Styles (Type-safe + Red Header + Same Layout)
// ---------------------------------------------------------------------
const typedCustomStyles: TableStyles = {
  ...DataTableCustomStyles,
  headRow: {
    style: {
      ...DataTableCustomStyles.headRow?.style,
      backgroundColor: '#e63946', // 🔴 red background for header
      color: '#fff', // white text
      whiteSpace: 'nowrap',
      fontSize: '14px',
      fontWeight: '600',
      borderBottom: '2px solid #b71c1c', // darker red border
      textTransform: 'uppercase',
    },
  },
  headCells: {
    style: {
      color: '#fff', // white text for each header cell
      fontSize: '12px',
      fontWeight: '700',
      textAlign: 'left' as const,
      padding: '12px 16px',
    },
  },
  rows: {
    style: {
      ...DataTableCustomStyles.rows?.style,
      minHeight: '50px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #f1f1f1',
      '&:hover': {
        backgroundColor: '#f9f9f9',
      },
    },
  },
  cells: {
    style: {
      ...DataTableCustomStyles.cells?.style,
      textAlign: 'left' as const, // ✅ fixed type error
      color: '#555',
      whiteSpace: 'nowrap',
      width: 'auto',
      fontSize: '13px',
    },
  },
  pagination: {
    style: {
      borderTop: '1px solid #dee2e6',
      backgroundColor: '#fff',
      color: '#333',
      fontSize: '13px',
      minHeight: '50px',
    },
  },
};

// ---------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------
const MainDatatable = <T extends object>({ data, columns, isLoading }: MainDatatableProps<T>) => {
  return (
    <>
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
            animation: 'rotation 2s infinite linear',
          }}
        >
          <img
            src={LogoIcon.src} // ✅ Next.js static image compatible
            style={{ height: '100px' }}
            alt="Loading..."
          />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination
          customStyles={typedCustomStyles}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100, 200]}
          paginationComponentOptions={{ rowsPerPageText: 'Rows Per Page :' }}
          fixedHeader
        />
      )}
    </>
  );
};

export default MainDatatable;
