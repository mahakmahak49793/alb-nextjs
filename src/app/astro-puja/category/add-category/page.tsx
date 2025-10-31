'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

interface InputFieldDetail {
  title: string;
}

interface InputFieldError {
  title: string;
}

function AddCategoryReview() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const editMode = searchParams.get('edit') === 'true';
  const categoryId = searchParams.get('id');
  const categoryNameFromUrl = searchParams.get('name');

  const [inputFieldDetail, setInputFieldDetail] = useState<InputFieldDetail>({
    title: categoryNameFromUrl ? decodeURIComponent(categoryNameFromUrl) : ''
  });
  const [inputFieldError, setInputFieldError] = useState<InputFieldError>({
    title: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(editMode && !categoryNameFromUrl);

  // Fetch category data if in edit mode
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (editMode && categoryId && !categoryNameFromUrl) {
        try {
          setFetching(true);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puja/get_puja_category/${categoryId}`);
          const data = await response.json();

          if (data.success && data.data) {
            setInputFieldDetail({ title: data.data.categoryName });
          } else {
            await Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to load category data',
              confirmButtonColor: '#d33',
            });
          }
        } catch (error) {
          console.error('Error fetching category:', error);
          await Swal.fire({
            icon: 'error',
            title: 'Network Error!',
            text: 'Failed to load category data. Please check your connection.',
            confirmButtonColor: '#d33',
          });
        } finally {
          setFetching(false);
        }
      }
    };

    fetchCategoryData();
  }, [editMode, categoryId, categoryNameFromUrl]);

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
      handleInputFieldError("title", "Please Enter Title");
      isValid = false;
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter a title for the category',
        confirmButtonColor: '#3085d6',
      });
    } else if (!Regex_Accept_Alpha_Dot_Comma_Space.test(title)) {
      handleInputFieldError("title", "Please Enter Valid Title");
      isValid = false;
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter a valid title (only letters, dots, commas and spaces allowed)',
        confirmButtonColor: '#3085d6',
      });
    } else if (title.length > 70) {
      handleInputFieldError("title", "Please Enter Title Less Than 70 Letters");
      isValid = false;
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Title must be less than 70 characters',
        confirmButtonColor: '#3085d6',
      });
    } else {
      handleInputFieldError("title", "");
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puja/update_puja_category`, {
        method: 'POST',
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
        if (editMode && categoryId) {
          // Update existing category
          const result = await updateCategory({
            categoryId,
            categoryName: title,
          });

          if (result.success) {
            await Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Category updated successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => {
              router.push("/astro-puja/category");
            }, 1600);
          } else {
            await Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: result.message || 'Failed to update category',
              confirmButtonColor: '#d33',
            });
          }
        } else {
          // Create new category
          const result = await createCategory({ categoryName: title });

          if (result.success) {
            await Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Category created successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => {
              router.push("/astro-puja/category");
            }, 1600);
          } else {
            await Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: result.message || 'Failed to create category',
              confirmButtonColor: '#d33',
            });
          }
        }
      } catch (error) {
        console.error('Error submitting category:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Network Error!',
          text: 'Please check your connection and try again.',
          confirmButtonColor: '#d33',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg text-gray-600">Loading category data...</div>
        </div>
      </div>
    );
  }

  // ✅ Return JSX here
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {editMode ? 'Edit Category' : 'Add Category'}
          </h2>
          <button 
            onClick={() => router.push("/astro-puja/category")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition duration-200"
          >
            Display
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={inputFieldDetail.title}
              onChange={handleInputField}
              onFocus={() => handleInputFieldError("title", "")}
              placeholder="Enter category name"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                inputFieldError.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {inputFieldError.title && (
              <p className="text-red-500 text-sm mt-1">{inputFieldError.title}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {editMode ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              editMode ? 'Update Category' : 'Create Category'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ✅ Wrap with Suspense for loading fallback
const AddCategory = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      }
    >
      <AddCategoryReview />
    </Suspense>
  );
};

export default AddCategory;