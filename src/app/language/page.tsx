"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainDatatable from "@/components/common/MainDatatable";
import { DeleteSvg, EditSvg } from "@/components/svgs/page";
import Swal from "sweetalert2";

interface LanguageData {
    _id: string;
    languageName: string;
}

const Language = () => {
    const router = useRouter();
    const [languageData, setLanguageData] = useState<LanguageData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });

    // DataTable Columns
    const categoryColumns = [
        { 
            name: 'S.No.', 
            selector: (row: LanguageData, index?: number) => (index || 0) + 1, 
            width: '80px'
        },
        { 
            name: 'Language', 
            selector: (row: LanguageData) => row?.languageName 
        },
        {
            name: 'Action',
            cell: (row: LanguageData) => (
                <div className="flex gap-5 items-center">
                    <div 
                        onClick={() => handleEdit(row)} 
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        <EditSvg />
                    </div>
                    <div 
                        onClick={() => handleDelete(row._id, row.languageName)} 
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        <DeleteSvg />
                    </div>
                </div>
            ),
            width: "180px"
        },
    ];

    // Show notification
    const showNotificationMessage = (type: string, message: string) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: '', message: '' });
        }, 3000);
    };

    // Fetch languages from API
    const fetchLanguages = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_language`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch languages');
            }

            const data = await response.json();
            console.log("API Response:", data);
            
            if (data.success) {
                setLanguageData(data.languageData || []);
            } else {
                throw new Error(data.message || 'Failed to fetch languages');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching languages:', err);
        } finally {
            setLoading(false);
        }
    };

    // Updated edit function to pass data via URL params
   const handleEdit = (language: LanguageData) => {
    // Create URLSearchParams to pass data
    const params = new URLSearchParams();
    params.set('edit', 'true');
    params.set('id', language._id);
    params.set('name', encodeURIComponent(language.languageName));
    
    router.push(`/language/add-language?${params.toString()}`);
};

    // Delete function
    const handleDelete = async (langId: string, languageName: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete "${languageName}"!`,
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete_language`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ langId: langId }),
                });

                // Handle 204 No Content and other success statuses
                if (response.status === 204 || response.ok) {
                    await fetchLanguages();
                    Swal.fire(
                        'Deleted!',
                        `"${languageName}" has been deleted successfully.`,
                        'success'
                    );
                } else {
                    // Handle error responses
                    const errorText = await response.text();
                    let errorMessage = `Server error: ${response.status}`;
                    
                    try {
                        const errorData = JSON.parse(errorText);
                        errorMessage = errorData.message || errorMessage;
                    } catch {
                        if (errorText) errorMessage = errorText;
                    }
                    
                    throw new Error(errorMessage);
                }

            } catch (err) {
                console.error('Error deleting language:', err);
                Swal.fire(
                    'Error!',
                    err instanceof Error ? err.message : 'Failed to delete language',
                    'error'
                );
            }
        }
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="font-semibold">Error loading languages</p>
                    <p>{error}</p>
                    <button 
                        onClick={fetchLanguages}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
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

            <MainDatatable 
                data={languageData} 
                columns={categoryColumns} 
                title={'Language'} 
                url={'/language/add-language'} 
                isLoading={loading}
            />
        </>
    );
};

export default Language;