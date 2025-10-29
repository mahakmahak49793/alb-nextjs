'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EditSvg, DeleteSvg } from "@/components/svgs/page";
import MainDatatable from "@/components/common/MainDatatable";
import moment from "moment";
import Swal from "sweetalert2";

interface Skill {
  _id: string;
  skill: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  skills: never[];
  success: boolean;
  data: T;
  message?: string;
}

const Skill = () => {
  const router = useRouter();
  const [skillData, setSkillData] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // API call functions
  const getSkill = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-skill`);
      const data: ApiResponse<Skill[]> = await response.json();
      
      if (data.success) {
        setSkillData(data.skills  || []);
      } else {
        console.error('Failed to fetch skills:', data.message);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (skillId: string, skillName: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete the skill "${skillName}"!`,
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-skill`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ skillId }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          Swal.fire(
            'Deleted!',
            'Skill has been deleted successfully.',
            'success'
          );
          getSkill();
        } else {
          Swal.fire(
            'Error!',
            data.message || 'Failed to delete skill.',
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'Something went wrong while deleting skill.',
          'error'
        );
        console.error('Error deleting skill:', error);
      }
    }
  };

  // DataTable Columns
  const columns = [
    { 
      name: 'S.No.', 
      selector: (row: Skill, index?: number) => (index || 0) + 1 
    },
    { 
      name: 'Main Expertise', 
      selector: (row: Skill) => (
        <div className="capitalize">{row?.skill || 'N/A'}</div>
      )
    },
    { 
      name: 'Created Date', 
      selector: (row: Skill) => moment(row?.createdAt)?.format('DD-MMM-YYYY @ hh:mm a') 
    },
    {
      name: 'Action',
      cell: (row: Skill) => (
        <div className="flex gap-5 items-center">
          <div 
            onClick={() => router.push(`/skill/add-skill?edit=true&id=${row._id}&skill=${encodeURIComponent(row.skill)}`)} 
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <EditSvg />
          </div>
          <div 
            onClick={() => deleteSkill(row._id, row.skill)} 
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
    getSkill();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <MainDatatable 
        data={skillData} 
        columns={columns} 
        title={'Skill'} 
        url={'/skill/add-skill'}
        isLoading={loading}
      />
    </div>
  );
};

export default Skill;