'use client';
import AddCategoryContent from "@/components/category/addCategoryContent";
import React, { Suspense } from "react";

const AddCategory = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg text-gray-600">Loading category form...</div>
        </div>
      </div>
    }>
      <AddCategoryContent />
    </Suspense>
  );
};

export default AddCategory;