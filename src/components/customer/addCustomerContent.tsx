'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from '@mui/material';
import { YYYYMMDD } from '@/utils/common-function';

interface CustomerDetail {
  customerName: string;
  phoneNumber: string;
  gender: string;
  wallet: string;
  dateOfBirth: string;
  timeOfBirth: string;
}

const AddCustomerContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get data from URL params
  const customerId = searchParams.get('id');
  const isEditMode = !!customerId;

  const [detail, setDetail] = useState<CustomerDetail>({
    customerName: '',
    phoneNumber: '',
    gender: '',
    wallet: '',
    dateOfBirth: '',
    timeOfBirth: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [image, setImage] = useState<{ file: string; bytes: File | null }>({
    file: '',
    bytes: null,
  });
  const [snack, setSnack] = useState({ open: false, msg: '' });

  /* ---------- Fill form from URL params ---------- */
  useEffect(() => {
    if (isEditMode) {
      const customerName = searchParams.get('customerName') || '';
      const phoneNumber = searchParams.get('phoneNumber') || '';
      const gender = searchParams.get('gender') || '';
      const wallet_balance = searchParams.get('wallet_balance') || '0';
      const dateOfBirth = searchParams.get('dateOfBirth') || '';
      const timeOfBirth = searchParams.get('timeOfBirth') || '';
      const imageUrl = searchParams.get('image') || '';

      setDetail({
        customerName,
        phoneNumber,
        gender,
        wallet: wallet_balance,
        dateOfBirth: dateOfBirth ? YYYYMMDD(dateOfBirth) : '',
        timeOfBirth,
      });

      if (imageUrl) {
        setImage({ file: imageUrl, bytes: null });
      }
    }
  }, [searchParams, isEditMode]);

  /* ---------- Image handling ---------- */
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage({ file: URL.createObjectURL(file), bytes: file });
    }
    setError('image', undefined);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImage({ file: URL.createObjectURL(file), bytes: file });
    }
    setError('image', undefined);
  };

  const setError = (field: string, msg: string | undefined) => {
    setErrors((prev: any) => ({ ...prev, [field]: msg }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (e: any) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  const openSnack = (msg: string) => {
    setSnack({ open: true, msg });
  };

  /* ---------- Validation ---------- */
  const validate = () => {
    let ok = true;
    const namePat = /^[a-zA-Z\s]{1,56}$/;
    const phonePat = /^[0-9]{10}$/;
    const { customerName, phoneNumber, gender, dateOfBirth, timeOfBirth } = detail;

    if (!customerName) { setError('customerName', 'Enter name'); ok = false; openSnack('Enter name'); return ok; }
    if (customerName.length > 30) { setError('customerName', 'Name ≤30 chars'); ok = false; openSnack('Name ≤30 chars'); return ok; }
    if (!namePat.test(customerName)) { setError('customerName', 'Invalid name'); ok = false; openSnack('Invalid name'); return ok; }

    if (!phoneNumber) { setError('phoneNumber', 'Enter phone'); ok = false; openSnack('Enter phone'); return ok; }
    if (!phonePat.test(phoneNumber)) { setError('phoneNumber', 'Invalid phone'); ok = false; openSnack('Invalid phone'); return ok; }

    if (!gender) { setError('gender', 'Select gender'); ok = false; openSnack('Select gender'); return ok; }
    if (!dateOfBirth) { setError('dateOfBirth', 'Select DOB'); ok = false; openSnack('Select DOB'); return ok; }
    if (!timeOfBirth) { setError('timeOfBirth', 'Select TOB'); ok = false; openSnack('Select TOB'); return ok; }

    return ok;
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async () => {
    if (!validate()) return;

    const fd = new FormData();
    if (isEditMode && customerId) fd.append('customerId', customerId);
    fd.append('customerName', detail.customerName);
    fd.append('phoneNumber', detail.phoneNumber);
    fd.append('gender', detail.gender);
    fd.append('wallet', detail.wallet || '0');
    fd.append('dateOfBirth', detail.dateOfBirth);
    fd.append('timeOfBirth', detail.timeOfBirth);
    if (image.bytes) fd.append('image', image.bytes);

    const url = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-customer-data`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/customers/customer-signup`;

    const res = await fetch(url, { method: 'POST', body: fd });
    const json = await res.json();

    if (res.ok && json.success) {
      openSnack(isEditMode ? 'Updated!' : 'Created!');
      setTimeout(() => router.push('/customer'), 2000);
    } else {
      openSnack(json.message || 'Error');
    }
  };

  /* ---------- UI ---------- */
  return (
    <>
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack({ ...snack, open: false })}
        message={snack.msg}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />

      <div className="p-5 bg-white mb-5 shadow-sm rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-medium text-gray-900">
            {isEditMode ? 'Edit Customer' : 'Add Customer'}
          </div>
          <div
            onClick={() => router.push('/customer')}
            className="font-medium text-white px-4 py-2 rounded cursor-pointer text-sm"
            style={{ backgroundColor: 'rgb(239, 68, 68)' }}
          >
            Display
          </div>
        </div>

        {/* ----- IMAGE ----- */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <div className="border border-gray-300 rounded">
              {image.file ? (
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  htmlFor="upload-image"
                  className="flex flex-col items-center p-5 cursor-pointer"
                >
                  <Avatar
                    src={image.file}
                    sx={{ height: 300, width: '50%', borderRadius: 0 }}
                  />
                </label>
              ) : (
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  htmlFor="upload-image"
                  className="flex flex-col gap-5 items-center py-24 cursor-pointer"
                >
                  <div className="font-semibold text-lg">Choose Image</div>
                  <div className="text-base text-gray-500">or drop here</div>
                </label>
              )}
              <input id="upload-image" type="file" accept="image/*" hidden onChange={handleImage} />
            </div>
            {errors.image && <div className="text-red-600 text-sm px-4 pt-1">{errors.image}</div>}
          </Grid>

          {/* ----- FORM FIELDS ----- */}
          <Grid item lg={6} xs={12}>
            <TextField
              fullWidth
              label={<>Name <span className="text-red-500">*</span></>}
              name="customerName"
              value={detail.customerName}
              onChange={handleInput}
              error={!!errors.customerName}
              helperText={errors.customerName}
              onFocus={() => setError('customerName', undefined)}
            />
          </Grid>

          <Grid item lg={6} xs={12}>
            <TextField
              fullWidth
              label={<>Phone <span className="text-red-500">*</span></>}
              name="phoneNumber"
              value={detail.phoneNumber}
              onChange={handleInput}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              onFocus={() => setError('phoneNumber', undefined)}
            />
          </Grid>

          <Grid item lg={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Gender <span className="text-red-500">*</span></InputLabel>
              <Select
                name="gender"
                value={detail.gender}
                onChange={handleSelect}
                error={!!errors.gender}
                onFocus={() => setError('gender', undefined)}
              >
                <MenuItem disabled value="">Select</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {errors.gender && <div className="text-red-600 text-sm px-4 pt-1">{errors.gender}</div>}
            </FormControl>
          </Grid>

          <Grid item lg={6} xs={12}>
            <TextField
              fullWidth
              type="date"
              label={<>DOB <span className="text-red-500">*</span></>}
              name="dateOfBirth"
              value={detail.dateOfBirth}
              onChange={handleInput}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              onFocus={() => setError('dateOfBirth', undefined)}
            />
          </Grid>

          <Grid item lg={6} xs={12}>
            <TextField
              fullWidth
              type="time"
              label={<>TOB <span className="text-red-500">*</span></>}
              name="timeOfBirth"
              value={detail.timeOfBirth}
              onChange={handleInput}
              InputLabelProps={{ shrink: true }}
              error={!!errors.timeOfBirth}
              helperText={errors.timeOfBirth}
              onFocus={() => setError('timeOfBirth', undefined)}
            />
          </Grid>

          <Grid item xs={12}>
            <div className="flex justify-end">
              <div
                onClick={handleSubmit}
                className="font-medium text-white px-5 py-3 rounded cursor-pointer text-sm"
                style={{ backgroundColor: 'rgb(239, 68, 68)' }}
              >
                {isEditMode ? 'Update' : 'Submit'}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default AddCustomerContent;