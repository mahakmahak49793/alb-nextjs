"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface LanguageDetail {
    title: string;
}

interface InputFieldError {
    title?: string;
}

interface LanguageData {
    _id: string;
    languageName: string;
}

// Regex pattern for alphabetic characters
const Regex_Accept_Alpha = /^[A-Za-z\s]+$/;

const AddLanguage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [editData, setEditData] = useState<LanguageData | null>(null);
    const [mode, setMode] = useState<string>("Add");
    const [languageDetail, setLanguageDetail] = useState<LanguageDetail>({ title: '' });
    const [inputFieldError, setInputFieldError] = useState<InputFieldError>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });
    const [isMounted, setIsMounted] = useState(false);

    // Initialize component
    useEffect(() => {
        setIsMounted(true);
        
        const editDataParam = searchParams.get('editData');
        if (editDataParam) {
            try {
                const parsedData = JSON.parse(editDataParam);
                setEditData(parsedData);
                setMode("Edit");
                setLanguageDetail({ title: parsedData.languageName || '' });
            } catch (err) {
                console.error("Error parsing edit data:", err);
            }
        }
    }, [searchParams]);

    // Show notification
    const showNotificationMessage = (type: string, message: string) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: '', message: '' });
        }, 3000);
    };

    // Handle Input Field Error
    const handleInputFieldError = (input: string, value: string | null) => {
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

    // Handle Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!handleValidation()) {
            return;
        }

        setIsSubmitting(true);
        const { title } = languageDetail;

        try {
            if (editData) {
                // Update existing language
                const response = await fetch('/api/admin/update-language', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        langId: editData._id,
                        languageName: title
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update language');
                }

                const data = await response.json();

                if (data.success) {
                    showNotificationMessage('success', 'Language updated successfully');
                    setTimeout(() => {
                        router.push("/language");
                    }, 1000);
                } else {
                    throw new Error(data.message || 'Failed to update language');
                }
            } else {
                // Create new language
                const response = await fetch('/api/admin/create-language', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        languageName: title
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create language');
                }

                const data = await response.json();

                if (data.success) {
                    showNotificationMessage('success', 'Language created successfully');
                    setTimeout(() => {
                        router.push("/language");
                    }, 1000);
                } else {
                    throw new Error(data.message || 'Failed to create language');
                }
            }
        } catch (err) {
            console.error('Error submitting language:', err);
            showNotificationMessage('error', err instanceof Error ? err.message : 'Failed to submit language');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) {
        return (
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ fontSize: "22px", fontWeight: "500" }}>Loading...</div>
            </div>
        );
    }

    return (
        <>
            {/* Notification */}
            {notification.show && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
                    notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}>
                    {notification.message}
                </div>
            )}

            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: "#000" }}>
                        {mode} Language
                    </div>
                    <div 
                        onClick={() => router.push("/language")} 
                        style={{ fontWeight: "500", backgroundColor: "#EF4444", color: "#fff", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}
                    >
                        Display
                    </div>
                </div>

                <div style={{ display: "grid", gap: "24px" }}>
                    <div style={{ width: "100%" }}>
                        <div style={{ marginBottom: "8px" }}>
                            <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                                Title <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={languageDetail.title}
                                onChange={handleInputField}
                                onFocus={() => handleInputFieldError("title", null)}
                                style={{
                                    width: "100%",
                                    padding: "16.5px 14px",
                                    fontSize: "16px",
                                    border: inputFieldError.title ? "1px solid #D32F2F" : "1px solid #d1d5db",
                                    borderRadius: "4px",
                                    outline: "none",
                                    backgroundColor: "#fff",
                                    transition: "border-color 0.2s"
                                }}
                                onFocusCapture={(e) => {
                                    if (!inputFieldError.title) {
                                        e.currentTarget.style.borderColor = "#1976d2";
                                    }
                                }}
                                onBlurCapture={(e) => {
                                    if (!inputFieldError.title) {
                                        e.currentTarget.style.borderColor = "#d1d5db";
                                    }
                                }}
                            />
                            {inputFieldError.title && (
                                <div style={{ color: "#D32F2F", fontSize: "12px", marginTop: "4px", marginLeft: "14px", fontWeight: "400" }}>
                                    {inputFieldError.title}
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div 
                                onClick={handleSubmit} 
                                style={{ 
                                    fontWeight: "500", 
                                    backgroundColor: isSubmitting ? "#9CA3AF" : "#EF4444", 
                                    color: "#fff", 
                                    padding: "10px 20px", 
                                    borderRadius: "5px", 
                                    cursor: isSubmitting ? "not-allowed" : "pointer", 
                                    fontSize: "15px",
                                    opacity: isSubmitting ? 0.5 : 1
                                }}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddLanguage;