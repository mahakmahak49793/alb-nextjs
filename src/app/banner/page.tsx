"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MainDatatable from "@/components/common/MainDatatable";
import { EditSvg, SwitchOffSvg, SwitchOnSvg } from "@/components/svgs/page";

const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || "";

interface Banner {
  _id: string;
  title: string;
  redirectTo: string;
  redirectionUrl: string;
  bannerImage: string;
  status: "active" | "inactive";
}

const Banner = () => {
  const router = useRouter();
  const [appBannerData, setAppBannerData] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch banners
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-app-banners`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug log

      // Extract banners array from response
      if (data.success && Array.isArray(data.banners)) {
        setAppBannerData(data.banners);
        console.log("Banners set:", data.banners); // Debug log
      } else {
        console.error("Invalid data format:", data);
        setAppBannerData([]);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setAppBannerData([]);
    } finally {
      setLoading(false);
    }
  };

  // Change banner status
  const changeBannerStatus = async (bannerId: string) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update_banner_status`;
      console.log("Calling API:", apiUrl); // Debug log
      console.log("Banner ID:", bannerId); // Debug log

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bannerId }),
      });

      console.log("Response status:", response.status); // Debug log
      console.log("Response headers:", response.headers.get('content-type')); // Debug log

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text.substring(0, 200));
        alert(`Server error: Expected JSON but got ${contentType}. Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log("Status update response:", data); // Debug log

      if (response.ok && data.success) {
        console.log(data.message); // Log success message
        // Refresh banners after status change
        await fetchBanners();
      } else {
        console.error("Failed to update status:", data);
        alert(`Failed to update status: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error changing banner status:", error);
      alert("Error updating banner status. Check console for details.");
    }
  };

  // Navigate to edit page
  const handleEdit = (banner: Banner) => {
    router.push(
      `/banner/add-banner?data=${encodeURIComponent(JSON.stringify(banner))}`
    );
  };

  // Datatable Columns
  const columns = [
    {
      name: "S.No.",
      selector: (row: Banner, index?: number) => (index ?? 0) + 1,
      width: "80px",
    },
    {
      name: "Title",
      selector: (row: Banner) => row?.title || "N/A",
      width: "180px",
    },
    {
      name: "Redirect Page",
      selector: (row: Banner) => row?.redirectTo || "N/A",
      width: "170px",
    },
    {
      name: "Redirect Url",
      selector: (row: Banner) => {
        if (!row?.redirectionUrl) return "N/A";
        const url = row.redirectionUrl;
        return url.length > 50 ? `${url.slice(0, 50)}...` : url;
      },
      width: "280px",
    },
    {
      name: "Banner",
      cell: (row: Banner) => (
        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100">
          {row.bannerImage ? (
            <Image
              src={`${IMG_URL}${row.bannerImage}`}
              alt={row.title || "Banner"}
              fill
              className="object-cover"
              sizes="48px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>
      ),
      width: "120px",
    },
    {
      name: "Status",
      cell: (row: Banner) => (
        <div
          onClick={() => changeBannerStatus(row._id)}
          className="cursor-pointer"
        >
          {row?.status === "active" ? <SwitchOnSvg /> : <SwitchOffSvg />}
        </div>
      ),
      width: "100px",
    },
    {
      name: "Action",
      cell: (row: Banner) => (
        <div className="flex gap-5 items-center">
          <div onClick={() => handleEdit(row)} className="cursor-pointer">
            <EditSvg />
          </div>
        </div>
      ),
      width: "100px",
    },
  ];

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="p-6">
      <MainDatatable
        data={appBannerData}
        columns={columns}
        title="Banner"
        url="/banner/add-banner"
        addButtonActive={appBannerData.length < 10}
        buttonMessage="Maximum 10 banners are allowed."
        isLoading={loading}
      />
    </div>
  );
};

export default Banner;