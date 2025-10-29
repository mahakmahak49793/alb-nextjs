// app/customer/page.tsx
'use client';

import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Edit, Wallet } from "lucide-react";

import {
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Color } from '@/assets/colors/index';
import { DeepSearchSpace, IndianRupee } from '@/utils/common-function/index';
import DatatableHeading from '@/components/common/dataTable';
import MainDatatable from '@/components/common/MainDatatable';


// Define types for better TypeScript support
interface Customer {
  _id: string;
  customerName: string;
  phoneNumber: string;
  wallet_balance: number;
  dateOfBirth: string;
  timeOfBirth: string;
  banned_status: boolean;
  email?: string;
}

interface ApiResponse {
  success: boolean;
  customers: Customer[];
}

export default function Customer() {
  const router = useRouter();

  // State
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  
  const filteredData = DeepSearchSpace(customerData, searchText);

  const [walletModal, setWalletModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [inputFieldDetail, setInputFieldDetail] = useState({ amount: '', type: '' });
  const [inputFieldError, setInputFieldError] = useState({ amount: '', type: '' });

  // Fetch data on mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/get-all-customers`);
        const data: ApiResponse = await res.json();
        
        if (data.success && Array.isArray(data.customers)) {
          setCustomerData(data.customers);
        } else {
          console.error('Invalid API response structure');
          setCustomerData([]);
        }
      } catch (error) {
        console.error('Failed to fetch customers:', error);
        setCustomerData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Modal handlers
  const handleWalletModalOpen = (id: string) => {
    console.log("Cus Id ::: ", id);
    setUserId(id);
    setWalletModal(true);
  };

  const handleWalletModalClose = () => {
    setWalletModal(false);
    setInputFieldDetail({ amount: '', type: '' });
    setInputFieldError({ amount: '', type: '' });
  };

  // Handle Input Field : Error
  const handleInputFieldError = (input: string, value: string) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value }));
  };

  // Handle Input Field : Data
  const handleInputField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputFieldDetail({ ...inputFieldDetail, [name]: value });
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setInputFieldDetail({ ...inputFieldDetail, [name]: value });
  };

  // Handle Validation
  const handleValidation = () => {
    let isValid = true;

    const { amount, type } = inputFieldDetail;
    if (!amount) {
      handleInputFieldError("amount", "Please Enter Amount");
      isValid = false;
    }
    if (Number(amount) < 0) {
      handleInputFieldError("amount", "Please Enter Amount Greater Than Zero");
      isValid = false;
    }
    if (!type) {
      handleInputFieldError("type", "Please Select Type");
      isValid = false;
    }
    return isValid;
  };

  // Handle Submit : Wallet
  const handleSubmit = () => {
    if (handleValidation()) {
      console.log({ ...inputFieldDetail, userId });

      const payload = {
        customerId: userId,
        amount: Number(inputFieldDetail.amount),
        type: inputFieldDetail.type,
      };

      // API call
      fetch('/api/wallet/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      .then(res => {
        if (res.ok) {
          alert('Wallet updated successfully!');
          handleWalletModalClose();
          // Refetch data
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/get-all-customers`)
            .then(res => res.json())
            .then(data => {
              if (data.success && Array.isArray(data.customers)) {
                setCustomerData(data.customers);
              }
            });
        } else {
          alert('Failed to update wallet');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred');
      });
    }
  };

  // Status toggle handler
  const handleStatusToggle = (customerId: string, customerName: string, status: boolean) => {
    fetch('/api/admin/change-banned-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId }),
    })
    .then(res => {
      if (res.ok) {
        setCustomerData(prev => 
          prev.map(customer => 
            customer._id === customerId 
              ? { ...customer, banned_status: !status }
              : customer
          )
        );
      } else {
        alert('Failed to update status');
      }
    })
    .catch(error => {
      console.error('Error toggling status:', error);
      alert('An error occurred');
    });
  };

  // Table Columns matching React data structure
  const columns = [
    { 
      name: "S.No.", 
      selector: (row: Customer) => customerData.indexOf(row) + 1, 
      width: "80px" 
    },
    { 
      name: "Customer Name", 
      selector: (row: Customer) => row?.customerName ? row.customerName : 'N/A' 
    },
    { 
      name: "Contact", 
      selector: (row: Customer) => row?.phoneNumber 
    },
    { 
      name: "Wallet", 
      selector: (row: Customer) => IndianRupee(row?.wallet_balance) || 'N/A', 
      width: '150px' 
    },
    { 
      name: "D.O.B", 
      selector: (row: Customer) => row?.dateOfBirth ? moment(row.dateOfBirth).format('DD MMM YYYY') : 'N/A' 
    },
    { 
      name: "T.O.B", 
      selector: (row: Customer) => {
        const val = row?.timeOfBirth;
        if (!val) return 'N/A';
        try {
          const formatted = moment(val, ['HH:mm', 'hh:mm:ss']).format('hh:mm A');
          return formatted !== 'Invalid date' ? formatted : 'N/A';
        } catch {
          return 'N/A';
        }
      }
    },
    { 
      name: 'Status', 
      selector: (row: Customer) => (
        <div 
          className="cursor-pointer text-center"
          onClick={() => handleStatusToggle(row._id, row.customerName, row.banned_status)}
        >
          {/* Toggle switch - you can replace with SVG components */}
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            row.banned_status 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            <span className={`w-2 h-2 rounded-full mr-2 ${row.banned_status ? 'bg-red-500' : 'bg-green-500'}`}></span>
            {row.banned_status ? 'Off' : 'On'}
          </div>
        </div>
      ), 
      width: "140px" 
    },
    {
      name: 'Action',
      cell: (row: Customer) => (
      <div className="flex gap-5 justify-center items-center">
  <div 
    onClick={() => router.push(`/customer/view-customer?id=${row._id}`)} 
    className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
  >
    <Eye size={20} />
  </div>

  <div 
    onClick={() => router.push(`/customer/edit-customer?id=${row._id}`)} 
    className="cursor-pointer text-green-600 hover:text-green-800 transition-colors"
  >
    <Edit size={20} />
  </div>

  <div 
    onClick={() => handleWalletModalOpen(row._id)} 
    className="cursor-pointer text-purple-600 hover:text-purple-800 transition-colors"
  >
    <Wallet size={20} />
  </div>
</div>

      ),
      width: "150px"
    },
  ];

  return (
    <>
    {/* /    <DatatableHeading
          title="Customer" 
          data={customerData} 
          url="/customer/add-customer" 
        /> */}

     

        <MainDatatable
          columns={columns}
          data={filteredData}
          title="Customer"
          isLoading={loading}
          url="/customer/add-customer" 
        />

      {/* Wallet Modal */}
      <Dialog 
        open={walletModal} 
        onClose={handleWalletModalClose}
        PaperProps={{ 
          sx: { 
            maxWidth: { xs: '90vw', sm: '50vw' }, 
            minWidth: { xs: '90vw', sm: '50vw' } 
          } 
        }}
      >
        <DialogContent className="p-6">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <div className="text-[22px] font-medium text-gray-900">
                <div className="flex items-center justify-between gap-3">
                  <div>Wallet</div>
                  <div 
                    onClick={handleWalletModalClose} 
                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ×
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={<span>Amount <span className="text-red-500">*</span></span>}
                variant="outlined"
                fullWidth
                name="amount"
                type="number"
                value={inputFieldDetail?.amount}
                onChange={handleInputField}
                error={inputFieldError.amount ? true : false}
                helperText={inputFieldError.amount}
                onFocus={() => handleInputFieldError("amount", "")}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Type</InputLabel>
                <Select
                  className="bg-white min-h-[43px]"
                  label="Type"
                  variant="outlined"
                  fullWidth
                  name="type"
                  value={inputFieldDetail?.type}
                  onChange={handleSelectChange}
                  error={inputFieldError?.type ? true : false}
                  onFocus={() => handleInputFieldError("type", "")}
                >
                  <MenuItem disabled value="">
                    <span className="text-gray-400">---Select Type---</span>
                  </MenuItem>
                  <MenuItem value={'credit'}>Add</MenuItem>
                  <MenuItem value={'deduct'}>Deduct</MenuItem>
                </Select>
              </FormControl>
              {inputFieldError?.type && (
                <div className="text-red-500 text-xs mt-1 px-4">
                  {inputFieldError?.type}
                </div>
              )}
            </Grid>

            <Grid item xs={12}>
              <div className="flex justify-end">
                <div 
                  onClick={handleSubmit} 
                  className="font-medium bg-blue-600 text-white px-5 py-2.5 rounded cursor-pointer text-sm hover:bg-blue-700 transition-colors"
                >
                  Submit
                </div>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}