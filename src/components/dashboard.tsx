"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Color } from "@/assets/colors";
import { IndianRupee } from "@/utils/common-function";

import * as DashboardActions from "@/redux/actions/dashboardActions";

import { ServicesChart,EarningChart } from "@/components/charts/pie-chart";
import { RechargeReport } from "@/components/charts/bar-chart";
import { AstrologerSvg,TodayAstrologerSvg,CustomerSvg,TodayCustomerSvg,BlogSvg,ReviewSvg,RechargeSvg,EarningSvg } from "@/assets/svg";

interface ReportDateState {
  rechargeReportDate: Date;
  earningChartDate: Date | null;
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { dashboardData } = useAppSelector((state) => state?.dashboardReducer);

  const [reportDate, setReportDate] = useState<ReportDateState>({ 
    rechargeReportDate: new Date(), 
    earningChartDate: null 
  });
  
  const { rechargeReportDate, earningChartDate } = reportDate;

  useEffect(() => {
    dispatch(
      DashboardActions?.getRechargeReport({ 
        month: rechargeReportDate?.getMonth() + 1, 
        year: rechargeReportDate?.getFullYear() 
      })
    );
  }, [rechargeReportDate, dispatch]);

  useEffect(() => {
    dispatch(
      DashboardActions?.getEarningReport({ 
        month: isNaN(earningChartDate?.getMonth() as number) 
          ? '' 
          : ((earningChartDate?.getMonth() || 0) + 1)?.toString()?.padStart(2, '0'), 
        year: isNaN(earningChartDate?.getFullYear() as number) 
          ? '' 
          : earningChartDate?.getFullYear() 
      })
    );
  }, [earningChartDate, dispatch]);

  useEffect(() => {
    dispatch(DashboardActions?.getDashboard());
    dispatch(DashboardActions?.getServiceUsedReport());
  }, [dispatch]);

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
            <RechargeReport />
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
            <ServicesChart />
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
            <EarningChart />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;