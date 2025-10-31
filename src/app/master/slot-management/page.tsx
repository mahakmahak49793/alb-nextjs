'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { TableColumn } from 'react-data-table-component';
import MainDatatable from '@/components/datatable/MainDatatable';
import DatatableHeading from '@/components/datatable/DatatableHeading';
// import { SwitchOffSvg, SwitchOnSvg } from '@/assets/svg';
import { base_url } from '@/lib/api-routes';
import { SwitchOnSvg, SwitchOffSvg } from '@/components/svgs/page';

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------
interface SlotDuration {
  _id: string;
  slotDuration: number;
  active: boolean;
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
const SlotManagement: React.FC = () => {
  const router = useRouter();

  const [slotDurations, setSlotDurations] = useState<SlotDuration[]>([]);
  const [filteredData, setFilteredData] = useState<SlotDuration[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const [inputFieldDetail, setInputFieldDetail] = useState({ slot_duration: '' });
  const [inputFieldError, setInputFieldError] = useState({ slot_duration: '' });

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
    const { slot_duration } = inputFieldDetail;

    const duration = Number(slot_duration);
    if (!slot_duration || duration <= 0) {
      handleInputFieldError('slot_duration', 'Please enter a valid slot duration');
      isValid = false;
    }

    return isValid;
  };

  //* Handle Submit - UPDATED: Using create_slots_duration endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!handleValidation()) return;

    const { slot_duration } = inputFieldDetail;

    try {
      const res = await fetch(`${base_url}api/admin/create_slots_duration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotDuration: slot_duration }),
      });

      if (!res.ok) throw new Error('Failed to create slot duration');

      setInputFieldDetail({ slot_duration: '' });
      await fetchSlotDurations(); // Refresh list
    } catch (error) {
      console.error('Error creating slot duration:', error);
    }
  };

  //* Fetch Slot Durations
 const fetchSlotDurations = async () => {
  try {
    setLoading(true);
    const res = await fetch(`${base_url}api/admin/get_slots_duration`);
    if (!res.ok) throw new Error('Failed to fetch slot durations');

    const data = await res.json();
    const slots = data?.slots || [];

    // ✅ Sort in ascending order by slotDuration
    const sortedSlots = slots.sort((a: SlotDuration, b: SlotDuration) => a.slotDuration - b.slotDuration);

    setSlotDurations(sortedSlots);
    setFilteredData(sortedSlots);
  } catch (err) {
    console.error('Error fetching slot durations:', err);
  } finally {
    setLoading(false);
  }
};


  //* Update Slot Status
  const updateSlotStatus = async (slotId: string) => {
    try {
      const res = await fetch(`${base_url}api/admin/update_slots_duration/${slotId}`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error('Failed to update status');
      await fetchSlotDurations();
    } catch (error) {
      console.error('Error updating slot status:', error);
    }
  };

  //* Search filtering
  useEffect(() => {
    setFilteredData(deepSearch(slotDurations, searchText));
  }, [searchText, slotDurations]);

  //* Initial Load
  useEffect(() => {
    fetchSlotDurations();
  }, []);

  //* CSV Data (Transformed for Export)
  const csvData: CSVRow[] = useMemo(() => {
    return filteredData.map((slot, index) => ({
      'S.No.': index + 1,
      'Slot Duration (mins)': slot.slotDuration,
      'Status': slot.active ? 'Active' : 'Inactive',
      'Created At': slot.createdAt
        ? moment(slot.createdAt).format('DD MMM YYYY @ hh:mm a')
        : '-',
    }));
  }, [filteredData]);

  //* Datatable Columns
  const columns: TableColumn<SlotDuration>[] = useMemo(
    () => [
      {
        name: 'S.No.',
        selector: (_row, index) => (index !== undefined ? index + 1 : 0),
        width: '80px',
      },
      {
        name: 'Slot Duration (mins)',
        selector: (row) => row?.slotDuration ?? '-',
      },
      {
        name: 'Status',
        cell: (row) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => updateSlotStatus(row._id)}
          >
            {row?.active ? <SwitchOnSvg /> : <SwitchOffSvg />}
          </div>
        ),
        width: '140px',
        center: true,
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
          Slot Management
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label
                style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
              >
                Slot Duration (in minutes) <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="number"
                name="slot_duration"
                value={inputFieldDetail.slot_duration}
                onChange={handleInputField}
                onFocus={() => handleInputFieldError('slot_duration', '')}
                placeholder="e.g., 30"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: inputFieldError.slot_duration
                    ? '1px solid red'
                    : '1px solid #ccc',
                  fontSize: '15px',
                  outline: 'none',
                  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                }}
              />
              {inputFieldError.slot_duration && (
                <p style={{ color: 'red', fontSize: '13px', margin: '5px 0 0' }}>
                  {inputFieldError.slot_duration}
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
        <DatatableHeading title="Slot Management" data={csvData} />

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

export default SlotManagement;