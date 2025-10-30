'use client';

import React from 'react';

// Types
interface ViewModalProps {
  openModal: boolean;
  title: string;
  description?: string;
  text?: string;
  handleCloseModal: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({
  openModal,
  title,
  description,
  text,
  handleCloseModal
}) => {
  if (!openModal) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleCloseModal}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-[90vw] sm:max-w-[50vw] sm:min-w-[50vw] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {description && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            {text && (
              <div className="text-justify text-gray-700 leading-relaxed">
                {text}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewModal;