'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import AnnouncementPageEditor from "@/components/announcementPageEditor";

interface InputFieldError {
    description?: string;
}

interface NotificationState {
    show: boolean;
    type: 'success' | 'error' | '';
    message: string;
}

function AddAnnouncementReview() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Get data from URL parameters
    const editMode = searchParams.get('edit') === 'true';
    const announcementId = searchParams.get('id');
    const announcementDescriptionFromUrl = searchParams.get('description');

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(editMode && !announcementDescriptionFromUrl);
    const [notification, setNotification] = useState<NotificationState>({
        show: false,
        type: '',
        message: ''
    });

    const [initialContent, setInitialContent] = useState(
  announcementDescriptionFromUrl || ''
);
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
                        setInitialContent(data.data.description || '');
                    } else {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: data.message || 'Failed to fetch announcement data',
                            confirmButtonColor: '#d33',
                        });
                    }
                } catch (error) {
                    console.error('Error fetching announcement:', error);
                    await Swal.fire({
                        icon: 'error',
                        title: 'Network Error!',
                        text: 'Failed to load announcement data. Please check your connection.',
                        confirmButtonColor: '#d33',
                    });
                } finally {
                    setFetching(false);
                }
            }
        };

        fetchAnnouncementData();
    }, [editMode, announcementId, announcementDescriptionFromUrl]);

    const handleSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: editMode ? 'Announcement updated successfully!' : 'Announcement created successfully!',
            confirmButtonColor: '#3085d6',
        }).then(() => {
            router.push("/announcement");
        });
    };

    const handleCancel = () => {
        router.push("/announcement");
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-lg text-gray-600">Loading announcement data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className=" px-6 py-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">
                                {editMode ? 'Edit Announcement' : 'Add New Announcement'}
                            </h2>
                            <button
                                onClick={handleCancel}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 backdrop-blur-sm"
                            >
                                Display
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <AnnouncementPageEditor
                            initialContent={initialContent}
                            createEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/admin/${editMode ? 'update-announcement' : 'add-announcement'}`}
                            announcementId={announcementId || undefined}
                            editMode={editMode}
                            loading={loading}
                            onSuccess={handleSuccess}
                            onCancel={handleCancel}
                        />
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
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        <div className="text-lg text-gray-600">Loading...</div>
                    </div>
                </div>
            }
        >
            <AddAnnouncementReview />
        </Suspense>
    );
};

export default AddAnnouncement;