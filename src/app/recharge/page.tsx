'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainDatatable from "../../components/common/MainDatatable";
import { Delete } from "@mui/icons-material";
import moment from "moment";
import Swal from "sweetalert2";
import { SwitchOnSvg, SwitchOffSvg, DeleteSvg } from "@/components/svgs/page";

// Update these with your actual API endpoints

interface RechargePlan {
  _id: string;
  amount: number;
  percentage: number;
  startDate: string;
  endDate: string;
  recharge_status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  allRechargePlan: RechargePlan[];
}

const Recharge: React.FC = () => {
  const router = useRouter();
  const [rechargePlanData, setRechargePlanData] = useState<RechargePlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch recharge plans
  const fetchRechargePlans = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-all-recharge-plans`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication token if needed
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recharge plans');
      }

      const result: ApiResponse = await response.json();
            
      // Extract the allRechargePlan array from the response
      const dataArray = result.success && Array.isArray(result.allRechargePlan) 
                       ? result.allRechargePlan 
                       : [];
      
      setRechargePlanData(dataArray);
    } catch (error) {
      console.error('Error fetching recharge plans:', error);
      setRechargePlanData([]); // Set empty array on error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load recharge plans',
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update recharge plan status
  const updateRechargePlanStatus = async (rechargePlanId: string, status: 'Active' | 'Inactive') => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-recharge-plan-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          rechargePlanId: rechargePlanId,
          status: status 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      await fetchRechargePlans();

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Status updated successfully',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update status',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const deleteRechargePlan = async (rechargePlanId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-recharge-plan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            rechargePlanId: rechargePlanId 
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete recharge plan');
        }

        await fetchRechargePlans();

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Recharge plan has been deleted.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error('Error deleting recharge plan:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete recharge plan',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  // Datatable columns configuration
  const rechargeColumns = [
    {
      name: "S.No.",
      selector: (row: RechargePlan, index?: number) => (index !== undefined ? index + 1 : 0),
      width: '80px',
    },
    {
      name: "Amount",
      selector: (row: RechargePlan) => row?.amount || 0,
      sortable: true,
    },
    {
      name: "Extra P.Amount",
      selector: (row: RechargePlan) => `${row?.percentage || 0}%`,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row: RechargePlan) => row?.startDate ? moment(row.startDate).format("DD-MM-YYYY") : 'N/A',
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row: RechargePlan) => row?.endDate ? moment(row.endDate).format("DD-MM-YYYY") : 'N/A',
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row: RechargePlan) => (
        <div
          onClick={() => updateRechargePlanStatus(
            row._id,
            row.recharge_status === "Active" ? "Inactive" : "Active"
          )}
          className="cursor-pointer"
        >
          {row.recharge_status === "Active" ? <SwitchOnSvg /> : <SwitchOffSvg />}
        </div>
      ),
      width: "120px",
    },
    {
      name: 'Action',
      cell: (row: RechargePlan) => (
        <div className="flex gap-5 items-center">
          <div
            onClick={() => deleteRechargePlan(row._id)}
            className="cursor-pointer"
          >
            <DeleteSvg />
          </div>
        </div>
      ),
      width: "150px",
    },
  ];

  // Fetch data on component mount
  useEffect(() => {
    fetchRechargePlans();
  }, []);


  return (
    <div>
      <MainDatatable
        data={rechargePlanData}
        columns={rechargeColumns}
        title="Recharge"
        url="/recharge/add-recharge"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Recharge;