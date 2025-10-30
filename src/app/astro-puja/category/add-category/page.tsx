'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
          }
        } catch (error) {
          console.error('Error fetching category:', error);
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
    } else if (!Regex_Accept_Alpha_Dot_Comma_Space.test(title)) {
      handleInputFieldError("title", "Please Enter Valid Title");
      isValid = false;
    } else if (title.length > 70) {
      handleInputFieldError("title", "Please Enter Title Less Than 70 Letters");
      isValid = false;
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
            router.push("/astro-puja/category");
          } else {
            console.error('Failed to update category:', result.message);
          }
        } else {
          // Create new category
          const result = await createCategory({ categoryName: title });

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

  // ✅ Return JSX here
  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-lg font-semibold mb-4">
        {editMode ? 'Edit Category' : 'Add Category'}
      </h2>

      {fetching ? (
        <div className="text-gray-500 text-center py-10">Fetching category...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={inputFieldDetail.title}
              onChange={handleInputField}
              placeholder="Enter category name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-red-500 focus:outline-none"
            />
            {inputFieldError.title && (
              <p className="text-sm text-red-500 mt-1">{inputFieldError.title}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition"
          >
            {loading ? 'Saving...' : editMode ? 'Update Category' : 'Create Category'}
          </button>
        </form>
      )}
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
