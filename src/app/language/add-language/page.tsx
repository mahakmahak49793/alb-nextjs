'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface LanguageDetail {
    title: string;
}

interface InputFieldError {
    title: string;
}

interface Notification {
    show: boolean;
    type: 'success' | 'error' | '';
    message: string;
}

function AddLanguageReview() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const editMode = searchParams.get('edit') === 'true';
    const languageId = searchParams.get('id');
    const languageNameFromUrl = searchParams.get('name');

    const [languageDetail, setLanguageDetail] = useState<LanguageDetail>({
        title: languageNameFromUrl ? decodeURIComponent(languageNameFromUrl) : ''
    });
    const [inputFieldError, setInputFieldError] = useState<InputFieldError>({
        title: ''
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(editMode && !languageNameFromUrl);
    const [notification, setNotification] = useState<Notification>({
        show: false,
        type: '',
        message: ''
    });

    // Show notification
    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: '', message: '' });
        }, 3000);
    };

    // Fetch language data if in edit mode and name not in URL
    useEffect(() => {
        const fetchLanguageData = async () => {
            if (editMode && languageId && !languageNameFromUrl) {
                try {
                    setFetching(true);
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_language/${languageId}`
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch language');
                    }

                    const data = await response.json();

                    if (data.success && data.data) {
                        setLanguageDetail({ title: data.data.languageName });
                    } else {
                        showNotification('error', data.message || 'Failed to fetch language data');
                    }
                } catch (error) {
                    console.error('Error fetching language:', error);
                    showNotification('error', 'Error fetching language data');
                } finally {
                    setFetching(false);
                }
            }
        };

        fetchLanguageData();
    }, [editMode, languageId, languageNameFromUrl]);

    //* Handle Input Field : Error
    const handleInputFieldError = (input: keyof InputFieldError, value: string) =>
        setInputFieldError((prev) => ({ ...prev, [input]: value }));

    //* Handle Input Field : Data
    const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLanguageDetail({ ...languageDetail, [event.target.name]: event.target.value });
        // Clear error when user starts typing
        if (inputFieldError.title) {
            handleInputFieldError("title", "");
        }
    };

    // Regex pattern for validation
    const Regex_Accept_Alpha = /^[A-Za-z\s]+$/;

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { title } = languageDetail;

        // Reset errors
        handleInputFieldError("title", "");

        if (!title.trim()) {
            handleInputFieldError("title", "Please Enter Language Name");
            isValid = false;
        } else if (!Regex_Accept_Alpha.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Language Name (Only letters and spaces allowed)");
            isValid = false;
        } else if (title.length > 50) {
            handleInputFieldError("title", "Please Enter Language Name Less Than 50 Letters");
            isValid = false;
        }

        return isValid;
    };

    // API call functions
    const createLanguage = async (languageData: { languageName: string }) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/create_language`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(languageData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    };

    const updateLanguage = async (languageData: { langId: string; languageName: string }) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/update_language`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(languageData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    };

    //! Handle Submit - Creating/Updating Language
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!handleValidation()) {
            return;
        }

        setLoading(true);
        const { title } = languageDetail;

        try {
            if (editMode && languageId) {
                // Update existing language
                const result = await updateLanguage({
                    langId: languageId,
                    languageName: title.trim(),
                });

                if (result.success) {
                    showNotification('success', 'Language updated successfully!');
                    setTimeout(() => {
                        router.push("/language");
                    }, 1500);
                } else {
                    showNotification('error', result.message || 'Failed to update language');
                }
            } else {
                // Create new language
                const result = await createLanguage({
                    languageName: title.trim()
                });

                if (result.success) {
                    showNotification('success', 'Language created successfully!');
                    setTimeout(() => {
                        router.push("/language");
                    }, 1500);
                } else {
                    showNotification('error', result.message || 'Failed to create language');
                }
            }
        } catch (error) {
            console.error('Error submitting language:', error);
            showNotification('error', 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push("/language");
    };

    const handleDisplay = () => {
        router.push("/language");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Notification */}
            {notification.show && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
                    notification.type === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                }`}>
                    <div className="flex items-center gap-2">
                        {notification.type === 'success' ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span>{notification.message}</span>
                    </div>
                </div>
            )}

            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">
                                {editMode ? 'Edit Language' : 'Add New Language'}
                            </h2>
                            <button
                                onClick={handleDisplay}
                                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 backdrop-blur-sm"
                            >
                                Display Languages
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {fetching ? (
                            <div className="text-center py-8">
                                <div className="inline-flex items-center gap-2 text-gray-600">
                                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                    Loading language data...
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Language Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={languageDetail.title}
                                        onChange={handleInputField}
                                        onFocus={() => handleInputFieldError("title", "")}
                                        placeholder="Enter language name"
                                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                                            inputFieldError.title
                                                ? 'border-red-500 focus:ring-red-200'
                                                : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                                        }`}
                                        disabled={loading}
                                    />
                                    {inputFieldError.title && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {inputFieldError.title}
                                        </p>
                                    )}
                                    <p className="text-gray-500 text-xs mt-2">
                                        Only letters and spaces allowed. Maximum 50 characters.
                                    </p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || fetching}
                                        className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                {editMode ? 'Updating...' : 'Creating...'}
                                            </>
                                        ) : (
                                            editMode ? 'Update Language' : 'Create Language'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ✅ Wrap with Suspense for loading fallback
const AddLanguage = () => {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center min-h-screen">
                    <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        Loading...
                    </div>
                </div>
            }
        >
            <AddLanguageReview />
        </Suspense>
    );
};

export default AddLanguage;