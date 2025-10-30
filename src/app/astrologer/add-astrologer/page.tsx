'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import moment from 'moment';

// CSS imports
import 'react-image-crop/dist/ReactCrop.css';

import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Button,
  Avatar,
  Snackbar,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Country, State, City } from 'country-state-city';

import { CrossSvg, DeleteSvg, UploadImageSvg } from '@/assets/svg';
import { Color } from '@/assets/colors';
import { calculateAge, get_date_value } from '@/utils/common-function';
import { base_url } from '@/lib/api-routes';
import Swal from 'sweetalert2';

interface Skill { _id: string; skill: string }
interface Expertise { _id: string; mainExpertise: string }
interface Remedy { _id: string; title: string }
interface Language { _id: string; languageName: string }
interface SlotDuration { _id: string; slotDuration: string; active: boolean }
interface ConsultationPrice {
  _id: string;
  duration: SlotDuration;
  price: number;
}

interface AstrologerForm {
  name: string;
  emerging_type: string;
  email: string;
  mobile: string;
  altMobile: string;
  currency: string;
  gender: string;
  password: string;
  confirmPassword: string;
  dob: string;
  experience: string;
  countryPhoneCode: string;
  pinCode: string;
  startTime: string;
  endTime: string;
  rating: number;
  followers: number;
  language: string[];
  address: string;
  country: string;
  state: string;
  city: string;
  youtubeLink: string;
  freeMinutes: string;
  bankName: string;
  bankAccountNumber: string;
  accountType: string;
  ifscCode: string;
  accountHolderName: string;
  panNumber: string;
  aadharNumber: string;
  consultationPrice: string;
  call_price: string;
  commission_call_price: string;
  total_call_duration: number;
  chat_price: string;
  commission_chat_price: string;
  total_chat_duration: number;
  normal_video_call_price: number;
  commission_normal_video_call_price: number;
  total_video_call_duration: number;
  video_call_price: number;
  commission_video_call_price: number;
  gift_commission: number;
  consultation_commission_call: string;
  consultation_call_price: string;
  consultation_commission_chat: string;
  consultation_chat_price: string;
  consultation_commission_videocall: string;
  consultation_videocall_price: string;
  consultation_commission: string;
  shortBio: string;
  about: string;
  tagLine: string;
  commissionRemark: string;
  working: string;
  longBio: string;
}

// Separate component that uses useSearchParams
function AddAstrologerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'Add';
  const stateData = searchParams.get('state') ? JSON.parse(decodeURIComponent(searchParams.get('state')!)) : null;

  const [form, setForm] = useState<AstrologerForm>({
    name: stateData?.astrologerName || '',
    emerging_type: stateData?.title || '',
    email: stateData?.email || '',
    mobile: stateData?.phoneNumber || '',
    altMobile: stateData?.alternateNumber || '',
    currency: stateData?.currency || 'INR',
    gender: stateData?.gender || '',
    password: '',
    confirmPassword: '',
    dob: stateData?.dateOfBirth ? moment(stateData.dateOfBirth).format('YYYY-MM-DD') : '',
    experience: stateData?.experience || '',
    countryPhoneCode: '91',
    pinCode: stateData?.zipCode || '',
    startTime: stateData?.startTime || '',
    endTime: stateData?.endTime || '',
    rating: stateData?.rating || 0,
    followers: stateData?.follower_count || 0,
    language: stateData?.language?.map((l: any) => l.languageName) || [],
    address: stateData?.address || '',
    country: stateData?.country || 'India',
    state: stateData?.state || '',
    city: stateData?.city || '',
    youtubeLink: 'https://www.youtube.com/',
    freeMinutes: '5',
    bankName: stateData?.account_name || '',
    bankAccountNumber: stateData?.account_number || '',
    accountType: stateData?.account_type || '',
    ifscCode: stateData?.IFSC_code || '',
    accountHolderName: stateData?.account_holder_name || '',
    panNumber: stateData?.panCard || '',
    aadharNumber: stateData?.aadharNumber || '',
    consultationPrice: '4',
    call_price: stateData?.call_price || '',
    commission_call_price: stateData?.commission_call_price || '',
    total_call_duration: stateData?.totalCallDuration / 60 || 0,
    chat_price: stateData?.chat_price || '',
    commission_chat_price: stateData?.commission_chat_price || '',
    total_chat_duration: stateData?.totalChatDuration / 60 || 0,
    normal_video_call_price: stateData?.normal_video_call_price || 0,
    commission_normal_video_call_price: stateData?.commission_normal_video_call_price || 0,
    total_video_call_duration: stateData?.totalVideoCallDuration / 60 || 0,
    video_call_price: stateData?.video_call_price || 0,
    commission_video_call_price: stateData?.commission_video_call_price || 0,
    gift_commission: stateData?.gift_commission || 0,
    consultation_commission_call: stateData?.consultation_commission_call || '',
    consultation_call_price: stateData?.consultation_call_price || '',
    consultation_commission_chat: stateData?.consultation_commission_chat || '',
    consultation_chat_price: stateData?.consultation_chat_price || '',
    consultation_commission_videocall: stateData?.consultation_commission_videocall || '',
    consultation_videocall_price: stateData?.consultation_videocall_price || '',
    consultation_commission: stateData?.consultation_commission || '',
    shortBio: stateData?.short_bio || '',
    about: stateData?.about || '',
    tagLine: stateData?.tagLine || '',
    commissionRemark: 'Hii',
    working: 'No',
    longBio: stateData?.long_bio || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snack, setSnack] = useState({ open: false, message: '' });

  const [skills, setSkills] = useState<Skill[]>([]);
  const [mainExpertise, setMainExpertise] = useState<Expertise[]>([]);
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [slotDurations, setSlotDurations] = useState<SlotDuration[]>([]);
  const [consultationPrices, setConsultationPrices] = useState<ConsultationPrice[]>([]);

  const [selectedSkills, setSelectedSkills] = useState<string[]>(stateData?.skill?.map((s: any) => s._id) || []);
  const [selectedRemedies, setSelectedRemedies] = useState<string[]>(stateData?.remedies?.map((r: any) => r._id) || []);
  const [selectedMainExpertise, setSelectedMainExpertise] = useState<string[]>(stateData?.mainExpertise?.map((e: any) => e._id) || []);

  const [image, setImage] = useState<{ file: string; bytes: File | null }>({ file: stateData ? `${base_url}${stateData.profileImage}` : '', bytes: null });
  const [bankProof, setBankProof] = useState<{ file: string; bytes: File | null }>({ file: stateData ? `${base_url}${stateData.bank_proof_image}` : '', bytes: null });
  const [idProof, setIdProof] = useState<{ file: string; bytes: File | null }>({ file: stateData ? `${base_url}${stateData.id_proof_image}` : '', bytes: null });

  const [bulkImages, setBulkImages] = useState<{ file: string; bytes: File | null }[]>(
    stateData?.multipleImages?.map((img: string) => ({ file: `${base_url}${img}`, bytes: null })) || []
  );
  const [bulkVideos, setBulkVideos] = useState<{ file: string; bytes: File | null }[]>(
    stateData?.multipleVideos?.map((vid: string) => ({ file: `${base_url}${vid}`, bytes: null })) || []
  );

  const [isCropping, setIsCropping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<any>({ name: 'India', isoCode: 'IN' });
  const [selectedState, setSelectedState] = useState<any>({});

  // === DUMMY DATA MOCKS ===
  useEffect(() => {
    const mockSkills: Skill[] = [
      { _id: '1', skill: 'Vedic Astrology' },
      { _id: '2', skill: 'Numerology' },
      { _id: '3', skill: 'Palmistry' },
      { _id: '4', skill: 'Tarot Reading' },
      { _id: '5', skill: 'Vastu Shastra' },
      { _id: '6', skill: 'Lal Kitab' },
    ];

    const mockExpertise: Expertise[] = [
      { _id: '1', mainExpertise: 'Love & Relationship' },
      { _id: '2', mainExpertise: 'Career & Finance' },
      { _id: '3', mainExpertise: 'Health & Wellness' },
      { _id: '4', mainExpertise: 'Marriage & Matchmaking' },
      { _id: '5', mainExpertise: 'Education' },
    ];

    const mockRemedies: Remedy[] = [
      { _id: '1', title: 'Gemstone Recommendation' },
      { _id: '2', title: 'Mantra Chanting' },
      { _id: '3', title: 'Puja & Havan' },
      { _id: '4', title: 'Fasting Guidelines' },
      { _id: '5', title: 'Yantra Installation' },
    ];

    const mockLanguages: Language[] = [
      { _id: '1', languageName: 'Hindi' },
      { _id: '2', languageName: 'English' },
      { _id: '3', languageName: 'Tamil' },
      { _id: '4', languageName: 'Telugu' },
      { _id: '5', languageName: 'Bengali' },
      { _id: '6', languageName: 'Marathi' },
    ];

    const mockSlots: SlotDuration[] = [
      { _id: '1', slotDuration: '5 Minutes', active: true },
      { _id: '2', slotDuration: '10 Minutes', active: true },
      { _id: '3', slotDuration: '15 Minutes', active: true },
      { _id: '4', slotDuration: '20 Minutes', active: true },
      { _id: '5', slotDuration: '30 Minutes', active: true },
      { _id: '6', slotDuration: '45 Minutes', active: false },
      { _id: '7', slotDuration: '60 Minutes', active: true },
    ];

    setSkills(mockSkills);
    setMainExpertise(mockExpertise);
    setRemedies(mockRemedies);
    setLanguages(mockLanguages);
    setSlotDurations(mockSlots);

    if (stateData?._id) {
      const mockConsultationPrices: ConsultationPrice[] = [
        { _id: 'cp1', duration: mockSlots[0], price: 100 },
        { _id: 'cp2', duration: mockSlots[1], price: 180 },
        { _id: 'cp3', duration: mockSlots[4], price: 500 },
      ];
      setConsultationPrices(mockConsultationPrices);
    }
  }, [stateData?._id]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleMultiSelectChange = (e: SelectChangeEvent<string[]>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size < 500 * 1024) {
        setImage({ file: URL.createObjectURL(file), bytes: file });
      } else {
        setSnack({ open: true, message: 'Image must be < 500KB' });
      }
    }
  };

  const handleBulk = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (type === 'video' && file.size > 30 * 1024 * 1024) {
      setSnack({ open: true, message: 'Video must be < 30MB' });
      return;
    }
    
    const url = URL.createObjectURL(file);
    if (type === 'image') {
      setBulkImages(prev => [...prev, { file: url, bytes: file }]);
    } else {
      setBulkVideos(prev => [...prev, { file: url, bytes: file }]);
    }
  };

  const removeBulk = (index: number, type: 'image' | 'video') => {
    if (type === 'image') setBulkImages(prev => prev.filter((_, i) => i !== index));
    else setBulkVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckbox = (id: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Validation
  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!form.name) newErrors.name = 'Name required';
    if (!emailRegex.test(form.email)) newErrors.email = 'Invalid email';
    if (!mobileRegex.test(form.mobile)) newErrors.mobile = '10-digit mobile required';
    if (!stateData && !form.password) newErrors.password = 'Password required';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    if (!form.dob) newErrors.dob = 'DOB required';
    if (calculateAge(form.dob) < 18) newErrors.dob = 'Must be 18+';
    if (!form.experience) newErrors.experience = 'Experience required';
    if (form.language.length === 0) newErrors.language = 'Select at least one language';
    if (!image.bytes && !stateData) newErrors.image = 'Profile image required';
    if (selectedSkills.length === 0) newErrors.skills = 'Select at least one skill';
    if (selectedRemedies.length === 0) newErrors.remedies = 'Select at least one remedy';
    if (selectedMainExpertise.length === 0) newErrors.mainExpertise = 'Select at least one expertise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit (Mock Success)
  const handleSubmit = async () => {
    if (!validate()) return;

    Swal.fire('Success', 'Astrologer saved successfully!', 'success');
    // router.push('/astrologer'); // Uncomment when routing is ready
  };

  return (
    <>
      <Snackbar 
        open={snack.open} 
        autoHideDuration={3000} 
        onClose={() => setSnack({ ...snack, open: false })} 
        message={snack.message} 
      />
      
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {mode === 'Edit' ? 'Edit' : 'Add'} Astrologer
        </Typography>

        <Grid container spacing={3}>
          {/* Profile Image */}
          <Grid item xs={12} md={4}>
            <Box sx={{ border: '1px solid #C4C4C4', borderRadius: 1, p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Avatar 
                    src={image.file || '/placeholder-avatar.jpg'} 
                    sx={{ width: 54, height: 54, borderRadius: 0, objectFit: 'contain' }} 
                  />
                </Grid>
                <Grid item xs={9}>
                  <label htmlFor="upload-image" style={{ cursor: 'pointer' }}>
                    <Typography variant="caption" color="error">*</Typography> Choose Astrologer Image to Upload
                    <Typography variant="caption" sx={{ color: 'green', fontSize: '10px' }}>
                      only png, jpg or jpeg files are allowed
                    </Typography>
                    <input 
                      id="upload-image" 
                      type="file" 
                      accept="image/*" 
                      hidden 
                      onChange={handleImage} 
                    />
                  </label>
                </Grid>
              </Grid>
            </Box>
            {errors.image && <Typography color="error" variant="caption">{errors.image}</Typography>}
          </Grid>

          {/* Simple Image Preview Modal */}
          {isCropping && (
            <Box sx={{ 
              position: 'fixed', 
              inset: 0, 
              bgcolor: 'rgba(255,255,255,1)', 
              zIndex: 9999, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              p: 2 
            }}>
              <img 
                src={image.file} 
                alt="preview" 
                style={{ maxWidth: '300px', borderRadius: '8px' }} 
              />
              <Box mt={2} display="flex" gap={2}>
                <Button 
                  variant="contained" 
                  onClick={() => setIsCropping(false)}
                >
                  Done
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => {
                    setIsCropping(false);
                    setImage({ file: '', bytes: null });
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}

          {/* Form Fields */}
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label={<>Enter Full Name <span style={{ color: 'red' }}>*</span></>} 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              error={!!errors.name} 
              helperText={errors.name} 
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label={<>Enter Email <span style={{ color: 'red' }}>*</span></>} 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              error={!!errors.email} 
              helperText={errors.email} 
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label={<>Enter Mobile Number <span style={{ color: 'red' }}>*</span></>} 
              name="mobile" 
              value={form.mobile} 
              onChange={handleChange} 
              error={!!errors.mobile} 
              helperText={errors.mobile} 
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label="Alternate Mobile Number" 
              name="altMobile" 
              value={form.altMobile} 
              onChange={handleChange} 
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select Currency *</InputLabel>
              <Select name="currency" value={form.currency} onChange={handleSelectChange}>
                <MenuItem value="INR">INR</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select Gender *</InputLabel>
              <Select name="gender" value={form.gender} onChange={handleSelectChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label={<>Password <span style={{ color: 'red' }}>*</span></>}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label={<>Confirm Password <span style={{ color: 'red' }}>*</span></>}
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label={<>Date of Birth <span style={{ color: 'red' }}>*</span></>}
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              error={!!errors.dob}
              helperText={errors.dob}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: get_date_value(18) }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label={<>Experience in Years <span style={{ color: 'red' }}>*</span></>}
              type="number"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              error={!!errors.experience}
              helperText={errors.experience}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth error={!!errors.language}>
              <InputLabel>Select Language *</InputLabel>
              <Select
                name="language"
                multiple
                value={form.language}
                onChange={handleMultiSelectChange}
              >
                {languages.map(l => (
                  <MenuItem key={l._id} value={l.languageName}>{l.languageName}</MenuItem>
                ))}
              </Select>
              {errors.language && <Typography color="error" variant="caption">{errors.language}</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select Emerging Type</InputLabel>
              <Select name="emerging_type" value={form.emerging_type} onChange={handleSelectChange}>
                <MenuItem value="Rising Star">Rising Star</MenuItem>
                <MenuItem value="Top Astrologer">Top Astrologer</MenuItem>
                <MenuItem value="Celebrity">Celebrity</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={8}>
            <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Country *</InputLabel>
              <Select
                name="country"
                value={form.country}
                onChange={(e: SelectChangeEvent<string>) => {
                  handleSelectChange(e);
                  const country = Country.getAllCountries().find((c:any )=> c.name === e.target.value);
                  setSelectedCountry(country || { name: 'India', isoCode: 'IN' });
                }}
              >
                {Country.getAllCountries().map((c:any) => (
                  <MenuItem key={c.isoCode} value={c.name}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>State *</InputLabel>
              <Select
                name="state"
                value={form.state}
                onChange={(e: SelectChangeEvent<string>) => {
                  handleSelectChange(e);
                  const state = State.getStatesOfCountry(selectedCountry.isoCode).find((s:any) => s.name === e.target.value);
                  setSelectedState(state || {});
                }}
              >
                {State.getStatesOfCountry(selectedCountry.isoCode).map((s:any) => (
                  <MenuItem key={s.isoCode} value={s.name}>{s.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>City *</InputLabel>
              <Select name="city" value={form.city} onChange={handleSelectChange}>
                {City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode)?.map((c:any) => (
                  <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Pin Code" name="pinCode" value={form.pinCode} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label="Number Of Followers" 
              type="number" 
              name="followers" 
              value={form.followers} 
              onChange={handleChange} 
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Bank Name" name="bankName" value={form.bankName} onChange={handleChange} />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label={<>Bank Account Number <span style={{ color: 'red' }}>*</span></>} 
              name="bankAccountNumber" 
              value={form.bankAccountNumber} 
              onChange={handleChange} 
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select Account Type</InputLabel>
              <Select name="accountType" value={form.accountType} onChange={handleSelectChange}>
                <MenuItem value="saving">Saving</MenuItem>
                <MenuItem value="current">Current</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label="Account Holder Name" 
              name="accountHolderName" 
              value={form.accountHolderName} 
              onChange={handleChange} 
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="IFSC Code" name="ifscCode" value={form.ifscCode} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label={<>Aadhar Card Number <span style={{ color: 'red' }}>*</span></>} 
              name="aadharNumber" 
              value={form.aadharNumber} 
              onChange={handleChange} 
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth 
              label={<>PAN Card Number <span style={{ color: 'red' }}>*</span></>} 
              name="panNumber" 
              value={form.panNumber} 
              onChange={handleChange} 
            />
          </Grid>

          {/* Bank Proof Upload */}
          <Grid item xs={12} md={6}>
            <Box sx={{ border: '1px solid #C4C4C4', borderRadius: 1, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Avatar src={bankProof.file || '/placeholder-doc.jpg'} sx={{ width: 56, height: 56 }} />
                </Grid>
                <Grid item xs={9}>
                  <label htmlFor="upload-bank-proof" style={{ cursor: 'pointer' }}>
                    Upload Bank Proof
                    <Typography variant="caption" sx={{ color: 'green', fontSize: '10px' }}>
                      only png, jpg or jpeg files are allowed
                    </Typography>
                    <input 
                      id="upload-bank-proof" 
                      type="file" 
                      accept="image/*" 
                      hidden 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setBankProof({ file: URL.createObjectURL(file), bytes: file });
                      }} 
                    />
                  </label>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* ID Proof Upload */}
          <Grid item xs={12} md={6}>
            <Box sx={{ border: '1px solid #C4C4C4', borderRadius: 1, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Avatar src={idProof.file || '/placeholder-doc.jpg'} sx={{ width: 56, height: 56 }} />
                </Grid>
                <Grid item xs={9}>
                  <label htmlFor="upload-id-proof" style={{ cursor: 'pointer' }}>
                    Upload Id Proof
                    <Typography variant="caption" sx={{ color: 'green', fontSize: '10px' }}>
                      only png, jpg or jpeg files are allowed
                    </Typography>
                    <input 
                      id="upload-id-proof" 
                      type="file" 
                      accept="image/*" 
                      hidden 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setIdProof({ file: URL.createObjectURL(file), bytes: file });
                      }} 
                    />
                  </label>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Bulk Images Upload */}
          <Grid item xs={12}>
            <Box sx={{ 
              border: bulkImages.length ? `1px solid ${Color.primary}` : '1px solid #C4C4C4', 
              borderRadius: 1, 
              p: 2, 
              mb: 2 
            }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                {bulkImages.map((img, i) => (
                  <Box key={i} sx={{ position: 'relative' }}>
                    <Avatar src={img.file} sx={{ width: 150, height: 150, borderRadius: 0 }} />
                    <IconButton 
                      size="small" 
                      sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'white' }} 
                      onClick={() => removeBulk(i, 'image')}
                    >
                      <CrossSvg />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <label 
                htmlFor="upload-bulk-image" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px', 
                  cursor: 'pointer', 
                  backgroundColor: '#F1F1F7', 
                  padding: '8px', 
                  borderRadius: '4px' 
                }}
              >
                <UploadImageSvg h={'25'} w={'25'} color="#000" />
                <Typography fontWeight={600}>Upload Image</Typography>
              </label>
              <input 
                id="upload-bulk-image" 
                type="file" 
                accept="image/*" 
                hidden 
                onChange={(e) => handleBulk(e, 'image')} 
              />
            </Box>
          </Grid>

          {/* Bulk Videos Upload */}
          <Grid item xs={12}>
            <Box sx={{ 
              border: bulkVideos.length ? `1px solid ${Color.primary}` : '1px solid #C4C4C4', 
              borderRadius: 1, 
              p: 2 
            }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                {bulkVideos.map((vid, i) => (
                  <Box key={i} sx={{ position: 'relative' }}>
                    <video controls style={{ width: '150px', height: '150px' }}>
                      <source src={vid.file} />
                    </video>
                    <IconButton 
                      size="small" 
                      sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'white' }} 
                      onClick={() => removeBulk(i, 'video')}
                    >
                      <CrossSvg />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <label 
                htmlFor="upload-bulk-video" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px', 
                  cursor: 'pointer', 
                  backgroundColor: '#F1F1F7', 
                  padding: '8px', 
                  borderRadius: '4px' 
                }}
              >
                <UploadImageSvg h={'25'} w={'25'} color="#000" />
                <Typography fontWeight={600}>Upload Video</Typography>
              </label>
              <input 
                id="upload-bulk-video" 
                type="file" 
                accept="video/*" 
                hidden 
                onChange={(e) => handleBulk(e, 'video')} 
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label={<>Consultation Commission (%) <span style={{ color: 'red' }}>*</span></>} 
              name="consultation_commission" 
              value={form.consultation_commission} 
              onChange={handleChange} 
            />
          </Grid>

          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Tag Line" 
              name="tagLine" 
              value={form.tagLine} 
              onChange={handleChange} 
              multiline
              rows={2}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="About" 
              name="about" 
              value={form.about} 
              onChange={handleChange} 
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Long Bio" 
              name="longBio" 
              value={form.longBio} 
              onChange={handleChange} 
              multiline
              rows={6}
              placeholder="Enter detailed bio here..."
            />
          </Grid>

          {/* Skills Section */}
          <Grid item xs={12}>
            <FormLabel component="legend">
              Skills <span style={{ color: 'red' }}>*</span>
              {errors.skills && <Typography color="error" variant="caption" sx={{ ml: 1 }}>{errors.skills}</Typography>}
            </FormLabel>
            <FormGroup row>
              {skills.sort((a, b) => a.skill.localeCompare(b.skill)).map(s => (
                <FormControlLabel
                  key={s._id}
                  control={
                    <Checkbox 
                      checked={selectedSkills.includes(s._id)} 
                      onChange={() => handleCheckbox(s._id, selectedSkills, setSelectedSkills)} 
                    />
                  }
                  label={s.skill}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Remedies Section */}
          <Grid item xs={12}>
            <FormLabel component="legend">
              Remedies <span style={{ color: 'red' }}>*</span>
              {errors.remedies && <Typography color="error" variant="caption" sx={{ ml: 1 }}>{errors.remedies}</Typography>}
            </FormLabel>
            <FormGroup row>
              {remedies.sort((a, b) => a.title.localeCompare(b.title)).map(r => (
                <FormControlLabel
                  key={r._id}
                  control={
                    <Checkbox 
                      checked={selectedRemedies.includes(r._id)} 
                      onChange={() => handleCheckbox(r._id, selectedRemedies, setSelectedRemedies)} 
                    />
                  }
                  label={r.title}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Main Expertise Section */}
          <Grid item xs={12}>
            <FormLabel component="legend">
              Main Expertise <span style={{ color: 'red' }}>*</span>
              {errors.mainExpertise && <Typography color="error" variant="caption" sx={{ ml: 1 }}>{errors.mainExpertise}</Typography>}
            </FormLabel>
            <FormGroup row>
              {mainExpertise.sort((a, b) => a.mainExpertise.localeCompare(b.mainExpertise)).map(e => (
                <FormControlLabel
                  key={e._id}
                  control={
                    <Checkbox 
                      checked={selectedMainExpertise.includes(e._id)} 
                      onChange={() => handleCheckbox(e._id, selectedMainExpertise, setSelectedMainExpertise)} 
                    />
                  }
                  label={e.mainExpertise}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Button 
              variant="contained" 
              sx={{ bgcolor: Color.primary, color: '#fff' }} 
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>

      {stateData && <ConsultationPriceSection astrologerId={stateData._id} />}
    </>
  );
}

// Consultation Price Section with Dummy Data
const ConsultationPriceSection = ({ astrologerId }: { astrologerId: string }) => {
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [slots, setSlots] = useState<SlotDuration[]>([]);
  const [prices, setPrices] = useState<ConsultationPrice[]>([]);

  useEffect(() => {
    const mockSlots: SlotDuration[] = [
      { _id: '1', slotDuration: '5 Minutes', active: true },
      { _id: '2', slotDuration: '10 Minutes', active: true },
      { _id: '3', slotDuration: '15 Minutes', active: true },
      { _id: '4', slotDuration: '20 Minutes', active: true },
      { _id: '5', slotDuration: '30 Minutes', active: true },
      { _id: '6', slotDuration: '45 Minutes', active: false },
      { _id: '7', slotDuration: '60 Minutes', active: true },
    ];

    const mockPrices: ConsultationPrice[] = [
      { _id: 'cp1', duration: mockSlots[0], price: 100 },
      { _id: 'cp2', duration: mockSlots[1], price: 180 },
      { _id: 'cp3', duration: mockSlots[4], price: 500 },
    ];

    setSlots(mockSlots);
    setPrices(mockPrices);
  }, [astrologerId]);

  const handleSubmit = async () => {
    if (!duration || !price) return;
    const newPrice: ConsultationPrice = {
      _id: `cp${Date.now()}`,
      duration: slots.find(s => s._id === duration)!,
      price: Number(price)
    };
    setPrices(prev => [...prev, newPrice]);
    setDuration('');
    setPrice('');
  };

  const handleDelete = (id: string) => {
    setPrices(prev => prev.filter(p => p.duration._id !== id));
  };

  return (
    <Box mt={4} p={3} bgcolor="#fff" borderRadius={2} boxShadow={1}>
      <Typography variant="h6">Consultation Price</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Duration</InputLabel>
            <Select value={duration} onChange={e => setDuration(e.target.value)}>
              {slots.filter(s => s.active).map(s => (
                <MenuItem key={s._id} value={s._id}>{s.slotDuration}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField 
            fullWidth 
            label="Price" 
            type="number" 
            value={price} 
            onChange={e => setPrice(e.target.value)} 
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleSubmit}>Add</Button>
        </Grid>
      </Grid>

      <Box mt={3}>
        {prices.map((p, i) => (
          <Box 
            key={p._id} 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            p={1} 
            borderBottom="1px solid #eee"
          >
            <Typography>
              {i + 1}. {p.duration.slotDuration} - ₹{p.price}
            </Typography>
            <IconButton onClick={() => handleDelete(p.duration._id)}>
              <DeleteSvg />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Main export with Suspense boundary
export default function AddAstrologerPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    }>
      <AddAstrologerContent />
    </Suspense>
  );
}