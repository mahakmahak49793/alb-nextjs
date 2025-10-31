'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, TextField, CircularProgress, Box } from '@mui/material';
import { Color } from '@/assets/colors';
import { base_url } from '@/lib/api-routes';
import Swal from 'sweetalert2';

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------
interface BlogCategory {
  _id: string;
  blog_category: string;
}

interface InputFieldDetail {
  title: string;
}

interface InputFieldError {
  title?: string;
}

// ---------------------------------------------------------------------
// Regex Pattern
// ---------------------------------------------------------------------
const Regex_Accept_Everything = /^.+$/;

// ---------------------------------------------------------------------
// Content Component
// ---------------------------------------------------------------------
const AddEditCategoryContent: React.FC = () => {
  const router = useRouter();

  const [inputFieldDetail, setInputFieldDetail] = useState<InputFieldDetail>({
    title: '',
  });
  const [inputFieldError, setInputFieldError] = useState<InputFieldError>({});
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState<BlogCategory | null>(null);

  // Load from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('editBlogCategory');
    if (stored) {
      try {
        const category: BlogCategory = JSON.parse(stored);
        setEditCategory(category);
        setInputFieldDetail({ title: category.blog_category });
      } catch (error) {
        console.error('Failed to parse edit category:', error);
      } finally {
        sessionStorage.removeItem('editBlogCategory'); // Clean up
      }
    }
  }, []);

  // Handle Input Field Error
  const handleInputFieldError = (input: keyof InputFieldError, value: string | null) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value ?? undefined }));
  };

  // Handle Input Field Data
  const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFieldDetail((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Validation
  const handleValidation = (): boolean => {
    let isValid = true;
    const { title } = inputFieldDetail;

    if (!title) {
      handleInputFieldError('title', 'Please Enter Title');
      isValid = false;
    } else if (!Regex_Accept_Everything.test(title)) {
      handleInputFieldError('title', 'Please Enter Valid Title');
      isValid = false;
    } else if (title.toString().length > 70) {
      handleInputFieldError('title', 'Please Enter Title Less Than 70 Characters');
      isValid = false;
    } else {
      handleInputFieldError('title', null);
    }

    return isValid;
  };

  // Handle Submit
 // Handle Submit
const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
  e.preventDefault();

  if (!handleValidation()) return;

  const { title } = inputFieldDetail;

  try {
    setLoading(true);

    if (editCategory) {
      // UPDATE
      const res = await fetch(`${base_url}api/admin/update_blog_category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogCategoryId: editCategory._id,
          blogCategoryName: title,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update category');
      }

      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Category updated successfully!',
        confirmButtonColor: '#3085d6',
      });
    } else {
      // CREATE
      const res = await fetch(`${base_url}api/admin/add-blog-category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blog_category: title }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create category');
      }

      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Category created successfully!',
        confirmButtonColor: '#3085d6',
      });
    }

    router.push('/astro-blog/category');
  } catch (error: any) {
    console.error('Error submitting category:', error);
    await Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error.message || 'Something went wrong',
      confirmButtonColor: '#d33',
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#fff',
        marginBottom: '20px',
        boxShadow: '0px 0px 5px lightgrey',
        borderRadius: '10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ fontSize: '22px', fontWeight: '500', color: Color.black }}>
          {editCategory ? 'Edit' : 'Add'} Blog Category
        </div>
        <div
          onClick={() => router.push('/astro-blog/category')}
          style={{
            fontWeight: '500',
            backgroundColor: Color.primary,
            color: Color.white,
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Display
        </div>
      </div>

      <Grid container sx={{ alignItems: 'center' }} spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label={
              <>
                Title <span style={{ color: 'red' }}>*</span>
              </>
            }
            variant="outlined"
            fullWidth
            name="title"
            value={inputFieldDetail.title}
            onChange={handleInputField}
            error={!!inputFieldError.title}
            helperText={inputFieldError.title}
            onFocus={() => handleInputFieldError('title', null)}
            disabled={loading}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <div
              onClick={handleSubmit}
              style={{
                fontWeight: '500',
                backgroundColor: loading ? '#ccc' : Color.primary,
                color: Color.white,
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '15px',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

// ---------------------------------------------------------------------
// Main Component with Suspense
// ---------------------------------------------------------------------
const AddEditCategoryPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <AddEditCategoryContent />
    </Suspense>
  );
};

export default AddEditCategoryPage;