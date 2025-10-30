'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { TableColumn } from 'react-data-table-component';
import MainDatatable from '@/components/datatable/MainDatatable';
import DatatableHeading from '@/components/datatable/DatatableHeading';
import { DeleteSvg } from '@/assets/svg';
import { base_url } from '@/lib/api-routes';

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------
interface PlatformCharge {
  _id: string;
  platformChargeAmount: number;
  createdAt?: string;
}

interface CSVRow {
  [key: string]: string | number | boolean | undefined;
}

// ---------------------------------------------------------------------
// Utility: Deep Search
// ---------------------------------------------------------------------
const deepSearch = <T,>(data: T[], searchText: string): T[] => {
  if (!searchText) return data;
  const lowerSearch = searchText.toLowerCase();
  return data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(lowerSearch)
  );
};

// ---------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------
const PlatformCharges: React.FC = () => {
  const router = useRouter();

  const [platformCharges, setPlatformCharges] = useState<PlatformCharge[]>([]);
  const [filteredData, setFilteredData] = useState<PlatformCharge[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const [inputFieldDetail, setInputFieldDetail] = useState({ platform_charges: '' });
  const [inputFieldError, setInputFieldError] = useState({ platform_charges: '' });

  //* Handle Input Field : Error
  const handleInputFieldError = (input: string, value: string) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value }));
  };

  //* Handle Input Field : Data
  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFieldDetail({ ...inputFieldDetail, [name]: value ? Number(value) : '' });
    handleInputFieldError(name, '');
  };

  //* Handle Validation
  const handleValidation = (): boolean => {
    let isValid = true;
    const { platform_charges } = inputFieldDetail;

    if (!platform_charges || Number(platform_charges) <= 0) {
      handleInputFieldError('platform_charges', 'Please enter a valid platform charge amount');
      isValid = false;
    }

    return isValid;
  };

  //* Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!handleValidation()) return;

    const { platform_charges } = inputFieldDetail;

    try {
      const res = await fetch(`${base_url}api/admin/create-platform-charges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platformChargeAmount: platform_charges }),
      });

      if (!res.ok) throw new Error('Failed to create platform charge');

      setInputFieldDetail({ platform_charges: '' });
      await fetchPlatformCharges(); // Refresh list
    } catch (error) {
      console.error('Error creating platform charge:', error);
    }
  };

  //* Fetch Platform Charges
  const fetchPlatformCharges = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${base_url}api/admin/platform-charges`);
      if (!res.ok) throw new Error('Failed to fetch platform charges');
      const data = await res.json();
      setPlatformCharges(data || []);
      setFilteredData(data|| []);
    } catch (err) {
      console.error('Error fetching platform charges:', err);
    } finally {
      setLoading(false);
    }
  };

  //* Delete Platform Charge
  const handleDelete = async (chargeId: string) => {
    if (!confirm('Are you sure you want to delete this platform charge?')) return;

    try {
      const res = await fetch(`${base_url}api/admin/del-platform-charges/${chargeId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete platform charge');

      await fetchPlatformCharges();
    } catch (error) {
      console.error('Error deleting platform charge:', error);
    }
  };

  //* Search filtering
  useEffect(() => {
    setFilteredData(deepSearch(platformCharges, searchText));
  }, [searchText, platformCharges]);

  //* Initial Load
  useEffect(() => {
    fetchPlatformCharges();
  }, []);

  //* CSV Data (Transformed for Export)
  const csvData: CSVRow[] = useMemo(() => {
    return filteredData.map((charge, index) => ({
      'S.No.': index + 1,
      'Platform Charge Amount': charge.platformChargeAmount,
      'Created At': charge.createdAt
        ? moment(charge.createdAt).format('DD MMM YYYY @ hh:mm a')
        : '-',
    }));
  }, [filteredData]);

  //* Datatable Columns
  const columns: TableColumn<PlatformCharge>[] = useMemo(
    () => [
      {
        name: 'S.No.',
        selector: (_row, index) => (index !== undefined ? index + 1 : 0),
        width: '80px',
      },
      {
        name: 'Platform Charge Amount',
        selector: (row) => row?.platformChargeAmount ?? '-',
      },
      {
        name: 'Action',
        cell: (row) => (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div
              onClick={() => handleDelete(row._id)}
              style={{ cursor: 'pointer' }}
            >
              <DeleteSvg />
            </div>
          </div>
        ),
        width: '120px',
      },
      {
        name: 'Created At',
        selector: (row) =>
          row?.createdAt ? moment(row.createdAt).format('DD MMM YYYY @ hh:mm a') : '-',
        sortable: true,
      },
    ],
    []
  );

  //* Render
  return (
    <>
      {/* Form Section */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          marginBottom: '20px',
          boxShadow: '0px 0px 5px lightgrey',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            fontSize: '22px',
            fontWeight: '500',
            color: '#000',
            marginBottom: '30px',
          }}
        >
          Platform Charges
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label
                style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
              >
                Platform Charges (Amount) <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="number"
                name="platform_charges"
                value={inputFieldDetail.platform_charges}
                onChange={handleInputField}
                onFocus={() => handleInputFieldError('platform_charges', '')}
                placeholder="e.g., 100"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: inputFieldError.platform_charges
                    ? '1px solid red'
                    : '1px solid #ccc',
                  fontSize: '15px',
                  outline: 'none',
                  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                }}
              />
              {inputFieldError.platform_charges && (
                <p style={{ color: 'red', fontSize: '13px', margin: '5px 0 0' }}>
                  {inputFieldError.platform_charges}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                style={{
                  fontWeight: '500',
                  backgroundColor: '#e63946',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  border: 'none',
                  outline: 'none',
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          marginBottom: '20px',
          boxShadow: '0px 0px 5px lightgrey',
          borderRadius: '10px',
        }}
      >
        <DatatableHeading title="Platform Charges" data={csvData} />

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

        <MainDatatable
          columns={columns}
          data={filteredData}
          isLoading={loading}
        />
      </div>
    </>
  );
};

export default PlatformCharges;