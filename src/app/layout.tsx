// "use client";
// import { useState } from 'react';
// import './globals.css';
// import Header from '@/components/layout/Header';
// import Sidebar from './layout/sidebar';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <html lang="en">
//       <body>
//         <div className="flex h-screen bg-[rgb(241,242,247)] text-gray-800">
//           {/* Sidebar */}
//           <aside 
//             className={`bg-white shadow-md border-r border-gray-200 fixed left-0 top-0 h-screen transition-all duration-300 ${
//               isSidebarOpen ? 'w-64' : 'w-20'
//             }`}
//           >
//             <Sidebar isSidebarOpen={isSidebarOpen} />
//           </aside>

//           {/* Main Section */}
//           <div 
//             className={`flex-1 flex flex-col transition-all duration-300 ${
//               isSidebarOpen ? 'ml-64' : 'ml-20'
//             }`}
//           >
//             {/* Header */}
//             <header className="bg-white shadow-sm border-b border-gray-200 z-10">
//               <Header 
//                 isSidebarOpen={isSidebarOpen} 
//                 onToggleSidebar={handleToggleSidebar} 
//               />
//             </header>

//             {/* Page Content */}
//             <main className="flex-1 overflow-y-auto px-6 py-6 bg-[rgb(241,242,247)]">
//               <div className="max-w-7xl mx-auto">
//                 {children}
//               </div>
//             </main>
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

"use client";
import { useState } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Sidebar from './layout/sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body className="overflow-hidden">
        <div className="flex h-screen bg-[rgb(241,242,247)] text-gray-800 overflow-hidden">
          {/* Sidebar */}
          <aside 
            className={`bg-white shadow-md border-r border-gray-200 fixed left-0 top-0 h-full transition-all duration-300 z-20 ${
              isSidebarOpen ? 'w-64' : 'w-20'
            }`}
          >
            <Sidebar isSidebarOpen={isSidebarOpen} />
          </aside>

          {/* Main Section */}
          <div 
            className={`flex-1 flex flex-col h-screen transition-all duration-300 ${
              isSidebarOpen ? 'ml-64' : 'ml-20'
            }`}
          >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 z-10 flex-shrink-0">
              <Header 
                isSidebarOpen={isSidebarOpen} 
                onToggleSidebar={handleToggleSidebar} 
              />
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto py-6 bg-[rgb(241,242,247)] min-h-0">
              <div className="max-w-7xl mx-auto w-full px-4">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}