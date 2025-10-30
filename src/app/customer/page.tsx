// app/customer/page.tsx
'use client';

import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Edit, Wallet, AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
  Typography,
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
  gender?: string;
  image?: string;
}

interface ApiResponse {
  success: boolean;
  customers: Customer[];
}

// SVG Components for toggle switches
const SwitchOnSvg = () => (
  <svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="24" rx="12" fill="#22C55E"/>
    <circle cx="30" cy="12" r="8" fill="white"/>
  </svg>
);

const SwitchOffSvg = () => (
  <svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="24" rx="12" fill="#EF4444"/>
    <circle cx="14" cy="12" r="8" fill="white"/>
  </svg>
);

export default function Customer() {
  const router = useRouter();

  // State
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  
  const filteredData = DeepSearchSpace(customerData, searchText);

  const [walletModal, setWalletModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
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

  // Confirmation modal handlers
  const handleConfirmationModalOpen = (customer: Customer) => {
    setSelectedCustomer(customer);
    setConfirmationModal(true);
  };

  const handleConfirmationModalClose = () => {
    setConfirmationModal(false);
    setSelectedCustomer(null);
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
    if (Number(amount) <= 0) {
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
        transactions: [
          {
            customerId: userId,
            amount: Number(inputFieldDetail.amount)
          }
        ],
        type: inputFieldDetail.type
      };

      console.log('Sending wallet payload:', payload);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/add_deduct_customer_wallet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      .then(async (res) => {
        const responseText = await res.text();
        console.log('Wallet API Response:', responseText);

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          throw new Error('Invalid JSON response from server');
        }

        if (!res.ok) {
          throw new Error(data.message || `HTTP error! status: ${res.status}`);
        }

        return data;
      })
      .then(data => {
        if (data.success) {
          alert('Wallet updated successfully!');
          handleWalletModalClose();
          
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/get-all-customers`)
            .then(res => res.json())
            .then(data => {
              if (data.success && Array.isArray(data.customers)) {
                setCustomerData(data.customers);
              }
            })
            .catch(error => {
              console.error('Error refetching customers:', error);
            });
        } else {
          alert(data.message || 'Failed to update wallet');
        }
      })
      .catch(error => {
        console.error('Error updating wallet:', error);
        alert(`Error: ${error.message}`);
      });
    }
  };

  // Status toggle handler with confirmation
  const handleStatusToggle = (customer: Customer) => {
    if (!customer.banned_status) {
      handleConfirmationModalOpen(customer);
    } else {
      updateCustomerStatus(customer._id, customer.customerName, false);
    }
  };

  // Actual status update function
  const updateCustomerStatus = (customerId: string, customerName: string, status: boolean) => {
    const payload = {
      customerId: customerId,
      customerName: customerName,
      status: status
    };

    console.log('Sending status payload:', payload);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/change-banned-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    .then(async (res) => {
      console.log('Response status:', res.status);
      
      const responseText = await res.text();
      console.log('Response text:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error(`Server returned HTML instead of JSON. Status: ${res.status}`);
      }

      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }

      return data;
    })
    .then(data => {
      if (data.success) {
        setCustomerData(prev => 
          prev.map(customer => 
            customer._id === customerId 
              ? { ...customer, banned_status: data.data.banned_status }
              : customer
          )
        );
        console.log('Status updated successfully:', data.data.banned_status);
        handleConfirmationModalClose();
      } else {
        alert(data.message || 'Failed to update status');
      }
    })
    .catch(error => {
      console.error('Error toggling status:', error);
      alert(`Error: ${error.message}`);
    });
  };

  // Handle confirm ban
  const handleConfirmBan = () => {
    if (selectedCustomer) {
      updateCustomerStatus(selectedCustomer._id, selectedCustomer.customerName, true);
    }
  };

  // Navigate to edit with URL params
  const handleEditCustomer = (customer: Customer) => {
    const params = new URLSearchParams({
      id: customer._id,
      customerName: customer.customerName,
      phoneNumber: customer.phoneNumber,
      gender: customer.gender || '',
      wallet_balance: customer.wallet_balance.toString(),
      dateOfBirth: customer.dateOfBirth,
      timeOfBirth: customer.timeOfBirth,
      image: customer.image || '',
    });
    
    router.push(`/customer/add-customer?${params.toString()}`);
  };

  // Table Columns
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
          onClick={() => handleStatusToggle(row)}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {!row?.banned_status ? <SwitchOnSvg /> : <SwitchOffSvg />}
        </div>
      ), 
      width: "140px",
      center: true
    },
    {
      name: 'Action',
      cell: (row: Customer) => (
        <div className="flex gap-5 justify-center items-center">
          <div 
            onClick={() => router.push(`/customer/view-customer?id=${row._id}`)} 
            className="cursor-pointer text-red-600 hover:text-red-800 transition-colors"
          >
            <Eye size={20} />
          </div>
          <div 
            onClick={() => handleEditCustomer(row)} 
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
      width: "150px",
      center: true
    },
  ];

  return (
    <>
      

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
                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors text-2xl"
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
                  className="font-medium bg-red-600 text-white px-5 py-2.5 rounded cursor-pointer text-sm hover:bg-red-700 transition-colors"
                >
                  Submit
                </div>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal for Banning Customer */}
      <Dialog 
        open={confirmationModal} 
        onClose={handleConfirmationModalClose}
        PaperProps={{ 
          sx: { 
            maxWidth: { xs: '90vw', sm: '400px' }, 
            minWidth: { xs: '90vw', sm: '400px' },
            borderRadius: '12px',
            padding: '20px'
          } 
        }}
      >
        <DialogContent className="p-4 text-center">
          <Box className="flex justify-center mb-4">
            <AlertTriangle size={48} className="text-yellow-500" />
          </Box>
          
          <Typography variant="h6" className="font-semibold mb-2">
            Are you sure?
          </Typography>
          
          <Typography variant="body1" className="text-gray-600 mb-4">
            You want to ban this customer{" "}
            <strong>{selectedCustomer?.customerName}</strong>!!!
          </Typography>
        </DialogContent>

        <DialogActions className="flex justify-center gap-4 p-4">
          <Button 
            onClick={handleConfirmationModalClose}
            variant="outlined"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            No
          </Button>
          <Button 
            onClick={handleConfirmBan}
            variant="contained"
            sx={{
              backgroundColor: '#dc2626',
              '&:hover': {
                backgroundColor: '#b91c1c',
              },
              px: 2,
              py: 1,
              color: 'white'
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}