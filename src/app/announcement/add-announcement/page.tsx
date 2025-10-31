"use client";

import { useState, useEffect, useRef, Suspense } from "react";
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

    const [description, setDescription] = useState<string>(announcementDescriptionFromUrl ? decodeURIComponent(announcementDescriptionFromUrl) : '');
    const [inputFieldError, setInputFieldError] = useState<InputFieldError>({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(editMode && !announcementDescriptionFromUrl);
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });

    // Fetch announcement data if in edit mode and description is not in URL
    useEffect(() => {
        const fetchAnnouncementData = async () => {
            if (editMode && announcementId && !announcementDescriptionFromUrl) {
                try {
                    setFetching(true);
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-announcement/${announcementId}`);
                    const data = await response.json();
                    
                    if (data.success && data.data) {
                        setDescription(data.data.description || '');
                    }
                } catch (error) {
                    console.error('Error fetching announcement:', error);
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
        }
    };

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

    // Handle validation
    const handleValidation = () => {
        let isValid = true;

        if (!description || description.trim() === "" || description === "<br>" || description === "<div><br></div>") {
            handleInputFieldError("description", "Please Enter Description");
            isValid = false;
        }

        return isValid;
    };

    // API call functions
    const createAnnouncement = async (announcementData: { description: string }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-announcement`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(announcementData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating announcement:', error);
            throw error;
        }
    };

    const updateAnnouncement = async (announcementData: { announcementId: string; description: string }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-announcement`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(announcementData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating announcement:', error);
            throw error;
        }
    };

    // Handle Submit - Creating/Updating Announcement
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (handleValidation()) {
            setLoading(true);

            try {
                if (editMode && announcementId) {
                    // Update existing announcement
                    const result = await updateAnnouncement({
                        announcementId: announcementId,
                        description: description
                    });
                    
                    if (result.success) {
                        showNotificationMessage('success', 'Announcement updated successfully');
                        setTimeout(() => {
                            router.push("/announcement");
                        }, 1000);
                    } else {
                        console.error('Failed to update announcement:', result.message);
                        showNotificationMessage('error', result.message || 'Failed to update announcement');
                    }
                } else {
                    // Create new announcement
                    const result = await createAnnouncement({
                        description: description
                    });
                    
                    if (result.success) {
                        showNotificationMessage('success', 'Announcement added successfully');
                        setTimeout(() => {
                            router.push("/announcement");
                        }, 1000);
                    } else {
                        console.error('Failed to create announcement:', result.message);
                        showNotificationMessage('error', result.message || 'Failed to create announcement');
                    }
                }
            } catch (error) {
                console.error('Error submitting announcement:', error);
                showNotificationMessage('error', 'Failed to submit announcement');
            } finally {
                setLoading(false);
            }
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-gray-600">Loading announcement data...</div>
            </div>
        );
    }

    return (
        
        <>
         <Suspense fallback={<div>Loading...</div>}>
            {notification.show && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
                    notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}>
                    {notification.message}
                </div>
            )}

            <div className="p-5 bg-white mb-5 shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-8">
                    <div className="text-2xl font-medium text-black">
                        {editMode ? 'Edit' : 'Add'} Announcement
                    </div>
                    <button
                        onClick={() => router.push("/announcement")}
                        className="font-medium bg-[#EF4444] text-white py-2 px-4 rounded cursor-pointer text-sm hover:bg-[#DC2626] transition-colors"
                    >
                        Display
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        {/* Toolbar */}
                        <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-1">
                            <button
                                type="button"
                                onClick={() => execCommand('bold')}
                                className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
                                title="Bold"
                            >
                                B
                            </button>
                            <button
                                type="button"
                                onClick={() => execCommand('italic')}
                                className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 italic"
                                title="Italic"
                            >
                                I
                            </button>
                            <button
                                type="button"
                                onClick={() => execCommand('underline')}
                                className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 underline"
                                title="Underline"
                            >
                                U
                            </button>
                            <div className="w-px bg-gray-300 mx-1"></div>
                            <button
                                type="button"
                                onClick={() => execCommand('insertUnorderedList')}
                                className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                title="Bullet List"
                            >
                                • List
                            </button>
                            <button
                                type="button"
                                onClick={() => execCommand('insertOrderedList')}
                                className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                title="Numbered List"
                            >
                                1. List
                            </button>
                            <div className="w-px bg-gray-300 mx-1"></div>
                            <button
                                type="button"
                                onClick={() => execCommand('justifyLeft')}
                                className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                title="Align Left"
                            >
                                ≡
                            </button>
                            <button
                                type="button"
                                onClick={() => execCommand('justifyCenter')}
                                className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                title="Align Center"
                            >
                                ≡
                            </button>
                            <button
                                type="button"
                                onClick={() => execCommand('justifyRight')}
                                className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                title="Align Right"
                            >
                                ≡
                            </button>
                            <div className="w-px bg-gray-300 mx-1"></div>
                            <select
                                onChange={(e) => execCommand('fontSize', e.target.value)}
                                className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                title="Font Size"
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
                            />
                        </div>

                        {/* Editor */}
                        <div
                            ref={editorRef}
                            contentEditable
                            onInput={handleContentChange}
                            onFocus={() => handleInputFieldError("description", null)}
                            className="border border-t-0 border-gray-300 rounded-b-md p-4 bg-white outline-none"
                            style={{ minHeight: '50vh', maxHeight: '70vh', overflowY: 'auto' }}
                            suppressContentEditableWarning
                        />
                        
                        {inputFieldError?.description && (
                            <div className="text-red-600 text-sm pt-2 px-3 font-normal">
                                {inputFieldError.description}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-start">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`font-medium bg-[#EF4444] text-white py-2.5 px-6 rounded cursor-pointer text-base hover:bg-[#DC2626] transition-colors flex items-center gap-2 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
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