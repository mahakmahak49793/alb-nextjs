'use client';
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface InputFieldError {
    description?: string;
}

function AddAnnouncementContent(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const editorRef = useRef<HTMLDivElement>(null);
    
    // Get data from URL parameters
    const editMode = searchParams.get('edit') === 'true';
    const announcementId = searchParams.get('id');
    const announcementDescriptionFromUrl = searchParams.get('description');

    const [description, setDescription] = useState<string>(
        announcementDescriptionFromUrl ? decodeURIComponent(announcementDescriptionFromUrl) : ''
    );
    const [inputFieldError, setInputFieldError] = useState<InputFieldError>({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(editMode && !announcementDescriptionFromUrl);
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

    // Fetch announcement data if in edit mode and description is not in URL
    useEffect(() => {
        const fetchAnnouncementData = async () => {
            if (editMode && announcementId && !announcementDescriptionFromUrl) {
                try {
                    setFetching(true);
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-announcement/${announcementId}`
                    );
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch announcement');
                    }
                    
                    const data = await response.json();
                    
                    if (data.success && data.data) {
                        setDescription(data.data.description || '');
                    } else {
                        showNotification('error', data.message || 'Failed to fetch announcement data');
                    }
                } catch (error) {
                    console.error('Error fetching announcement:', error);
                    showNotification('error', 'Error fetching announcement data');
                } finally {
                    setFetching(false);
                }
            }
        };

        fetchAnnouncementData();
    }, [editMode, announcementId, announcementDescriptionFromUrl]);

    // Update editor content when description changes
    useEffect(() => {
        if (editorRef.current && description && editorRef.current.innerHTML !== description) {
            editorRef.current.innerHTML = description;
        }
    }, [description]);

    // Execute formatting command
    const execCommand = (command: string, value: string = '') => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            setDescription(editorRef.current.innerHTML);
        }
    };

    // Handle content change
    const handleContentChange = () => {
        if (editorRef.current) {
            setDescription(editorRef.current.innerHTML);
            // Clear error when user starts typing
            if (inputFieldError.description) {
                handleInputFieldError("description", undefined);
            }
        }
    };

    // Handle Input Field Error
    const handleInputFieldError = (input: keyof InputFieldError, value: string | undefined) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }));
    };

    // Handle validation
    const handleValidation = () => {
        let isValid = true;

        // Reset errors
        handleInputFieldError("description", undefined);

        if (!description || description.trim() === "" || description === "<br>" || description === "<div><br></div>") {
            handleInputFieldError("description", "Please Enter Description");
            isValid = false;
        }

        return isValid;
    };

    // API call functions
    const createAnnouncement = async (announcementData: { description: string }) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-announcement`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(announcementData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    };

    const updateAnnouncement = async (announcementData: { announcementId: string; description: string }) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-announcement`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(announcementData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    };

    // Handle Submit - Creating/Updating Announcement
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!handleValidation()) {
            return;
        }

        setLoading(true);

        try {
            if (editMode && announcementId) {
                // Update existing announcement
                const result = await updateAnnouncement({
                    announcementId: announcementId,
                    description: description
                });
                
                if (result.success) {
                    showNotification('success', 'Announcement updated successfully');
                    setTimeout(() => {
                        router.push("/announcement");
                    }, 1500);
                } else {
                    console.error('Failed to update announcement:', result.message);
                    showNotification('error', result.message || 'Failed to update announcement');
                }
            } else {
                // Create new announcement
                const result = await createAnnouncement({
                    description: description
                });
                
                if (result.success) {
                    showNotification('success', 'Announcement added successfully');
                    setTimeout(() => {
                        router.push("/announcement");
                    }, 1500);
                } else {
                    console.error('Failed to create announcement:', result.message);
                    showNotification('error', result.message || 'Failed to create announcement');
                }
            }
        } catch (error) {
            console.error('Error submitting announcement:', error);
            showNotification('error', 'Failed to submit announcement');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push("/announcement");
    };

    const handleDisplay = () => {
        router.push("/announcement");
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading announcement data...
                </div>
            </div>
        );
    }

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

            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">
                                {editMode ? 'Edit Announcement' : 'Add New Announcement'}
                            </h2>
                            <button
                                onClick={handleDisplay}
                                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 backdrop-blur-sm"
                            >
                                Display Announcements
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Announcement Description <span className="text-red-500">*</span>
                                </label>
                                
                                {/* Toolbar */}
                                <div className="border border-gray-300 rounded-t-md bg-gray-50 p-3 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => execCommand('bold')}
                                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold text-sm transition-colors"
                                        title="Bold"
                                        disabled={loading}
                                    >
                                        B
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => execCommand('italic')}
                                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 italic text-sm transition-colors"
                                        title="Italic"
                                        disabled={loading}
                                    >
                                        I
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => execCommand('underline')}
                                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 underline text-sm transition-colors"
                                        title="Underline"
                                        disabled={loading}
                                    >
                                        U
                                    </button>
                                    <div className="w-px bg-gray-300 mx-1"></div>
                                    <button
                                        type="button"
                                        onClick={() => execCommand('insertUnorderedList')}
                                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm transition-colors"
                                        title="Bullet List"
                                        disabled={loading}
                                    >
                                        • List
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => execCommand('insertOrderedList')}
                                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm transition-colors"
                                        title="Numbered List"
                                        disabled={loading}
                                    >
                                        1. List
                                    </button>
                                    <div className="w-px bg-gray-300 mx-1"></div>
                                    <button
                                        type="button"
                                        onClick={() => execCommand('justifyLeft')}
                                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm transition-colors"
                                        title="Align Left"
                                        disabled={loading}
                                    >
                                        ≡
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => execCommand('justifyCenter')}
                                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm transition-colors"
                                        title="Align Center"
                                        disabled={loading}
                                    >
                                        ≡
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => execCommand('justifyRight')}
                                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm transition-colors"
                                        title="Align Right"
                                        disabled={loading}
                                    >
                                        ≡
                                    </button>
                                    <div className="w-px bg-gray-300 mx-1"></div>
                                    <select
                                        onChange={(e) => execCommand('fontSize', e.target.value)}
                                        className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm transition-colors"
                                        title="Font Size"
                                        disabled={loading}
                                    >
                                        <option value="3">Normal</option>
                                        <option value="1">Small</option>
                                        <option value="2">Medium</option>
                                        <option value="4">Large</option>
                                        <option value="5">Extra Large</option>
                                        <option value="6">Huge</option>
                                    </select>
                                    <input
                                        type="color"
                                        onChange={(e) => execCommand('foreColor', e.target.value)}
                                        className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                                        title="Text Color"
                                        disabled={loading}
                                    />
                                </div>

                                {/* Editor */}
                                <div
                                    ref={editorRef}
                                    contentEditable={!loading}
                                    onInput={handleContentChange}
                                    onFocus={() => handleInputFieldError("description", undefined)}
                                    className={`border border-t-0 border-gray-300 rounded-b-md p-4 bg-white outline-none transition-colors ${
                                        inputFieldError.description ? 'border-red-500' : ''
                                    } ${loading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                    style={{ minHeight: '300px', maxHeight: '500px', overflowY: 'auto' }}
                                    suppressContentEditableWarning
                                />
                                
                                {inputFieldError.description && (
                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {inputFieldError.description}
                                    </p>
                                )}
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
                                    onClick={handleSubmit}
                                    disabled={loading || fetching}
                                    className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            {editMode ? 'Updating...' : 'Creating...'}
                                        </>
                                    ) : (
                                        editMode ? 'Update Announcement' : 'Create Announcement'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ✅ Wrap with Suspense for loading fallback
const AddAnnouncement = () => {
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
            <AddAnnouncementReview />
        </Suspense>
        </>
    );
};
const AddAnnouncement = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="text-xl text-gray-600">Loading...</div></div>}>
      <AddAnnouncementContent />
    </Suspense>
  );
};


export default AddAnnouncement;