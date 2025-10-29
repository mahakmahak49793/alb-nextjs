// 'use client';
// import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import DataTable from 'react-data-table-component';
// import { DataTableCustomStyles } from '../../../public/assets/styles/datatable';

// interface Astrologer {
//   astrologerName: string;
// }

// interface Customer {
//   email: string;
// }

// interface PaymentDetails {
//   paymentAmount: number;
//   paymentMethod: string;
// }

// interface Slot {
//   fromTime: string;
//   toTime: string;
// }

// interface Consultation {
//   _id: string;
//   astrologerId: Astrologer;
//   fullName: string;
//   customerId: Customer;
//   mobileNumber: string;
//   dateOfBirth: string;
//   timeOfBirth: string;
//   placeOfBirth: string;
//   date: string;
//   slotId: Slot;
//   consultationType: string;
//   consultationTopic: string;
//   paymentDetails: PaymentDetails;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ApiResponse {
//   success: boolean;
//   bookings: Consultation[];
//   totalPages: number;
//   currentPage: number;
//   totalCount: number;
// }

// interface Filters {
//   status: string;
//   customerName: string;
//   astrologerName: string;
//   startDate: string;
//   endDate: string;
// }

// interface Pagination {
//   totalPages: number;
//   currentPage: number;
//   limit: number;
// }

// const Consultation = () => {
//   const [consultationData, setConsultationData] = useState<Consultation[]>([]);
//   const [filters, setFilters] = useState<Filters>({
//     status: '',
//     customerName: '',
//     astrologerName: '',
//     startDate: '',
//     endDate: ''
//   });

//   const [pagination, setPagination] = useState<Pagination>({
//     totalPages: 1,
//     currentPage: 1,
//     limit: 10
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchData = async (page = 1) => {
//     try {
//       setLoading(true);
//       const queryParams = new URLSearchParams();
      
//       // Add filters
//       Object.entries(filters).forEach(([key, value]) => {
//         if (value) queryParams.append(key, value);
//       });
      
//       // Add pagination
//       queryParams.append('page', page.toString());
//       queryParams.append('limit', pagination.limit.toString());

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/all_consultations_booking?${queryParams.toString()}`);
//       const data: ApiResponse = await response.json();
      
//       if (data?.success) {
//         setConsultationData(data?.bookings || []);
//         setPagination(prev => ({
//           ...prev,
//           totalPages: data?.totalPages || 1,
//           currentPage: data?.currentPage || 1
//         }));
//       }
//     } catch (error) {
//       console.error('Failed to fetch consultation data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [filters]);

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePageChange = (page: number) => {
//     fetchData(page);
//   };

//   const clearFilters = () => {
//     setFilters({
//       status: '',
//       customerName: '',
//       astrologerName: '',
//       startDate: '',
//       endDate: ''
//     });
//   };

//   const columns = [
//     { 
//       name: 'S.No.', 
//       selector: (row: Consultation, index: number) => (pagination.currentPage - 1) * pagination.limit + index + 1, 
//       width: '80px' 
//     },
//     { 
//       name: 'Astrologer', 
//       selector: (row: Consultation) => row?.astrologerId?.astrologerName || 'N/A', 
//       width: '200px' 
//     },
//     { 
//       name: 'Customer Name', 
//       selector: (row: Consultation) => row?.fullName || 'N/A', 
//       width: '200px' 
//     },
//     { 
//       name: 'Customer Email', 
//       selector: (row: Consultation) => row?.customerId?.email || 'N/A', 
//       width: '250px' 
//     },
//     { 
//       name: 'Mobile', 
//       selector: (row: Consultation) => row?.mobileNumber || 'N/A', 
//       width: '150px' 
//     },
//     { 
//       name: 'DOB / TOB', 
//       selector: (row: Consultation) => `${row?.dateOfBirth || 'N/A'} / ${row?.timeOfBirth || 'N/A'}`, 
//       width: '180px' 
//     },
//     { 
//       name: 'POB', 
//       selector: (row: Consultation) => row?.placeOfBirth || 'N/A', 
//       width: '150px' 
//     },
//     { 
//       name: 'Date', 
//       selector: (row: Consultation) => moment(row?.date).format('DD-MM-YYYY'), 
//       width: '130px' 
//     },
//     { 
//       name: 'Slot', 
//       selector: (row: Consultation) => `${row?.slotId?.fromTime || ''} - ${row?.slotId?.toTime || ''}`, 
//       width: '150px' 
//     },
//     { 
//       name: 'Type', 
//       selector: (row: Consultation) => row?.consultationType || 'N/A', 
//       width: '150px' 
//     },
//     { 
//       name: 'Topic', 
//       selector: (row: Consultation) => row?.consultationTopic || 'N/A', 
//       width: '150px' 
//     },
//     { 
//       name: 'Amount', 
//       selector: (row: Consultation) => row?.paymentDetails?.paymentAmount || 'N/A', 
//       width: '120px' 
//     },
//     { 
//       name: 'Mode', 
//       selector: (row: Consultation) => row?.paymentDetails?.paymentMethod || 'N/A', 
//       width: '120px' 
//     },
//     { 
//       name: 'Status', 
//       selector: (row: Consultation) => row?.status || 'N/A', 
//       width: '120px' 
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Consultation Bookings</h1>
//           <div className="text-sm text-gray-600">
//             Total: {consultationData.length} bookings
//           </div>
//         </div>

//         {/* Filter Section */}
//         <div className="bg-gray-50 rounded-lg p-4 mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
//             <button
//               onClick={clearFilters}
//               className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition duration-200"
//             >
//               Clear Filters
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {/* Status Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select 
//                 name="status" 
//                 value={filters.status} 
//                 onChange={handleFilterChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//               >
//                 <option value="">All Status</option>
//                 <option value="booked">Upcoming</option>
//                 <option value="completed">Completed</option>
//                 <option value="cancelled">Cancelled</option>
//                 <option value="expired">Expired</option>
//               </select>
//             </div>

//             {/* Customer Name Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
//               <input 
//                 type="text" 
//                 placeholder="Customer Name" 
//                 name="customerName" 
//                 value={filters.customerName} 
//                 onChange={handleFilterChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//               />
//             </div>

//             {/* Astrologer Name Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Astrologer Name</label>
//               <input 
//                 type="text" 
//                 placeholder="Astrologer Name" 
//                 name="astrologerName" 
//                 value={filters.astrologerName} 
//                 onChange={handleFilterChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//               />
//             </div>

//             {/* Date Range Filters */}
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                 <input 
//                   type="date" 
//                   name="startDate" 
//                   value={filters.startDate} 
//                   onChange={handleDateRangeChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                 <input 
//                   type="date" 
//                   name="endDate" 
//                   value={filters.endDate} 
//                   onChange={handleDateRangeChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* DataTable */}
//         <MainDatatable
//           columns={columns}
//           data={consultationData}
//           pagination={{
//             totalPages: pagination.totalPages,
//             currentPage: pagination.currentPage,
//             onPageChange: handlePageChange
//           }}
//           isLoading={loading}
//         />
//       </div>
//     </div>
//   );
// };

// export default Consultation;

// // MainDatatable Component
// interface MainDatatableProps {
//   columns: any[];
//   data: Consultation[];
//   pagination?: {
//     totalPages: number;
//     currentPage: number;
//     onPageChange: (page: number) => void;
//   };
//   isLoading?: boolean;
// }

// const MainDatatable: React.FC<MainDatatableProps> = ({ 
//   columns, 
//   data, 
//   pagination,
//   isLoading = false 
// }) => {
//   const { currentPage = 1, totalPages = 1, onPageChange } = pagination || {};

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <div className="text-gray-600">Loading consultation data...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <DataTable
//         columns={columns}
//         data={data}
//         customStyles={DataTableCustomStyles}
//         fixedHeader
//         pagination={!pagination} // Use built-in pagination if no custom pagination
//       />
      
//       {pagination && totalPages > 1 && (
//         <div className="flex justify-center items-center mt-6 space-x-2">
//           <button
//             onClick={() => onPageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition duration-200 text-sm"
//           >
//             Previous
//           </button>
          
//           <div className="flex space-x-1">
//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }

//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => onPageChange(pageNum)}
//                   className={`px-3 py-1 border rounded-lg text-sm transition duration-200 ${
//                     currentPage === pageNum
//                       ? 'bg-blue-500 text-white border-blue-500'
//                       : 'border-gray-300 hover:bg-gray-50'
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//           </div>

//           <button
//             onClick={() => onPageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition duration-200 text-sm"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };


import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
