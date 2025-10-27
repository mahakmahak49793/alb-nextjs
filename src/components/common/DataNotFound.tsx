// components/common/DataNotFound.tsx
import React from 'react';
import Image from 'next/image';
import NotFoundImage from '../../assets/images/common/not-found.png';

const DataNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Image
        src={NotFoundImage}
        alt="Data Not Found"
        className="w-1/2 max-w-xs"
        priority={false}
        placeholder="blur" // Optional: adds blur placeholder while loading
      />
    </div>
  );
};

export default DataNotFound;
