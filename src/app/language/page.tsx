"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import MainDatatable from "@/components/common/MainDatatable";

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
            selector: (row: LanguageData) => languageData.indexOf(row) + 1, 
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
                        className="cursor-pointer hover:text-blue-600 transition-colors"
                    >
                        <Edit size={18} />
                    </div>
                    <div 
                        onClick={() => handleDelete(row._id, row.languageName)} 
                        className="cursor-pointer hover:text-red-600 transition-colors"
                    >
                        <Trash2 size={18} />
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
                    // 'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch languages');
            }

            const data = await response.json();
            console.log("API Response:", data); // Debug log
            
            if (data.success) {
                // FIXED: Changed from data.announcement to data.languageData
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

    const handleEdit = (row: LanguageData) => {
        // Using URLSearchParams to pass data
        const params = new URLSearchParams();
        params.set('editData', JSON.stringify(row));
        router.push(`/language/edit-language?${params.toString()}`);
    };

    const handleDelete = async (langId: string, languageName: string) => {
        if (!confirm(`Are you sure you want to delete "${languageName}"?`)) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-language/${langId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ language: languageName }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete language');
            }

            const data = await response.json();
            
            if (data.success) {
                // Refresh the languages list
                fetchLanguages();
                // Show success message
                showNotificationMessage('success', 'Language deleted successfully');
            } else {
                throw new Error(data.message || 'Failed to delete language');
            }
        } catch (err) {
            console.error('Error deleting language:', err);
            showNotificationMessage('error', err instanceof Error ? err.message : 'Failed to delete language');
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
            />
        </>
    );
}

export default Language;