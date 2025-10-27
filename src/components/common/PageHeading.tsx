// components/common/PageHeading.tsx
import React from 'react';

interface PageHeadingProps {
  title: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title }) => {
  return (
    <div className="border-l-4 border-primary pl-2 text-nowrap text-lg font-medium self-center capitalize">
      {title}
    </div>
  );
};

export default PageHeading;
