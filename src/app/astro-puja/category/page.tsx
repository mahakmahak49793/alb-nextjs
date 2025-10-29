'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { EditSvg, DeleteSvg } from "@/components/svgs/page";
import MainDatatable from "@/components/common/MainDatatable";
import Swal from "sweetalert2";

interface PujaCategory {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const Category = () => {
  const router = useRouter();
  const [pujaCategoryData, setPujaCategoryData] = useState<PujaCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // API call functions
  const getPujaCategory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puja/get_puja_category`);
      const data= await response.json();
      
      if (data.success) {
        setPujaCategoryData(data.results);
      } else {
        console.error('Failed to fetch categories:', data.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePujaCategory = async (categoryId: string) => {
 const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete!!!",
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
       
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puja/delete_puja_category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh the category list after deletion
        getPujaCategory();
      } else {
        console.error('Failed to delete category:', data.message);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }};

  // Category DataTable Columns
  const categoryColumns = [
    { 
      name: 'S.No.', 
          selector: (row: PujaCategory, index?: number) => (index || 0) + 1, // Make index optional

    },
    { 
      name: 'Title', 
      selector: (row: PujaCategory) => row?.categoryName 
    },
    { 
      name: 'Created Date', 
      selector: (row: PujaCategory) => moment(row?.createdAt)?.format('DD-MMM-YYYY @ hh:mm a') 
    },
   {
  name: 'Action',
  cell: (row: PujaCategory) => (
    <div className="flex gap-5 items-center">
      <div 
        onClick={() => router.push(`/astro-puja/category/add-category?edit=true&id=${row._id}&name=${encodeURIComponent(row.categoryName)}`)} 
        className="cursor-pointer hover:opacity-70 transition-opacity"
      >
        <EditSvg />
      </div>
      <div 
        onClick={() => deletePujaCategory(row._id)} 
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
    getPujaCategory();
  }, []);

  return (
    <>
      <MainDatatable 
        data={pujaCategoryData} 
        columns={categoryColumns} 
        title={'Puja Category'} 
        url={'/astro-puja/category/add-category'}
        isLoading={loading}
      />
    </>
  );
}

export default Category;