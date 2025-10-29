"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface InputFieldError {
    description?: string;
}

interface AnnouncementData {
    _id: string;
    description: string;
}

const AddAnnouncement = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editorRef = useRef<HTMLDivElement>(null);
    const [editData, setEditData] = useState<AnnouncementData | null>(null);
    const [mode, setMode] = useState<string>("Add");
    const [description, setDescription] = useState<string>("");
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
                setDescription(parsedData.description || "");
            } catch (err) {
                console.error("Error parsing edit data:", err);
            }
        }
    }, [searchParams]);

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

    // Handle Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!handleValidation()) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (editData) {
                const response = await fetch('/api/admin/update-announcement', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        announcementId: editData._id,
                        description: description
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update announcement');
                }

                const data = await response.json();

                if (data.success) {
                    showNotificationMessage('success', 'Announcement updated successfully');
                    setTimeout(() => {
                        router.push("/announcement");
                    }, 1000);
                } else {
                    throw new Error(data.message || 'Failed to update announcement');
                }
            } else {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-announcement`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        description: description
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add announcement');
                }

                const data = await response.json();

                if (data.success) {
                    showNotificationMessage('success', 'Announcement added successfully');
                    setTimeout(() => {
                        router.push("/announcement");
                    }, 1000);
                } else {
                    throw new Error(data.message || 'Failed to add announcement');
                }
            }
        } catch (err) {
            console.error('Error submitting announcement:', err);
            showNotificationMessage('error', err instanceof Error ? err.message : 'Failed to submit announcement');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) {
        return (
            <div className="p-5 bg-white mb-5 shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-8">
                    <div className="text-2xl font-medium text-black">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <>
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
                        {mode} Announcement
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

                    <div className="flex justify-between">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`font-medium bg-[#EF4444] text-white py-2.5 px-5 rounded cursor-pointer text-base hover:bg-[#DC2626] transition-colors ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAnnouncement;