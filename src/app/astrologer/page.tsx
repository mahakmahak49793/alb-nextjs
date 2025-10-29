'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import DataTable, { TableColumn } from 'react-data-table-component';
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeepSearchSpace } from '@/utils/common-function';
import {
  CrossSvg,
  EditSvg,
  SwitchOffSvg,
  SwitchOnSvg,
  ViewSvg,
  WalletSvg,
} from '@/assets/svg';
import { Color } from '@/assets/colors';
import MainDatatable from '@/components/datatable/MainDatatable';
import { api_url, base_url, get_astrologer } from '@/lib/api-routes';

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------
interface Astrologer {
  _id: string;
  astrologerName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  isVerified: boolean;
  chat_status?: 'online' | 'offline';
  call_status?: 'online' | 'offline';
  video_call_status?: 'online' | 'offline';
}

// Use react-data-table-component's TableColumn type
type AstrologerColumn = TableColumn<Astrologer>;

// ---------------------------------------------------------------------
// Datatable Heading Component
// ---------------------------------------------------------------------
interface DatatableHeadingProps {
  title: string;
  url?: string;
  data: Astrologer[];
}

const DatatableHeading: React.FC<DatatableHeadingProps> = ({ title, url, data }) => {
  const router = useRouter();

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

        {url && (
          <div
            onClick={() => router.push(url)}
            style={{
              fontWeight: 500,
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
  );
};

// ---------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------
export default function AstrologerPage() {
  const router = useRouter();

  // State
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const filteredData = DeepSearchSpace(astrologers, searchText);

  // Wallet Modal
  const [walletModal, setWalletModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [inputFieldDetail, setInputFieldDetail] = useState<{
    amount: string;
    type: 'credit' | 'deduct' | '';
  }>({ amount: '', type: '' });
  const [inputFieldError, setInputFieldError] = useState<{
    amount?: string;
    type?: string;
  }>({});

  // Edit Status Modal
  const [editState, setEditState] = useState<{
    open: boolean;
    astro: Astrologer | null;
  }>({ open: false, astro: null });

  // -----------------------------------------------------------------
  // Data Fetching
  // -----------------------------------------------------------------
  const fetchAstrologers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${base_url}${get_astrologer}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log(data.astrologers)
      setAstrologers(data.astrologers);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAstrologers();
  }, []);

  // -----------------------------------------------------------------
  // Wallet Handlers
  // -----------------------------------------------------------------
  const openWallet = (astro: Astrologer) => {
    setUserId(astro._id);
    setWalletModal(true);
  };

  const closeWallet = () => {
    setWalletModal(false);
    setInputFieldDetail({ amount: '', type: '' });
    setInputFieldError({});
  };

  const handleInputFieldError = (field: 'amount' | 'type', msg: string | null) => {
    setInputFieldError((prev) => ({ ...prev, [field]: msg ?? undefined }));
  };

  const handleInputField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputFieldDetail((prev) => ({ ...prev, [name]: value }));
  };

  const validateWallet = () => {
    let ok = true;
    const { amount, type } = inputFieldDetail;

    if (!amount) {
      handleInputFieldError('amount', 'Please Enter Amount');
      ok = false;
    } else if (Number(amount) <= 0) {
      handleInputFieldError('amount', 'Please Enter Amount Greater Than Zero');
      ok = false;
    } else {
      handleInputFieldError('amount', null);
    }

    if (!type) {
      handleInputFieldError('type', 'Please Select Type');
      ok = false;
    } else {
      handleInputFieldError('type', null);
    }
    return ok;
  };

  const submitWallet = async () => {
    if (!validateWallet()) return;

    const payload = {
      transactions: [{ astrologerId: userId, amount: Number(inputFieldDetail.amount) }],
      type: inputFieldDetail.type,
    };

    try {
      const res = await fetch('/api/astrologers/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed');
      await fetchAstrologers();
      closeWallet();
    } catch (e) {
      console.error(e);
    }
  };

  // -----------------------------------------------------------------
  // Verify Toggle
  // -----------------------------------------------------------------
  const toggleVerify = async (astro: Astrologer) => {
    try {
      await fetch('/api/astrologers/verify', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          astrologerId: astro._id,
          isVerified: !astro.isVerified,
        }),
      });
      await fetchAstrologers();
    } catch (e) {
      console.error(e);
    }
  };

  // -----------------------------------------------------------------
  // Edit Status Modal
  // -----------------------------------------------------------------
  const openEdit = (astro: Astrologer) => setEditState({ open: true, astro });
  const closeEdit = () => setEditState({ open: false, astro: null });

  const changeStatus = async (
    field: 'chat_status' | 'call_status' | 'video_call_status',
    id: string,
    current: string | undefined
  ) => {
    const newVal = current === 'online' ? 'offline' : 'online';
    try {
      await fetch('/api/astrologers/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ astrologerId: id, field, value: newVal }),
      });
      await fetchAstrologers();
      closeEdit();
    } catch (e) {
      console.error(e);
    }
  };

  // -----------------------------------------------------------------
  // Table Columns (using TableColumn<Astrologer>)
  // -----------------------------------------------------------------
  const columns: AstrologerColumn[] = [
    {
      name: 'S.No.',
      selector: (row, index) => (index !== undefined ? filteredData.indexOf(row) + 1 : 0),
      width: '80px',
    },
    { name: 'Name', selector: (row) => row.astrologerName },
    { name: 'Email', selector: (row) => row.email, width: '250px' },
    { name: 'Mobile', selector: (row) => row.phoneNumber },
    {
      name: 'Created Date',
      selector: (row) => moment(row.createdAt).format('Do MMM YYYY'),
      width: '140px',
    },
    {
      name: 'Status',
      cell: (row) => (
        <div style={{ cursor: 'pointer' }} onClick={() => toggleVerify(row)}>
          {row.isVerified ? <SwitchOnSvg /> : <SwitchOffSvg />}
        </div>
      ),
      width: '140px',
      center: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div
            onClick={() =>
              router.push(
                `/astrologer/view-astrologer?state=${encodeURIComponent(JSON.stringify(row))}`
              )
            }
            style={{ cursor: 'pointer' }}
          >
            <ViewSvg />
          </div>
          <div
            onClick={() =>
              router.push(
                `/astrologer/edit-astrologer?state=${encodeURIComponent(JSON.stringify(row))}`
              )
            }
            style={{ cursor: 'pointer' }}
          >
            <EditSvg />
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => openWallet(row)}>
            <WalletSvg />
          </div>
          <MoreVertIcon onClick={() => openEdit(row)} sx={{ cursor: 'pointer' }} />
        </div>
      ),
      width: '200px',
      center: true,
    },
  ];

  // -----------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------
  return (
    <>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          marginBottom: '20px',
          boxShadow: '0px 0px 5px lightgrey',
          borderRadius: '10px',
        }}
      >
        <DatatableHeading
          title="List Of Astrologers"
          data={astrologers}
          url="/astrologer/add-astrologer"
        />

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
              boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
              width: '100%',
              maxWidth: '250px',
              fontSize: '15px',
              outline: 'none',
            }}
          />
        </div>

        <MainDatatable columns={columns} data={filteredData} isLoading={isLoading} />
      </div>

      {/* Wallet Modal */}
      <Dialog
        open={walletModal}
        PaperProps={{
          sx: { maxWidth: { xs: '90vw', sm: '50vw' }, minWidth: { xs: '90vw', sm: '50vw' } },
        }}
      >
        <DialogContent>
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                }}
              >
                <div style={{ fontSize: '22px', fontWeight: 500, color: Color.black }}>
                  Wallet
                </div>
                <div onClick={closeWallet} style={{ cursor: 'pointer' }}>
                  <CrossSvg />
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label={
                  <>
                    Amount <span style={{ color: 'red' }}>*</span>
                  </>
                }
                variant="outlined"
                fullWidth
                name="amount"
                value={inputFieldDetail.amount}
                onChange={handleInputField}
                error={!!inputFieldError.amount}
                helperText={inputFieldError.amount}
                onFocus={() => handleInputFieldError('amount', null)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  label="Type"
                  name="type"
                  value={inputFieldDetail.type}
                  onChange={handleInputField as any}
                  error={!!inputFieldError.type}
                  onFocus={() => handleInputFieldError('type', null)}
                >
                  <MenuItem disabled>---Select Type---</MenuItem>
                  <MenuItem value="credit">Add</MenuItem>
                  <MenuItem value="deduct">Deduct</MenuItem>
                </Select>
              </FormControl>
              {inputFieldError.type && (
                <div style={{ color: '#F44C35', fontSize: '12.5px', padding: '3px 15px 0 15px' }}>
                  {inputFieldError.type}
                </div>
              )}
            </Grid>

            <Grid item xs={12}>
              <Grid container sx={{ justifyContent: 'space-between' }}>
                <div
                  onClick={submitWallet}
                  style={{
                    fontWeight: 500,
                    backgroundColor: Color.primary,
                    color: Color.white,
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  Submit
                </div>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Edit Status Modal */}
      <Dialog open={editState.open}>
        <DialogContent sx={{ minWidth: '300px', maxWidth: '500px' }}>
          {editState.astro && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    gap: '10px',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {editState.astro.astrologerName}
                  </Typography>
                  <div
                    onClick={closeEdit}
                    style={{
                      backgroundColor: 'grey',
                      color: '#fff',
                      cursor: 'pointer',
                      padding: '2px 10px 3px 10px',
                      borderRadius: '30px',
                    }}
                  >
                    x
                  </div>
                </div>
              </Grid>

              {/* Chat Status */}
              <Grid item xs={5}>Change Chat Status</Grid>
              <Grid item xs={7}>
                <Button
                  onClick={() =>
                    changeStatus('chat_status', editState.astro!._id, editState.astro!.chat_status)
                  }
                  style={{
                    backgroundColor:
                      editState.astro.chat_status === 'online' ? 'green' : 'red',
                    color: '#fff',
                    width: '200px',
                    textWrap: 'nowrap',
                  }}
                >
                  Chat Status
                </Button>
              </Grid>

              {/* Call Status */}
              <Grid item xs={5}>Change Call Status</Grid>
              <Grid item xs={7}>
                <Button
                  onClick={() =>
                    changeStatus('call_status', editState.astro!._id, editState.astro!.call_status)
                  }
                  style={{
                    backgroundColor:
                      editState.astro.call_status === 'online' ? 'green' : 'red',
                    color: '#fff',
                    width: '200px',
                  }}
                >
                  Call Status
                </Button>
              </Grid>

              {/* Video Call Status */}
              <Grid item xs={5}>Change Video Call Status</Grid>
              <Grid item xs={7}>
                <Button
                  onClick={() =>
                    changeStatus(
                      'video_call_status',
                      editState.astro!._id,
                      editState.astro!.video_call_status
                    )
                  }
                  style={{
                    backgroundColor:
                      editState.astro.video_call_status === 'online' ? 'green' : 'red',
                    color: '#fff',
                    width: '200px',
                  }}
                >
                  Video Call Status
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}