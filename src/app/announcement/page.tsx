"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainDatatable from "@/components/common/MainDatatable";
import { DeleteSvg, EditSvg } from "@/components/svgs/page";
import { Eye } from "lucide-react";
import Swal from "sweetalert2";

interface Announcement {
  _id: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

const Announcement = () => {
    const router = useRouter();
    const [announcementData, setAnnouncementData] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalData, setModalData] = useState<{ title: string; text: string; type: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open text modal
    const openTextModal = (data: { title: string; text: string; type: string }) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    // Function to fetch all announcements
    const getAllAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-all-anouncement`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch announcements');
            }
            
            const data = await response.json();
            console.log("Announcements data:", data.announcement);
            if (data.success) {
                setAnnouncementData(data.announcement);
            } else {
                throw new Error(data.message || 'Failed to fetch announcements');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching announcements:', err);
        } finally {
            setLoading(false);
        }
    };

    // Delete announcement using POST method with SweetAlert confirmation
    const deleteAnnouncement = async (announcementId: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this announcement!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#d1d5db',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-announcement`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ announcementId }),
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Refresh the announcements list after deletion
                    await getAllAnnouncements();
                    Swal.fire(
                        'Deleted!',
                        'Announcement has been deleted successfully.',
                        'success'
                    );
                } else {
                    Swal.fire(
                        'Error!',
                        data.message || 'Failed to delete announcement',
                        'error'
                    );
                }
            } catch (error) {
                console.error('Error deleting announcement:', error);
                Swal.fire(
                    'Error!',
                    'Failed to delete announcement',
                    'error'
                );
            }
        }
    };

    // Function to edit announcement - pass data via URL params
    const handleEditAnnouncement = (announcement: Announcement) => {
        // Create URLSearchParams to pass data
        const params = new URLSearchParams();
        params.set('edit', 'true');
        params.set('id', announcement._id);
        if (announcement.description) {
            // Encode the description for URL safety
            params.set('description', encodeURIComponent(announcement.description));
        }
        
        router.push(`/announcement/add-announcement?${params.toString()}`);
    };

    //* DataTable Columns
    const columns = [
        { 
            name: 'S.No.', 
            selector: (row: Announcement, index?: number) => (index || 0) + 1, 
            width: '80px' 
        },
        { 
            name: 'Description', 
            selector: (row: Announcement) => 
                row?.description ? (
                    <div className="flex items-center gap-2">
                        <div 
                            onClick={() => openTextModal({ 
                                title: 'Description', 
                                text: row?.description, 
                                type: 'editor' 
                            })} 
                            dangerouslySetInnerHTML={{ 
                                __html: row?.description?.toString().slice(0, 150) + (row.description.length > 150 ? '...' : '')
                            }} 
                            className="cursor-pointer hover:text-blue-600 transition-colors flex-1" 
                        />
                        {/* <Eye 
                            size={16} 
                            className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                            onClick={() => openTextModal({ 
                                title: 'Full Description', 
                                text: row?.description, 
                                type: 'editor' 
                            })}
                        /> */}
                    </div>
                ) : 'N/A' 
        },
        {
            name: 'Action',
            cell: (row: Announcement) => (
                <div className="flex gap-5 items-center">
                    <div 
                        onClick={() => handleEditAnnouncement(row)} 
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        <EditSvg />
                    </div>
                    <div 
                        onClick={() => deleteAnnouncement(row._id)} 
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        <DeleteSvg />
                    </div>
                </div>
            ),
            width: "180px"
        },
    ];

    useEffect(() => {
        getAllAnnouncements();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-red-600 text-center">
                    <p>Error: {error}</p>
                    <button 
                        onClick={getAllAnnouncements}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Modal for viewing full description */}
            {isModalOpen && modalData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {modalData.title}
                            </h3>
                            <button 
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <div 
                                dangerouslySetInnerHTML={{ __html: modalData.text }}
                                className="prose max-w-none"
                            />
                        </div>
                        <div className="flex justify-end p-6 border-t">
                            <button 
                                onClick={closeModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-4">
                <MainDatatable
                    data={announcementData} 
                    columns={columns} 
                    title={'Announcement'} 
                    url={'/announcement/add-announcement'} 
                    isLoading={loading}
                />
            </div>
        </>
    );
}

export default Announcement;