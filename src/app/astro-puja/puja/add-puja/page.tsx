'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, X, Plus } from 'lucide-react';
import type { PujaCategory, BulletSection, PujaFormData, PujaFormErrors, ImageState } from './types';

// Regex patterns
const Regex_Accept_Alpha = /^[a-zA-Z\s]+$/;
const Regex_Accept_Number = /^\d+$/;

const AddPuja = () => {
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

  // State Management
  const [pujaCategories, setPujaCategories] = useState<PujaCategory[]>([]);
  const [inputFieldDetail, setInputFieldDetail] = useState<PujaFormData>({
    categoryId: '',
    pujaName: '',
    pujaPrice: '',
    pujaCommissionPrice: '',
  });
  const [inputFieldError, setInputFieldError] = useState<PujaFormErrors>({});
  const [image, setImage] = useState<ImageState>({ file: '', bytes: null });
  const [sections, setSections] = useState<BulletSection[]>([
    { heading: '', bulletPoint: [''] },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch Puja Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/puja/get_puja_category`);
        const data = await response.json();
        if (data.success) {
          setPujaCategories(data.results);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [API_BASE_URL]);

  // Handle Input Field Error
  const handleInputFieldError = (input: keyof PujaFormErrors, value: string | undefined) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value }));
  };

  // Handle Input Field Change
  const handleInputField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    handleInputFieldError(name as keyof PujaFormErrors, undefined);
  };

  // Handle Image Upload
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage({
        file: URL.createObjectURL(file),
        bytes: file,
      });
      handleInputFieldError('image', undefined);
    }
  };

  // Handle Drag and Drop
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setImage({
        file: URL.createObjectURL(file),
        bytes: file,
      });
      handleInputFieldError('image', undefined);
    }
  };

  // Dynamic Section Handlers
  const handleAddNewSection = () => {
    setSections([...sections, { heading: '', bulletPoint: [''] }]);
  };

  const handleSectionHeading = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index].heading = value;
    setSections(updatedSections);
  };

  const handleChangeBulletPoint = (sectionIndex: number, bulletIndex: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].bulletPoint[bulletIndex] = value;
    setSections(updatedSections);
  };

  const handleAddBulletPoint = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].bulletPoint.push('');
    setSections(updatedSections);
  };

  const handleRemoveBulletPoint = (sectionIndex: number, bulletIndex: number) => {
    if (bulletIndex === 0) return;
    const updatedSections = [...sections];
    updatedSections[sectionIndex].bulletPoint.splice(bulletIndex, 1);
    setSections(updatedSections);
  };

  // Validation
  const handleValidation = (): boolean => {
    let isValid = true;
    const errors: PujaFormErrors = {};
    const { categoryId, pujaName, pujaPrice, pujaCommissionPrice } = inputFieldDetail;

    if (!categoryId) {
      errors.categoryId = 'Please Select Category';
      isValid = false;
    }
    if (!pujaName) {
      errors.pujaName = 'Please Enter Puja Name';
      isValid = false;
    } else if (!Regex_Accept_Alpha.test(pujaName)) {
      errors.pujaName = 'Please Enter Valid Puja Name (Letters Only)';
      isValid = false;
    }
    if (!pujaPrice) {
      errors.pujaPrice = 'Please Enter Puja Price';
      isValid = false;
    } else if (Number(pujaPrice) <= 0) {
      errors.pujaPrice = 'Please Enter Valid Puja Price (Greater Than 0)';
      isValid = false;
    } else if (!Regex_Accept_Number.test(pujaPrice)) {
      errors.pujaPrice = 'Please Enter Valid Puja Price (Numbers Only)';
      isValid = false;
    }
    if (!pujaCommissionPrice) {
      errors.pujaCommissionPrice = 'Please Enter Commission Price';
      isValid = false;
    } else if (Number(pujaCommissionPrice) <= 0) {
      errors.pujaCommissionPrice = 'Please Enter Valid Commission Price (Greater Than 0)';
      isValid = false;
    } else if (!Regex_Accept_Number.test(pujaCommissionPrice)) {
      errors.pujaCommissionPrice = 'Please Enter Valid Commission Price (Numbers Only)';
      isValid = false;
    }
    if (!image.bytes) {
      errors.image = 'Please Select Image';
      isValid = false;
    }

    setInputFieldError(errors);
    return isValid;
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!handleValidation()) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('categoryId', inputFieldDetail.categoryId);
      formData.append('pujaName', inputFieldDetail.pujaName);
      formData.append('price', inputFieldDetail.pujaPrice);
      formData.append('adminCommission', inputFieldDetail.pujaCommissionPrice);
      
      const filteredSections = sections.filter((section) => section.heading !== '');
      formData.append('about', JSON.stringify(filteredSections));
      
      if (image.bytes) {
        formData.append('image', image.bytes);
      }

      const response = await fetch(`${API_BASE_URL}/api/puja/create_puja`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert('Puja created successfully!');
        router.push('/astro-puja/puja');
      } else {
        alert('Failed to create puja. Please try again.');
      }
    } catch (error) {
      console.error('Error creating puja:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 bg-white mb-5 shadow-md rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Add Puja</h1>
        <button
          onClick={() => router.push('/astro-puja/puja')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Display
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label
              htmlFor="upload-image"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragging
                  ? 'border-red-500 bg-red-50'
                  : image.file
                  ? 'border-gray-300'
                  : 'border-gray-300 hover:border-gray-400'
              } ${image.file ? 'p-5' : 'py-24'}`}
            >
              {image.file ? (
                <div className="relative w-full max-w-md">
                  <Image
                    src={image.file}
                    alt="Preview"
                    width={500}
                    height={300}
                    className="rounded-lg object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center">
                  <Upload className="w-20 h-20 text-gray-400" />
                  <div className="text-lg font-semibold text-gray-700">
                    Choose Your Image to Upload
                  </div>
                  <div className="text-base text-gray-500">Or Drop Your Image Here</div>
                </div>
              )}
            </label>
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
            {inputFieldError.image && (
              <p className="text-red-600 text-sm mt-2 ml-3">{inputFieldError.image}</p>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Select */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                Select Category Name <span className="text-red-600">*</span>
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={inputFieldDetail.categoryId}
                onChange={handleInputField}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all ${
                  inputFieldError.categoryId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">---Select Category Name---</option>
                {pujaCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {inputFieldError.categoryId && (
                <p className="text-red-600 text-xs mt-1 ml-3">{inputFieldError.categoryId}</p>
              )}
            </div>

            {/* Puja Name */}
            <div>
              <label htmlFor="pujaName" className="block text-sm font-medium text-gray-700 mb-2">
                Puja Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="pujaName"
                name="pujaName"
                value={inputFieldDetail.pujaName}
                onChange={handleInputField}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all ${
                  inputFieldError.pujaName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter puja name"
              />
              {inputFieldError.pujaName && (
                <p className="text-red-600 text-xs mt-1 ml-3">{inputFieldError.pujaName}</p>
              )}
            </div>

            {/* Puja Price */}
            <div>
              <label htmlFor="pujaPrice" className="block text-sm font-medium text-gray-700 mb-2">
                Puja Price <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="pujaPrice"
                name="pujaPrice"
                value={inputFieldDetail.pujaPrice}
                onChange={handleInputField}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all ${
                  inputFieldError.pujaPrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter puja price"
              />
              {inputFieldError.pujaPrice && (
                <p className="text-red-600 text-xs mt-1 ml-3">{inputFieldError.pujaPrice}</p>
              )}
            </div>

            {/* Commission Price */}
            <div>
              <label
                htmlFor="pujaCommissionPrice"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Puja Commission Price (%) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="pujaCommissionPrice"
                name="pujaCommissionPrice"
                value={inputFieldDetail.pujaCommissionPrice}
                onChange={handleInputField}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all ${
                  inputFieldError.pujaCommissionPrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter commission percentage"
              />
              {inputFieldError.pujaCommissionPrice && (
                <p className="text-red-600 text-xs mt-1 ml-3">
                  {inputFieldError.pujaCommissionPrice}
                </p>
              )}
            </div>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border border-gray-200 rounded-lg p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading {sectionIndex + 1}
                </label>
                <input
                  type="text"
                  value={section.heading}
                  onChange={(e) => handleSectionHeading(sectionIndex, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  placeholder="Enter section heading"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.bulletPoint.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bullet Point {bulletIndex + 1}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) =>
                          handleChangeBulletPoint(sectionIndex, bulletIndex, e.target.value)
                        }
                        className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        placeholder={`Enter bullet point ${bulletIndex + 1}`}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        {bulletIndex === 0 && (
                          <button
                            type="button"
                            onClick={() => handleAddBulletPoint(sectionIndex)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Plus size={20} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveBulletPoint(sectionIndex, bulletIndex)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            bulletIndex === 0
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                          disabled={bulletIndex === 0}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>

            <button
              type="button"
              onClick={handleAddNewSection}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Add New Section
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPuja;
