"use client";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import moment from "moment";
import { Color } from "@/assets/colors";
import { IndianRupee } from "@/utils/common-function";
import { ServicesChart, EarningChart } from "@/components/charts/pie-chart";
// import { RechargeReport } from "@/components/charts/bar-chart";
import { AstrologerSvg, BlogSvg, CustomerSvg, EarningSvg, RechargeSvg, ReviewSvg, TodayAstrologerSvg, TodayCustomerSvg } from "./svgs/page";


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

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.dashboard || data.dashboardData || data.data || {});
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

  // Fetch recharge report
  const fetchRechargeReport = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_recharge_report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: rechargeReportDate.getMonth() + 1,
          year: rechargeReportDate.getFullYear()
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

  // Fetch earning report
  const fetchEarningReport = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_earning_report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: earningChartDate ? (earningChartDate.getMonth() + 1).toString().padStart(2, '0') : '',
          year: earningChartDate?.getFullYear() || ''
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

  // Fetch service used report
  const fetchServiceUsedReport = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get_service_used_report`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
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
    if (earningChartDate) fetchEarningReport();
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
    <div className="flex flex-col gap-5 p-4">
      {/* Header */}
      <div className="px-1 pb-2">
        <h1 className="font-semibold text-2xl">Dashboard</h1>
      </div>

      {/* Top Stats */}
      <Grid container spacing={2}>
        <Grid item lg={3} sm={12} md={12} xs={12}>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="text-sm text-gray-600">Total Astrologer</div>
                <div className="text-2xl font-bold">{dashboardData?.totalAstrologer || 0}</div>
              </div>
              <AstrologerSvg />
            </div>
          </div>
        </Grid>
        <Grid item lg={3} sm={12} md={12} xs={12}>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="text-sm text-gray-600">Today Astrologer</div>
                <div className="text-2xl font-bold">{dashboardData?.todayAstrologerRegistration || 0}</div>
              </div>
              <TodayAstrologerSvg />
            </div>
          </div>
        </Grid>
        <Grid item lg={3} sm={12} md={12} xs={12}>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="text-sm text-gray-600">Total Customer</div>
                <div className="text-2xl font-bold">{dashboardData?.totalCustomer || 0}</div>
              </div>
              <CustomerSvg />
            </div>
          </div>
        </Grid>
        <Grid item lg={3} sm={12} md={12} xs={12}>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="text-sm text-gray-600">Today Customer</div>
                <div className="text-2xl font-bold">{dashboardData?.todayCustomerRegistration || 0}</div>
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
        <div className="bg-white p-5 rounded-xl shadow-sm">
  {/* Header with Month Picker */}
  <div className="flex justify-between items-center mb-6">
    <div className="flex-1 text-center text-lg font-semibold">
      Recharge Report for
    </div>
    <input
      value={moment(rechargeReportDate).format('YYYY-MM')}
      onChange={(e) =>
        setReportDate({
          ...reportDate,
          rechargeReportDate: new Date(e.target.value),
        })
      }
      type="month"
      className="py-1.5 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors ml-4"
    />
  </div>

  {/* Chart */}
  <div className="flex justify-center overflow-x-auto">
    {/* <RechargeReport rechargeReportData={rechargeReportData} /> */}
  </div>
</div>

        </Grid>

        {/* Side Stats */}
        <Grid item lg={3} sm={12} md={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-600">Total Earning</div>
                    <div className="text-2xl font-bold">{IndianRupee(dashboardData?.totalAdminEarning || 0)}</div>
                  </div>
                  <EarningSvg />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-600">Total Recharge</div>
                    <div className="text-2xl font-bold">{IndianRupee(dashboardData?.totalRecharge || 0)}</div>
                  </div>
                  <RechargeSvg />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-600">Total Reviews</div>
                    <div className="text-2xl font-bold">{dashboardData?.totalReviews || 0}</div>
                  </div>
                  <ReviewSvg />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-600">Total Blogs</div>
                    <div className="text-2xl font-bold">{dashboardData?.totalBlogs || 0}</div>
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
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="text-lg font-semibold mb-4">Services Used</div>
            <div className="flex justify-center">
              <ServicesChart serviceUsedReportData={serviceUsedReportData} />
            </div>
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">Earning Chart</div>
              <input
                value={earningChartDate ? moment(earningChartDate).format('YYYY-MM') : ''}
                onChange={(e) => setReportDate({ ...reportDate, earningChartDate: e.target.value ? new Date(e.target.value) : null })}
                type="month"
                className="py-1.5 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex justify-center">
              <EarningChart earningReportData={earningReportData} />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;