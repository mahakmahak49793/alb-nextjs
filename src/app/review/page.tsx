'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@mui/material";
import Swal from "sweetalert2";
import MainDatatable from "@/components/common/MainDatatable";

interface Notification {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const AstrologerNotification = () => {
  const router = useRouter();
  const [astrologerNotificationData, setAstrologerNotificationData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // API call functions
  const getAstrologerNotification = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-astrologer-notification`);
      const data: ApiResponse<Notification[]> = await response.json();
      
      if (data.success) {
        setAstrologerNotificationData(data.data || []);
      } else {
        console.error('Failed to fetch notifications:', data.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this notification!",
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-notification`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notificationId }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          Swal.fire(
            'Deleted!',
            'Notification has been deleted successfully.',
            'success'
          );
          getAstrologerNotification();
        } else {
          Swal.fire(
            'Error!',
            data.message || 'Failed to delete notification.',
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'Something went wrong while deleting notification.',
          'error'
        );
        console.error('Error deleting notification:', error);
      }
    }
  };

  const openTextModal = (title: string, text: string) => {
    Swal.fire({
      title: title,
      html: `<div class="text-left max-h-96 overflow-y-auto">${text}</div>`,
      showCloseButton: true,
      showConfirmButton: false,
      width: '600px',
      customClass: {
        popup: 'rounded-lg',
        htmlContainer: 'text-left'
      }
    });
  };

  // DataTable Columns
  const astrologerColumns = [
    { 
      name: 'S.No.', 
      selector: (row: Notification, index?: number) => (index || 0) + 1, 
      style: { paddingLeft: "20px" }, 
      width: "80px" 
    },
    { 
      name: 'Title', 
      selector: (row: Notification) => row?.title || 'N/A'
    },
    { 
      name: 'Description', 
      cell: (row: Notification) => (
        <div 
          onClick={() => openTextModal('Description', row?.description || '')}
          className="cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
        >
          {row?.description 
            ? row.description.length > 50 
              ? row.description.substring(0, 50) + '...' 
              : row.description
            : 'N/A'
          }
        </div>
      )
    },
    { 
      name: 'Icon', 
      selector: (row: Notification) => (
        <Avatar 
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${row.image}`} 
          style={{ width: 50, height: 50 }} 
          variant="square" 
        />
      ),
      width: "100px"
    },
    {
      name: 'Action',
      cell: (row: Notification) => (
        <div className="flex gap-5 items-center">
          <div 
            onClick={() => router.push(`/astrologer-notification/add-notification?edit=true&id=${row._id}`)} 
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            {/* Add your EditSvg component here */}
            <span>Edit</span>
          </div>
          <div 
            onClick={() => deleteNotification(row._id)} 
            className="cursor-pointer hover:opacity-70 transition-opacity text-red-600"
          >
            {/* Add your DeleteSvg component here */}
            <span>Delete</span>
          </div>
        </div>
      ),
      width: "180px"
    },
  ];

  useEffect(() => {
    getAstrologerNotification();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <MainDatatable 
        data={astrologerNotificationData} 
        columns={astrologerColumns} 
        title={'Astrologer Notification'} 
        url={'/astrologer-notification/add-notification'}
        isLoading={loading}
      />
    </div>
  );
};

export default AstrologerNotification;