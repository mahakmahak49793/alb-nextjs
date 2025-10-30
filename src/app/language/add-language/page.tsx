"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface LanguageDetail {
    title: string;
}

interface InputFieldError {
    title?: string;
}

// Regex pattern for alphabetic characters
const Regex_Accept_Alpha = /^[A-Za-z\s]+$/;

const AddLanguageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Get data from URL parameters
    const editMode = searchParams.get('edit') === 'true';
    const languageId = searchParams.get('id');
    const languageName = searchParams.get('name');

    const [languageDetail, setLanguageDetail] = useState<LanguageDetail>({ 
        title: languageName ? decodeURIComponent(languageName) : '' 
    });
    const [inputFieldError, setInputFieldError] = useState<InputFieldError>({});
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });

    // Show notification
    const showNotificationMessage = (type: string, message: string) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: '', message: '' });
        }, 3000);
    };

    // Handle Input Field Error
    const handleInputFieldError = (input: keyof InputFieldError, value: string) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }));
    };

    // Handle Input Field Data
    const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLanguageDetail({ ...languageDetail, [name]: value });
    };

    // Handle validation
    const handleValidation = () => {
        let isValid = true;
        const { title } = languageDetail;

        if (!title) {
            handleInputFieldError("title", "Please Enter Title");
            isValid = false;
        } else if (!Regex_Accept_Alpha.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Title");
            isValid = false;
        }

        return isValid;
    };

    // API call functions
    const createLanguage = async (languageData: { languageName: string }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/create_language`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(languageData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating language:', error);
            throw error;
        }
    };

    // Updated updateLanguage function to match API expected fields
    const updateLanguage = async (languageData: { langId: string; languageName: string }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/update_language`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(languageData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating language:', error);
            throw error;
        }
    };

    // Handle Submit - Creating/Updating Language
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (handleValidation()) {
            setLoading(true);
            const { title } = languageDetail;

            try {
                if (editMode && languageId) {
                    // Update existing language - using correct field names
                    const result = await updateLanguage({
                        langId: languageId,  // Changed from languageId to langId
                        languageName: title
                    });
                    
                    if (result.success) {
                        showNotificationMessage('success', 'Language updated successfully');
                        setTimeout(() => {
                            router.push("/language");
                        }, 1000);
                    } else {
                        console.error('Failed to update language:', result.message);
                        showNotificationMessage('error', result.message || 'Failed to update language');
                    }
                } else {
                    // Create new language
                    const result = await createLanguage({
                        languageName: title
                    });
                    
                    if (result.success) {
                        showNotificationMessage('success', 'Language created successfully');
                        setTimeout(() => {
                            router.push("/language");
                        }, 1000);
                    } else {
                        console.error('Failed to create language:', result.message);
                        showNotificationMessage('error', result.message || 'Failed to create language');
                    }
                }
            } catch (error) {
                console.error('Error submitting language:', error);
                showNotificationMessage('error', 'Failed to submit language');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
         
        <>
        <Suspense fallback={<div>Loading...</div>}>
            {/* Notification */}
            {notification.show && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
                    notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}>
                    {notification.message}
                </div>
            )}

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-xl font-semibold text-gray-800">
                            {editMode ? 'Edit' : 'Add'} Language
                        </div>
                        <button 
                            onClick={() => router.push("/language")}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition duration-200"
                        >
                            Display
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Language Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={languageDetail.title}
                                onChange={handleInputField}
                                onFocus={() => handleInputFieldError("title", "")}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    inputFieldError.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter language name"
                            />
                            {inputFieldError.title && (
                                <p className="text-red-500 text-sm mt-1">{inputFieldError.title}</p>
                            )}
                        </div>

                        <div className="flex justify-start">
                            <button 
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg cursor-pointer font-medium transition duration-200 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {editMode ? 'Updating...' : 'Submitting...'}
                                    </>
                                ) : (
                                    editMode ? 'Update' : 'Submit'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
       
        </Suspense>
         </>
    );
};

const AddLanguage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-600 text-lg">Loading...</div>
        </div>
      </div>
    }>
      <AddLanguageContent />
    </Suspense>
  );
};

export default AddLanguage;