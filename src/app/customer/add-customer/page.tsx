'use client';

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar } from "@mui/material";
import { Color } from "../../../assets/colors";
// import { UploadImageSvg } from "../../../assets/svg";
// import { img_url } from "../../../utils/api-routes";
import { YYYYMMDD } from "../../../utils/common-function";

interface CustomerDetail {
  customerName: string;
  phoneNumber: string;
  gender: string;
  wallet: string;
  dateOfBirth: string;
  timeOfBirth: string;
}

interface InputFieldError {
  customerName?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  timeOfBirth?: string;
  image?: string;
}

interface ImageState {
  file: string;
  bytes: File | null;
}

interface AddCustomerProps {
  mode: 'Add' | 'Edit';
  initialStateData?: any;
}

const AddCustomer = ({ mode, initialStateData }: AddCustomerProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Get state data from URL params or props
    const stateData = initialStateData || (searchParams.get('data') ? JSON.parse(searchParams.get('data')!) : null);
    console.log("State Data :: ", stateData);

    // Fixed: Added proper initialization for image URL
    const [customerDetail, setCustomerDetail] = useState<CustomerDetail>({ 
        customerName: stateData ? stateData?.customerName : '', 
        phoneNumber: stateData ? stateData?.phoneNumber : '', 
        gender: stateData ? stateData?.gender : '', 
        wallet: stateData ? stateData?.wallet_balance : '', 
        dateOfBirth: stateData ? YYYYMMDD(stateData?.dateOfBirth) : '', 
        timeOfBirth: stateData ? stateData?.timeOfBirth : '' 
    });
    
    const [inputFieldError, setInputFieldError] = useState<InputFieldError>({});
    
    // Fixed: Handle missing img_url - use empty string or placeholder
    const [image, setImage] = useState<ImageState>({ 
        file: stateData ? (stateData?.image || '') : '', // Removed img_url reference
        bytes: null 
    });

    //! Handle Image : Normally
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
        }
        handleInputFieldError("image", undefined);
    };

    //! Handle Image : Drop Feature
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.dataTransfer.files[0]),
                bytes: e.dataTransfer.files[0],
            });
        }
        handleInputFieldError("image", undefined);
    };

    //* Handle Input Field : inputFieldError
    const handleInputFieldError = (input: keyof InputFieldError, value: string | undefined) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }));
    }

    //* Handle Input Field : Data
    const handleInputField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(value);
        setCustomerDetail({ ...customerDetail, [name]: value });
    };

    const handleSelectChange = (e: any) => {
        const { name, value } = e.target;
        setCustomerDetail({ ...customerDetail, [name]: value });
    };

    //! Snack-Bar Logic Start 
    const [openSnack, setOpenSnack] = useState(false);
    const [messageSnack, setMessageSnack] = useState("");

    const handleClickOpenSnack = (msg: string) => {
        setOpenSnack(true);
        setMessageSnack(msg);
    };

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const basicPattern = /^[a-zA-Z\s]{1,56}$/;   // Accept Only Alphabet and Space
        const contactPattern = /^[0-9]{10}$/;
        const { customerName, phoneNumber, gender, dateOfBirth, timeOfBirth } = customerDetail;

        // if (!image?.file) {
        //     handleInputFieldError('image', 'Please Upload Profile Image');
        //     isValid = false;
        //     handleClickOpenSnack("Please Upload Profile Image");
        //     return isValid;
        // }

        if (!customerName) {
            handleInputFieldError('customerName', 'Please Enter Customer Name');
            isValid = false;
            handleClickOpenSnack("Please Enter Customer Name");
            return isValid;
        }

        if (customerName?.toString().length > 30) {
            handleInputFieldError('customerName', 'Please Enter Name Less Than 30 Digit');
            isValid = false;
            handleClickOpenSnack("Please Enter Name Less Than 30 Digit");
            return isValid;
        }

        if (!basicPattern.test(customerName)) {
            handleInputFieldError('customerName', 'Please Enter Valid Customer Name');
            isValid = false;
            handleClickOpenSnack("Please Enter Valid Customer Name");
            return isValid;
        }

        if (!phoneNumber) {
            handleInputFieldError('phoneNumber', 'Please Enter Phone Number');
            isValid = false;
            handleClickOpenSnack("Please Enter Phone Number");
            return isValid;
        }

        if (!contactPattern.test(phoneNumber)) {
            handleInputFieldError('phoneNumber', 'Please Enter Valid Phone Number');
            isValid = false;
            handleClickOpenSnack("Please Enter Valid Phone Number");
            return isValid;
        }

        if (!gender) {
            handleInputFieldError('gender', 'Please Enter Gender');
            isValid = false;
            handleClickOpenSnack("Please Enter Gender");
            return isValid;
        }

        if (!dateOfBirth) {
            handleInputFieldError('dateOfBirth', 'Please Enter Date Of Birth');
            isValid = false;
            handleClickOpenSnack("Please Enter Date Of Birth");
            return isValid;
        }

        if (!timeOfBirth) {
            handleInputFieldError('timeOfBirth', 'Please Enter Time Of Birth');
            isValid = false;
            handleClickOpenSnack("Please Enter Time Of Birth");
            return isValid;
        }

        return isValid;
    };

    //! Handle Submit - FIXED VERSION
    const handleSubmit = async () => {
        console.log("Submitting data:", { ...customerDetail, image, mode });
        const { customerName, phoneNumber, gender, wallet, dateOfBirth, timeOfBirth } = customerDetail;

        if (handleValidation()) {
            try {
                let formData = new FormData();
                
                // Debug: Check what data we're sending
                console.log("State Data ID:", stateData?._id);
                console.log("Mode:", mode);
                
                if (stateData && stateData._id) {
                    // Update existing customer - ensure we're sending the correct ID field
                    formData.append("customerId", stateData._id);
                    console.log("Appending customerId:", stateData._id);
                }
                
                formData.append("customerName", customerName);
                formData.append("phoneNumber", phoneNumber);
                formData.append("gender", gender);
                formData.append("wallet", wallet || "0");
                formData.append("dateOfBirth", dateOfBirth);
                formData.append("timeOfBirth", timeOfBirth);
                
                if (image.bytes) {
                    formData.append("image", image.bytes);
                }

                const apiUrl = stateData && stateData._id 
                    ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-customer`
                    : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/create-customer`;

                console.log("API URL:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                });

                const responseData = await response.json();
                console.log("API Response:", responseData);

                if (response.ok) {
                    if (responseData.success) {
                        handleClickOpenSnack(
                            stateData ? "Customer updated successfully!" : "Customer created successfully!"
                        );
                        setTimeout(() => {
                            router.push("/customer");
                        }, 2000);
                    } else {
                        handleClickOpenSnack(responseData.message || "Something went wrong!");
                    }
                } else {
                    handleClickOpenSnack(responseData.message || "Failed to save customer data");
                }
            } catch (error) {
                console.error('Error saving customer:', error);
                handleClickOpenSnack("An error occurred while saving customer data");
            }
        }
    };

    return (
        <>
            <Snackbar 
                open={openSnack} 
                autoHideDuration={2000} 
                onClose={() => setOpenSnack(false)} 
                message={messageSnack} 
                anchorOrigin={{ vertical: "top", horizontal: "right" }} 
            />

            <div className="p-5 bg-white mb-5 shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-8 bg-white">
                    <div className="text-2xl font-medium text-gray-900">
                        {mode === 'Edit' ? 'Edit Customer' : 'Add Customer'}
                    </div>
                    <div 
                        onClick={() => router.push("/customer")} 
                        className="font-medium text-white px-4 py-2 rounded cursor-pointer text-sm transition-colors"
                        style={{ backgroundColor: 'rgb(239, 68, 68)' }}
                    >
                        Display
                    </div>
                </div>

                <Grid container alignItems="center" spacing={3}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className="text-black border border-gray-300 rounded">
                            {image?.file ? (
                                <label 
                                    onDragOver={(e) => e.preventDefault()} 
                                    onDrop={handleDrop} 
                                    htmlFor="upload-image" 
                                    className="flex flex-col items-center p-5 cursor-pointer"
                                >
                                    <Avatar 
                                        src={image.file} 
                                        className="h-72 min-w-1/2 rounded-none"
                                        sx={{ height: '300px', minWidth: "50%", borderRadius: "initial" }}
                                    />
                                </label>
                            ) : (
                                <label 
                                    onDragOver={(e) => e.preventDefault()} 
                                    onDrop={handleDrop} 
                                    htmlFor="upload-image" 
                                    className="flex flex-col gap-5 items-center py-24 cursor-pointer"
                                >
                                    {/* <UploadImageSvg h="80" w="80" color="#C4C4C4" /> */}
                                    <div className="font-semibold text-lg">Choose Your Image to Upload</div>
                                    <div className="font-medium text-base text-gray-500">Or Drop Your Image Here</div>
                                </label>
                            )}
                            <input 
                                id="upload-image" 
                                onChange={handleImage} 
                                hidden 
                                accept="image/*" 
                                type="file" 
                            />
                        </div>
                        {inputFieldError?.image && (
                            <div className="text-red-600 text-sm px-4 pt-1 font-medium">
                                {inputFieldError?.image}
                            </div>
                        )}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField 
                            label={<> Enter Name <span className="text-red-500">*</span></>} 
                            variant="outlined" 
                            fullWidth
                            name="customerName"
                            value={customerDetail?.customerName}
                            onChange={handleInputField}
                            error={!!inputFieldError.customerName}
                            helperText={inputFieldError.customerName}
                            onFocus={() => handleInputFieldError("customerName", undefined)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField 
                            label={<> Enter Phone <span className="text-red-500">*</span></>} 
                            variant="outlined" 
                            fullWidth
                            name="phoneNumber"
                            value={customerDetail?.phoneNumber}
                            onChange={handleInputField}
                            error={!!inputFieldError.phoneNumber}
                            helperText={inputFieldError.phoneNumber}
                            onFocus={() => handleInputFieldError("phoneNumber", undefined)}
                        />
                    </Grid>

                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Enter Gender <span className="text-red-500">*</span></InputLabel>
                            <Select 
                                label="Enter Gender *" 
                                variant="outlined" 
                                fullWidth
                                name="gender"
                                value={customerDetail?.gender}
                                onChange={handleSelectChange}
                                error={!!inputFieldError?.gender}
                                onFocus={() => handleInputFieldError("gender", undefined)}
                            >
                                <MenuItem disabled value="">Select Gender</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            {inputFieldError?.gender && (
                                <div className="text-red-600 text-sm px-4 pt-1 font-medium">
                                    {inputFieldError?.gender}
                                </div>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            variant="outlined" 
                            label={<> Date of Birth <span className="text-red-500">*</span></>} 
                            fullWidth 
                            type="date"
                            name="dateOfBirth"
                            value={customerDetail?.dateOfBirth}
                            onChange={handleInputField}
                            error={!!inputFieldError.dateOfBirth}
                            helperText={inputFieldError.dateOfBirth}
                            onFocus={() => handleInputFieldError("dateOfBirth", undefined)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            variant="outlined" 
                            label={<> Time of Birth <span className="text-red-500">*</span></>} 
                            fullWidth 
                            type="time"
                            name="timeOfBirth"
                            value={customerDetail?.timeOfBirth}
                            onChange={handleInputField}
                            error={!!inputFieldError.timeOfBirth}
                            helperText={inputFieldError.timeOfBirth}
                            onFocus={() => handleInputFieldError("timeOfBirth", undefined)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container justifyContent="space-between">
                            <div 
                                onClick={handleSubmit} 
                                className="font-medium text-white px-5 py-3 rounded cursor-pointer text-sm transition-colors"
                                style={{ backgroundColor: 'rgb(239, 68, 68)' }}
                            >
                                {mode === 'Edit' ? 'Update Customer' : 'Submit'}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default AddCustomer;