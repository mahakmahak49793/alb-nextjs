'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Grid,
  TextField,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Color } from '@/assets/colors';
import { base_url } from '@/lib/api-routes';
import { UploadImageSvg } from '@/components/svgs/page';

// Dynamically import MDEditor with proper TypeScript typing
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { 
    ssr: false,
    loading: () => (
      <div style={{ 
        minHeight: '400px', 
        border: '1px solid #ccc', 
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666'
      }}>
        Loading editor...
      </div>
    )
  }
);

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------
interface BlogCategory {
  _id: string;
  blog_category: string;
}

interface Blog {
  _id: string;
  title: string;
  created_by: string;
  blogCategoryId: {
    _id: string;
    blog_category: string;
  };
  description: string;
  image: string;
}

interface InputFieldDetail {
  title: string;
  created_by: string;
  categoryId: string;
}

interface InputFieldError {
  title?: string;
  created_by?: string;
  categoryId?: string;
  description?: string;
  image?: string;
}

interface ImageState {
  file: string;
  bytes: File | string;
}

// ---------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------
const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || '/uploads/';
const Regex_Accept_Alpha = /^[a-zA-Z\s]+$/;

// ---------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------
const AddEditBlogContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get('id');
  const isEditMode = Boolean(blogId);

  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [inputFieldDetail, setInputFieldDetail] = useState<InputFieldDetail>({
    title: '',
    created_by: '',
    categoryId: '',
  });
  const [description, setDescription] = useState<string>('');
  const [inputFieldError, setInputFieldError] = useState<InputFieldError>({});
  const [image, setImage] = useState<ImageState>({
    file: '',
    bytes: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

  // ✅ Fetch Categories
  const fetchCategories = async (): Promise<void> => {
    try {
      const res = await fetch(`${base_url}api/admin/blog-category-list`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data.categoryBlog
 || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // ✅ Fetch Blog Data (for Edit Mode)
  const fetchBlogData = async (): Promise<void> => {
    if (!blogId) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/astro-blog/blog/${blogId}`);
      if (!res.ok) throw new Error('Failed to fetch blog');
      const data = await res.json();
      const blog: Blog = data.blog;

      setInputFieldDetail({
        title: blog.title || '',
        created_by: blog.created_by || '',
        categoryId: blog.blogCategoryId?._id || '',
      });

      // Set description
      if (blog.description) {
        setDescription(blog.description);
      }

      // Set image
      if (blog.image) {
        setImage({
          file: `${IMG_URL}${blog.image}`,
          bytes: '',
        });
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    if (isEditMode) {
      fetchBlogData();
    }
  }, [blogId, isEditMode]);

  // ✅ Handle Input Field Error
  const handleInputFieldError = (
    input: keyof InputFieldError,
    value: string | null
  ): void => {
    setInputFieldError((prev) => ({ ...prev, [input]: value ?? undefined }));
  };

  // ✅ Handle Input Field Data
  const handleInputField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setInputFieldDetail((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Select Change
  const handleSelectChange = (event: SelectChangeEvent<string>): void => {
    const { name, value } = event.target;
    setInputFieldDetail((prev) => ({ ...prev, [name as string]: value }));
  };

  // ✅ Handle Image Upload
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size < 1 * 1024 * 1024) {
        setImage({
          file: URL.createObjectURL(file),
          bytes: file,
        });
      } else {
        alert('Please upload images having size less than 1 MB');
      }
    }
    handleInputFieldError('image', null);
  };

  // ✅ Handle Drag and Drop
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.size < 1 * 1024 * 1024) {
        setImage({
          file: URL.createObjectURL(file),
          bytes: file,
        });
      } else {
        alert('Please upload images having size less than 1 MB');
      }
    }
    handleInputFieldError('image', null);
  };

  // ✅ Handle Validation
  const handleValidation = (): boolean => {
    let isValid = true;
    const { title, created_by, categoryId } = inputFieldDetail;
    const { file } = image;

    // Title validation
    if (!title.trim()) {
      handleInputFieldError('title', 'Please Enter Title');
      isValid = false;
    } else if (!Regex_Accept_Alpha.test(title)) {
      handleInputFieldError('title', 'Please Enter Valid Title (letters and spaces only)');
      isValid = false;
    } else {
      handleInputFieldError('title', null);
    }

    // Author validation
    if (!created_by.trim()) {
      handleInputFieldError('created_by', 'Please Enter Author Name');
      isValid = false;
    } else if (!Regex_Accept_Alpha.test(created_by)) {
      handleInputFieldError('created_by', 'Please Enter Valid Author Name (letters and spaces only)');
      isValid = false;
    } else {
      handleInputFieldError('created_by', null);
    }

    // Category validation
    if (!categoryId) {
      handleInputFieldError('categoryId', 'Please Select Category');
      isValid = false;
    } else {
      handleInputFieldError('categoryId', null);
    }

    // Description validation
    if (!description.trim()) {
      handleInputFieldError('description', 'Please Enter Description');
      isValid = false;
    } else {
      handleInputFieldError('description', null);
    }

    // Image validation
    if (!file) {
      handleInputFieldError('image', 'Please Upload Image');
      isValid = false;
    } else {
      handleInputFieldError('image', null);
    }

    return isValid;
  };

  // ✅ Handle Submit
  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();

    if (!handleValidation()) return;

    const { title, created_by, categoryId } = inputFieldDetail;
    const formData = new FormData();

    formData.append('title', title.trim());
    formData.append('created_by', created_by.trim());
    formData.append('blogCategoryId', categoryId);
    formData.append('description', description.trim());

    // Only append image if it's a new file (not a URL string)
    if (image.bytes && typeof image.bytes !== 'string') {
      formData.append('image', image.bytes);
    }

    // Add blogId for edit mode
    if (isEditMode && blogId) {
      formData.append('blogId', blogId);
    }

    try {
      setLoading(true);

      const url = isEditMode ? `/api/astro-blog/blog/${blogId}` : '/api/astro-blog/blog';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to ${isEditMode ? 'update' : 'create'} blog`);
      }

      // Navigate back to blog list
      router.push('/astro-blog/blog');
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit blog. Please try again.');
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
          {isEditMode ? 'Edit' : 'Add'} Astroblog
        </div>
        <div
          onClick={() => router.push('/astro-blog/blog')}
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
        {/* Image Upload */}
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <div
            style={{
              color: '#000',
              border: '1px solid #C4C4C4',
              borderRadius: '3px',
            }}
          >
            {image.file ? (
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                htmlFor="upload-image"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src={image.file}
                  style={{
                    height: '300px',
                    width: '300px',
                    borderRadius: 'initial',
                  }}
                />
              </label>
            ) : (
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                htmlFor="upload-image"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '100px 0',
                  cursor: 'pointer',
                }}
              >
                <UploadImageSvg h="80" w="80" color="#C4C4C4" />
                <div style={{ fontWeight: '600', fontSize: '18px' }}>
                  Choose Your Image to Upload
                </div>
                <div style={{ fontWeight: '500', fontSize: '16px', color: 'grey' }}>
                  Or Drop Your Image Here
                </div>
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
          {inputFieldError.image && (
            <div
              style={{
                color: '#D32F2F',
                fontSize: '12.5px',
                padding: '10px 0 0 12px',
              }}
            >
              {inputFieldError.image}
            </div>
          )}
        </Grid>

        {/* Title */}
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

        {/* Category */}
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <FormControl fullWidth error={!!inputFieldError.categoryId}>
            <InputLabel id="select-label">
              Select Category Name<span style={{ color: 'red' }}>* </span>
            </InputLabel>
            <Select
              label="Select Category Name * "
              variant="outlined"
              fullWidth
              name="categoryId"
              value={inputFieldDetail.categoryId}
              onChange={handleSelectChange}
              onFocus={() => handleInputFieldError('categoryId', null)}
              disabled={loading}
            >
              <MenuItem disabled value="">
                ---Select Category Name---
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.blog_category}
                </MenuItem>
              ))}
            </Select>
            {inputFieldError.categoryId && (
              <div
                style={{
                  color: '#D32F2F',
                  fontSize: '12px',
                  padding: '3px 14px 0',
                }}
              >
                {inputFieldError.categoryId}
              </div>
            )}
          </FormControl>
        </Grid>

        {/* Author */}
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField
            label={
              <>
                Author <span style={{ color: 'red' }}>*</span>
              </>
            }
            variant="outlined"
            fullWidth
            name="created_by"
            value={inputFieldDetail.created_by}
            onChange={handleInputField}
            error={!!inputFieldError.created_by}
            helperText={inputFieldError.created_by}
            onFocus={() => handleInputFieldError('created_by', null)}
            disabled={loading}
          />
        </Grid>

        {/* Rich Text Editor */}
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <div data-color-mode="light">
            {editorLoaded ? (
              <MDEditor
                value={description}
                onChange={(value?: string) => setDescription(value || '')}
                height={400}
                preview="edit"
                onFocus={() => handleInputFieldError('description', null)}
              />
            ) : (
              <div style={{ 
                minHeight: '400px', 
                border: '1px solid #ccc', 
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666'
              }}>
                Loading editor...
              </div>
            )}
          </div>
          {inputFieldError.description && (
            <div
              style={{
                color: '#D32F2F',
                fontSize: '13px',
                padding: '5px 15px 0 12px',
                fontWeight: '400',
              }}
            >
              {inputFieldError.description}
            </div>
          )}
        </Grid>

        {/* Submit Button */}
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

const AddEditBlogClient = () => {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <AddEditBlogContent />
    </Suspense>
  );
};

export default AddEditBlogClient;