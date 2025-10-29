"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import moment from "moment";
import { Color } from "@/assets/colors";
import { IndianRupee } from "@/utils/common-function";

import { ServicesChart, EarningChart } from "@/components/charts/pie-chart";
import { RechargeReport } from "@/components/charts/bar-chart";
import { AstrologerSvg, TodayAstrologerSvg, CustomerSvg, TodayCustomerSvg, BlogSvg, ReviewSvg, RechargeSvg, EarningSvg } from "@/assets/svg";

// Types
interface DashboardData {
  totalAstrologer?: number;
  todayAstrologerRegistration?: number;
  totalCustomer?: number;
  todayCustomerRegistration?: number;
  totalAdminEarning?: number;
  totalRecharge?: number;
  totalReviews?: number;
  totalBlogs?: number;
}

interface ServiceItem {
  type: string;
  count: number;
}

interface EarningReportData {
  VideoCall?: number;
  chat?: number;
  live_video_call?: number;
  gift?: number;
  call?: number;
  puja?: number;
  'Wallet Rechrge'?: number;
}

interface RechargeReportData {
  [key: string]: number;
}

interface ReportDateState {
  rechargeReportDate: Date;
  earningChartDate: Date | null;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({});
  const [serviceUsedReportData, setServiceUsedReportData] = useState<ServiceItem[]>([]);
  const [earningReportData, setEarningReportData] = useState<EarningReportData>({});
  const [rechargeReportData, setRechargeReportData] = useState<RechargeReportData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [reportDate, setReportDate] = useState<ReportDateState>({ 
    rechargeReportDate: new Date(), 
    earningChartDate: null 
  });
  
  const { rechargeReportDate, earningChartDate } = reportDate;

  // API Function to fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data.dashboardData || data.data || {});
      } else {
        throw new Error(data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // API Function to fetch recharge report
  const fetchRechargeReport = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_recharge_report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          month: rechargeReportDate?.getMonth() + 1, 
          year: rechargeReportDate?.getFullYear() 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRechargeReportData(data.rechargeReport || data.data || {});
        }
      }
    } catch (error) {
      console.error('Error fetching recharge report:', error);
    }
  };

  // API Function to fetch earning report
  const fetchEarningReport = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_earning_report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          month: isNaN(earningChartDate?.getMonth() as number) 
            ? '' 
            : ((earningChartDate?.getMonth() || 0) + 1)?.toString()?.padStart(2, '0'), 
          year: isNaN(earningChartDate?.getFullYear() as number) 
            ? '' 
            : earningChartDate?.getFullYear() 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setEarningReportData(data.earningReport || data.data || {});
        }
      }
    } catch (error) {
      console.error('Error fetching earning report:', error);
    }
  };

  // API Function to fetch service used report
  const fetchServiceUsedReport = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_service_used_report`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setServiceUsedReportData(data.serviceUsedReport || data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching service used report:', error);
    }
  };

  useEffect(() => {
    fetchRechargeReport();
  }, [rechargeReportDate]);

  useEffect(() => {
    if (earningChartDate) {
      fetchEarningReport();
    }
  }, [earningChartDate]);

  useEffect(() => {
    fetchDashboardData();
    fetchServiceUsedReport();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-4 min-h-screen">
      {/* Header */}
      <div className="px-1 pb-2">
        <h1 className="font-semibold text-2xl text-gray-800">Dashboard</h1>
      </div>

      {/* Top Stats Grid */}
      <Grid container spacing={2}>
        <Grid item lg={3} sm={12} md={12} xs={12}>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-600">Total Astrologer</div>
                <div className="text-2xl font-semibold text-gray-800">
                  {dashboardData?.totalAstrologer || 0}
                </div>
              </div>
              <AstrologerSvg/>
            </div>
          </div>
        </Grid>

        <Grid item lg={3} sm={12} md={12} xs={12}>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-600">Today Astrologer</div>
                <div className="text-2xl font-semibold text-gray-800">
                  {dashboardData?.todayAstrologerRegistration || 0}
                </div>
              </div>
              <TodayAstrologerSvg />
            </div>
          </div>
        </Grid>

        <Grid item lg={3} sm={12} md={12} xs={12}>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-600">Total Customer</div>
                <div className="text-2xl font-semibold text-gray-800">
                  {dashboardData?.totalCustomer || 0}
                </div>
              </div>
              <CustomerSvg/>
            </div>
          </div>
        </Grid>

        <Grid item lg={3} sm={12} md={12} xs={12}>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-600">Today Customer</div>
                <div className="text-2xl font-semibold text-gray-800">
                  {dashboardData?.todayCustomerRegistration || 0}
                </div>
              </div>
              <TodayCustomerSvg />
            </div>
          </div>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={2}>
        {/* Recharge Report Chart */}
        <Grid item lg={9} sm={12} md={12} xs={12}>
          <div className="flex flex-col items-center bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative">
            <input 
              value={moment(rechargeReportDate)?.format('YYYY-MM')} 
              onChange={(e) => setReportDate({ ...reportDate, rechargeReportDate: new Date(e.target.value) })} 
              type="month" 
              className="outline-none p-2 border border-gray-300 rounded-lg absolute right-5 top-5 z-10 bg-white"
            />
            <RechargeReport rechargeReportData={rechargeReportData} />
          </div>
        </Grid>

        {/* Side Stats */}
        <Grid item lg={3} sm={12} md={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-600">Total Earning Amt.</div>
                    <div className="text-2xl font-semibold text-gray-800">
                      {IndianRupee(dashboardData?.totalAdminEarning || 0)}
                    </div>
                  </div>
                  <EarningSvg />
                </div>
              </div>
            </Grid>

            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-600">Total Recharge Amt.</div>
                    <div className="text-2xl font-semibold text-gray-800">
                      {IndianRupee(dashboardData?.totalRecharge || 0)}
                    </div>
                  </div>
                  <RechargeSvg />
                </div>
              </div>
            </Grid>

            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-600">Total Reviews</div>
                    <div className="text-2xl font-semibold text-gray-800">
                      {dashboardData?.totalReviews || 0}
                    </div>
                  </div>
                  <ReviewSvg />
                </div>
              </div>
            </Grid>

            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-600">Total Blogs</div>
                    <div className="text-2xl font-semibold text-gray-800">
                      {dashboardData?.totalBlogs || 0}
                    </div>
                  </div>
                  <BlogSvg />
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom Charts */}
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className="flex flex-col gap-3 items-center bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between w-full">
              <div className="text-lg font-semibold text-gray-800">Services Used</div>
            </div>
            <ServicesChart serviceUsedReportData={serviceUsedReportData} />
          </div>
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className="flex flex-col gap-3 items-center bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between w-full flex-wrap gap-2">
              <div className="text-lg font-semibold text-gray-800">Earning Chart</div>
              <input 
                value={moment(earningChartDate)?.format('YYYY-MM')} 
                onChange={(e) => setReportDate({ ...reportDate, earningChartDate: new Date(e.target.value) })} 
                type="month" 
                className="outline-none p-2 border border-gray-300 rounded-lg bg-white"
              />
            </div>
            <EarningChart earningReportData={earningReportData} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;