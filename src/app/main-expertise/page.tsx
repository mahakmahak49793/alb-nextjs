'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EditSvg, DeleteSvg } from "@/components/svgs/page";
import MainDatatable from "@/components/common/MainDatatable";
import Swal from "sweetalert2";

interface MainExpertise {
  _id: string;
  mainExpertise: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  mainExpertise: never[];
  success: boolean;
  data: T;
  message?: string;
}

const MainExpertise = () => {
  const router = useRouter();
  const [mainExpertiseData, setMainExpertiseData] = useState<MainExpertise[]>([]);
  const [loading, setLoading] = useState(true);

  // API call functions
  const getMainExpertise = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-all-main-expertise`);
      const data: ApiResponse<MainExpertise[]> = await response.json();
      
      if (data.success) {
        setMainExpertiseData(data.mainExpertise || []);
      } else {
        console.error('Failed to fetch main expertise:', data.message);
      }
    } catch (error) {
      console.error('Error fetching main expertise:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMainExpertise = async (mainExpertiseId: string, mainExpertiseName: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete "${mainExpertiseName}"!`,
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/expertise/delete_main_expertise`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mainExpertiseId }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          Swal.fire(
            'Deleted!',
            'Main expertise has been deleted successfully.',
            'success'
          );
          getMainExpertise();
        } else {
          Swal.fire(
            'Error!',
            data.message || 'Failed to delete main expertise.',
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'Something went wrong while deleting main expertise.',
          'error'
        );
        console.error('Error deleting main expertise:', error);
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
  const columns = [
    { 
      name: 'S.No.', 
      selector: (row: MainExpertise, index?: number) => (index || 0) + 1, 
      width: '80px' 
    },
    { 
      name: 'Title', 
      selector: (row: MainExpertise) => (
        <div className="capitalize">{row?.mainExpertise || 'N/A'}</div>
      )
    },
    { 
      name: 'Description', 
      cell: (row: MainExpertise) => (
        <div 
          onClick={() => openTextModal('Description', row?.description || '')}
          className="cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ 
            __html: row?.description 
              ? row.description.length > 50 
                ? row.description.substring(0, 50) + '...' 
                : row.description
              : 'N/A'
          }}
        />
      )
    },
    { 
      name: 'Image', 
      cell: (row: MainExpertise) => (
        <div className="relative w-12 h-12">
          <Image 
            src={row?.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${row.image}` : '/images/placeholder.png'}
            alt="Expertise"
            fill
            className="rounded-full object-cover"
          />
        </div>
      ), 
      width: '100px' 
    },
    {
      name: 'Action',
      cell: (row: MainExpertise) => (
        <div className="flex gap-5 items-center">
          <div 
            onClick={() => router.push(`/main-expertise/add-main-expertise?edit=true&id=${row._id}`)} 
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <EditSvg />
          </div>
          <div 
            onClick={() => deleteMainExpertise(row._id, row.mainExpertise)} 
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
    getMainExpertise();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <MainDatatable 
        data={mainExpertiseData} 
        columns={columns} 
        title={'Main Expertise'} 
        url={'/main-expertise/add-main-expertise'}
        isLoading={loading}
      />
    </div>
  );
};

export default MainExpertise;