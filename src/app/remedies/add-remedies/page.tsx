'use client';
import AddRemediesContent from "@/components/remedies/addRemediesContent";
import React, { Suspense } from "react";

const AddRemedies = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    }>
      <AddRemediesContent />
    </Suspense>
  );
};

export default AddRemedies;