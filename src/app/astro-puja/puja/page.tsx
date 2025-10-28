'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MainDatatable from "@/components/common/MainDatatable";
import ViewModal from "@/components/modals/viewmodal";
import { EditSvg, DeleteSvg } from "@/components/svgs/page";
import DatatableHeading from "@/components/common/dataTable";

// Types
interface Category {
  _id: string;
  categoryName: string;
}

interface PujaItem {
  _id: string;
  categoryId?: Category;
  pujaName: string;
  price: number;
  adminCommission?: number;
  description?: string;
  image?: string;
}

// API Configuration
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || '';

// Utility Functions
const deepSearchSpace = (data: PujaItem[], searchText: string): PujaItem[] => {
  if (!searchText.trim()) return data;
  
  const lowerSearch = searchText.toLowerCase();
  return data.filter(item => {
    return JSON.stringify(item).toLowerCase().includes(lowerSearch);
  });
};

const formatIndianRupee = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

// API Functions
const getPujaList = async (): Promise<PujaItem[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puja/get_puja`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch puja list');
    }
    
    const data = await response.json();
    return data.pooja || [];
  } catch (error) {
    console.error('Error fetching puja list:', error);
    return [];
  }
};

const deletePujaItem = async (pujaId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/api/puja/${pujaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete puja');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting puja:', error);
    return false;
  }
};

const Puja: React.FC = () => {
  const router = useRouter();
  const [pujaData, setPujaData] = useState<PujaItem[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const filteredData = deepSearchSpace(pujaData, searchText);

  const openModal = (text: string): void => {
    setModalIsOpen(true);
    setText(text);
  };

  const closeModal = (): void => setModalIsOpen(false);

  const handleDelete = async (pujaId: string): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this puja?')) {
      const success = await deletePujaItem(pujaId);
      if (success) {
        // Refresh the list after deletion
        fetchPujaData();
      }
    }
  };

  const fetchPujaData = async (): Promise<void> => {
    setLoading(true);
    const data = await getPujaList();
    setPujaData(data);
    setLoading(false);
  };

  // DataTable Columns
  const columns = [
    { 
      name: 'S.No.', 
      selector: (row: PujaItem) => pujaData.indexOf(row) + 1, 
      width: '80px' 
    },
    { 
      name: 'Category', 
      selector: (row: PujaItem) => row?.categoryId?.categoryName || 'N/A' 
    },
    { 
      name: 'Puja Name', 
      selector: (row: PujaItem) => row?.pujaName || 'N/A' 
    },
    { 
      name: 'Puja Price', 
      selector: (row: PujaItem) => formatIndianRupee(row?.price) 
    },
    { 
      name: 'Commission Price', 
      selector: (row: PujaItem) => row?.adminCommission ? `${row.adminCommission}%` : '0%'
    },
    { 
      name: 'Image', 
      cell: (row: PujaItem) => (
        <div className="relative w-[50px] h-[50px]">
          <Image 
            src={row?.image ? `${IMG_URL}${row.image}` : '/images/logo.png'} 
            alt="Puja" 
            fill
            className="rounded-full object-cover"
          />
        </div>
      )
    },
    {
      name: 'Action',
      cell: (row: PujaItem) => (
        <div className="flex gap-5 items-center">
          <div 
            onClick={() => router.push(`/astro-puja/puja/add-puja?id=${row._id}`)} 
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <EditSvg />
          </div>
          <div 
            onClick={() => handleDelete(row._id)} 
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
    fetchPujaData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
   
        {/* <DatatableHeading 
          title="Puja" 
          data={pujaData} 
          url="/astro-puja/puja/add-puja" 
        /> */}

       
        <MainDatatable columns={columns}   title = 'Puja'
  data={filteredData} url="/astro-puja/puja/add-puja" />

      <ViewModal 
        openModal={modalIsOpen} 
        text="Puja"
        title="Puja Description" 
        handleCloseModal={closeModal} 
      />
    </>
  );
};

export default Puja