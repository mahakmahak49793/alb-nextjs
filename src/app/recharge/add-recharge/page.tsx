'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";


interface RechargeDetail {
  rechargeAmount: string;
  extraPercent: string;
  startDate: string;
  endDate: string;
}

interface InputFieldError {
  rechargeAmount: string;
  extraPercent: string;
  startDate: string;
  endDate: string;
}

interface Data {
    amount: number;
    percentage: number;
    startDate: string;
    endDate: string;
}

// Helper function to format date to YYYY-MM-DD
const formatDate = (date: string | Date): string => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AddRechargeComponent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get edit data from URL params if exists
  const editId = searchParams.get('id');
  const editAmount = searchParams.get('amount');
  const editPercentage = searchParams.get('percentage');
  const editStartDate = searchParams.get('startDate');
  const editEndDate = searchParams.get('endDate');

  const [rechargeDetail, setRechargeDetail] = useState<RechargeDetail>({
    rechargeAmount: editAmount || '',
    extraPercent: editPercentage || '',
    startDate: editStartDate ? formatDate(editStartDate) : '',
    endDate: editEndDate ? formatDate(editEndDate) : ''
  });

  const [inputFieldError, setInputFieldError] = useState<InputFieldError>({
    rechargeAmount: '',
    extraPercent: '',
    startDate: '',
    endDate: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Field Error
  const handleInputFieldError = (input: keyof InputFieldError, value: string) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value }));
  };

  // Handle Input Field Data
  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRechargeDetail({ ...rechargeDetail, [name]: value });
  };

  // Handle Validation
  const handleValidation = (): boolean => {
    let isValid = true;
    const { rechargeAmount, extraPercent, startDate, endDate } = rechargeDetail;

    // Reset all errors
    setInputFieldError({
      rechargeAmount: '',
      extraPercent: '',
      startDate: '',
      endDate: ''
    });

    if (!rechargeAmount) {
      handleInputFieldError("rechargeAmount", "Please Enter Recharge Amount");
      isValid = false;
    } else if (Number(rechargeAmount) < 1) {
      handleInputFieldError("rechargeAmount", "Please Enter Amount Greater Than 0");
      isValid = false;
    }

    if (!extraPercent) {
      handleInputFieldError("extraPercent", "Please Enter Extra Percent");
      isValid = false;
    } else if (Number(extraPercent) < 0) {
      handleInputFieldError("extraPercent", "Percentage cannot be negative");
      isValid = false;
    }

    if (!startDate) {
      handleInputFieldError("startDate", "Please Select Start Date");
      isValid = false;
    }

    if (!endDate) {
      handleInputFieldError("endDate", "Please Select End Date");
      isValid = false;
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      handleInputFieldError("endDate", "End Date must be after Start Date");
      isValid = false;
    }

    return isValid;
  };

  // Create Recharge Plan
  const createRechargePlan = async (data: Data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/create_recharge_plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create recharge plan');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Update Recharge Plan
  const updateRechargePlan = async (data: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-recharge-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, rechargePlanId: editId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update recharge plan');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { rechargeAmount, extraPercent, startDate, endDate } = rechargeDetail;

    if (handleValidation()) {
      setIsSubmitting(true);

      const body = {
        amount: Number(rechargeAmount),
        percentage: Number(extraPercent),
        startDate: startDate,
        endDate: endDate,
        status: "Active"
      };

      try {
        if (editId) {
          // Update existing recharge plan
          await updateRechargePlan(body);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Recharge plan updated successfully',
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          // Create new recharge plan
          await createRechargePlan(body);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Recharge plan created successfully',
            timer: 2000,
            showConfirmButton: false,
          });
        }

        // Navigate back to recharge list
        setTimeout(() => {
          router.push('/recharge');
        }, 2000);
      } catch (error: any) {
        console.error('Error submitting form:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to save recharge plan',
          timer: 2000,
          showConfirmButton: false,
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Validation Error");
    }
  };

  return (
    <div className="p-5 bg-white shadow-sm border border-gray-200 rounded-lg mb-5">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-semibold text-gray-800">
          {editId ? 'Edit Recharge' : 'Add Recharge'}
        </div>
        <button
          onClick={() => router.push("/recharge")}
          className="font-medium bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 text-sm"
        >
          Display
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recharge Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recharge Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="rechargeAmount"
              value={rechargeDetail.rechargeAmount}
              onChange={handleInputField}
              onFocus={() => handleInputFieldError("rechargeAmount", '')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                inputFieldError.rechargeAmount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter recharge amount"
            />
            {inputFieldError.rechargeAmount && (
              <p className="text-red-500 text-xs mt-1">{inputFieldError.rechargeAmount}</p>
            )}
          </div>

          {/* Extra Percent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extra Percent <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="extraPercent"
              value={rechargeDetail.extraPercent}
              onChange={handleInputField}
              onFocus={() => handleInputFieldError("extraPercent", '')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                inputFieldError.extraPercent ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter extra percent"
            />
            {inputFieldError.extraPercent && (
              <p className="text-red-500 text-xs mt-1">{inputFieldError.extraPercent}</p>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={rechargeDetail.startDate}
              onChange={handleInputField}
              onFocus={() => handleInputFieldError("startDate", '')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                inputFieldError.startDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {inputFieldError.startDate && (
              <p className="text-red-500 text-xs mt-1">{inputFieldError.startDate}</p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={rechargeDetail.endDate}
              onChange={handleInputField}
              onFocus={() => handleInputFieldError("endDate", '')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                inputFieldError.endDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {inputFieldError.endDate && (
              <p className="text-red-500 text-xs mt-1">{inputFieldError.endDate}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`font-medium text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200 text-base ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

const AddRecharge = () => {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <AddRechargeComponent />
    </Suspense>
  )
}

export default AddRecharge;