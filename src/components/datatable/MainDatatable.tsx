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
// Custom Styles with proper typing
// ---------------------------------------------------------------------
const typedCustomStyles: TableStyles = {
  ...DataTableCustomStyles,
  // Ensure all nested styles match expected types
  headRow: {
    style: {
      ...DataTableCustomStyles.headRow?.style,
      whiteSpace: 'nowrap',
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
      backgroundColor: '#f8f9fa',
    },
  },
  rows: {
    style: {
      ...DataTableCustomStyles.rows?.style,
      minHeight: '50px',
      backgroundColor: '#fff',
    },
  },
  cells: {
    style: {
      ...DataTableCustomStyles.cells?.style,
      textAlign: 'left' as const,
      color: '#555',
      whiteSpace: 'nowrap',
      width: 'auto',
      fontSize: '13px',
    },
  },
};

// ---------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------
const MainDatatable = <T extends object>({ data, columns, isLoading }: MainDatatableProps<T>) => {
  if (isLoading) {
    return (
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
          src={LogoIcon.src} // Next.js static image → .src
          style={{ height: '100px' }}
          alt="Loading..."
        />
      </div>
    );
  }

  return (
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
  );
};

export default MainDatatable;