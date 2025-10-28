'use client';
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface InputFieldDetail {
  title: string;
}

interface InputFieldError {
  title: string;
}

interface CategoryData {
  _id: string;
  categoryName: string;
}

const AddCategory = ({ mode = "Add" }: { mode?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get state data from URL params
  const stateDataString = searchParams.get('stateData');
  const stateData: CategoryData | null = stateDataString 
    ? JSON.parse(decodeURIComponent(stateDataString))
    : null;

  console.log("State Data ::: ", stateData);

  const [inputFieldDetail, setInputFieldDetail] = useState<InputFieldDetail>({ 
    title: stateData ? stateData?.categoryName : '' 
  });
  const [inputFieldError, setInputFieldError] = useState<InputFieldError>({ 
    title: '' 
  });
  const [loading, setLoading] = useState(false);

  //* Handle Input Field : Error
  const handleInputFieldError = (input: keyof InputFieldError, value: string) => 
    setInputFieldError((prev) => ({ ...prev, [input]: value }));

  //* Handle Input Field : Data
  const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => 
    setInputFieldDetail({ ...inputFieldDetail, [event.target.name]: event.target.value });

  // Regex pattern for validation
  const Regex_Accept_Alpha_Dot_Comma_Space = /^[a-zA-Z.,\s]+$/;

  //! Handle Validation
  const handleValidation = () => {
    let isValid = true;
    const { title } = inputFieldDetail;

    if (!title) {
      handleInputFieldError("title", "Please Enter Title")
      isValid = false;
    }
    if (!Regex_Accept_Alpha_Dot_Comma_Space.test(title)) {
      handleInputFieldError("title", "Please Enter Valid Title")
      isValid = false;
    }
    if (title.toString().length > 70) {
      handleInputFieldError("title", "Please Enter Title Less Than 70 Letter")
      isValid = false;
    }

    return isValid;
  };

  // API call functions
  const createCategory = async (categoryData: { categoryName: string }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puja/create_puja_category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  };

  const updateCategory = async (categoryData: { categoryId: string; categoryName: string }) => {
    try {
      const response = await fetch('/api/puja-category', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  //! Handle Submit - Creating/Updating Category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      const { title } = inputFieldDetail;

      try {
        if (stateData) {
          // Update existing category
          const result = await updateCategory({
            categoryId: stateData._id,
            categoryName: title
          });
          
          if (result.success) {
            router.push("/astro-puja/category");
          } else {
            console.error('Failed to update category:', result.message);
          }
        } else {
          // Create new category
          const result = await createCategory({
            categoryName: title
          });
          
          if (result.success) {
            router.push("/astro-puja/category");
          } else {
            console.error('Failed to create category:', result.message);
          }
        }
      } catch (error) {
        console.error('Error submitting category:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg mb-5">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-medium text-gray-800">
          {mode} Puja Category
        </div>
        <button 
          onClick={() => router.push("/astro-puja/category")}
         
          className="bg-red-500 disabled:bg-blue-300 text-white px-3 py-3 rounded cursor-pointer font-medium transition duration-200 flex items-center gap-2"
        >
          Display
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={inputFieldDetail.title}
            onChange={handleInputField}
            onFocus={() => handleInputFieldError("title", "")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              inputFieldError.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter category title"
          />
          {inputFieldError.title && (
            <p className="text-red-500 text-sm mt-1">{inputFieldError.title}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button 
            onClick={handleSubmit}
            disabled={loading}
          className="bg-red-500 disabled:bg-blue-300 text-white px-6 py-3 rounded cursor-pointer font-medium transition duration-200 flex items-center gap-2"

          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;