'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Grid, TextField } from '@mui/material';
import { Color } from '@/assets/colors';

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
// Component
// ---------------------------------------------------------------------
const AddEditCategoryPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  const isEditMode = Boolean(categoryId);

  const [inputFieldDetail, setInputFieldDetail] = useState<InputFieldDetail>({
    title: '',
  });
  const [inputFieldError, setInputFieldError] = useState<InputFieldError>({});
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Category Data (for Edit Mode)
  const fetchCategoryData = async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/astro-blog/category/${categoryId}`);
      if (!res.ok) throw new Error('Failed to fetch category');
      const data = await res.json();
      
      setInputFieldDetail({
        title: data.category?.blog_category || '',
      });
    } catch (error) {
      console.error('Error fetching category:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      fetchCategoryData();
    }
  }, [categoryId]);

  // ✅ Handle Input Field Error
  const handleInputFieldError = (input: keyof InputFieldError, value: string | null) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value ?? undefined }));
  };

  // ✅ Handle Input Field Data
  const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFieldDetail((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Validation
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

  // ✅ Handle Submit - Creating/Updating Category
  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (!handleValidation()) return;

    const { title } = inputFieldDetail;

    try {
      setLoading(true);

      if (isEditMode) {
        // Update existing category
        const res = await fetch(`/api/astro-blog/category/${categoryId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blogCategoryId: categoryId,
            blogCategoryName: title,
          }),
        });

        if (!res.ok) throw new Error('Failed to update category');
      } else {
        // Create new category
        const res = await fetch('/api/astro-blog/category', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ blog_category: title }),
        });

        if (!res.ok) throw new Error('Failed to create category');
      }

      // Navigate back to category list
      router.push('/astro-blog/category');
    } catch (error) {
      console.error('Error submitting category:', error);
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
          {isEditMode ? 'Edit' : 'Add'} Blog Category
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

export default AddEditCategoryPage;