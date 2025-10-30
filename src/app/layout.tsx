"use client";
import { ReduxProvider } from '@/providers/reduxprovider';
import './globals.css';
import Header from '@/components/layout/Header';
import Sidebar from './layout/sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <div className="flex h-screen bg-[rgb(241,242,247)] text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md  fixed left-0 top-0 h-screen">
              <Sidebar />
            </aside>

            {/* Main Section */}
            <div className="flex-1 ml-64 flex flex-col">
              {/* Header */}
              <header className="bg-white shadow-sm border-b border-gray-200 z-10">
                <Header />
              </header>

              {/* Page Content */}
              <main className="flex-1 overflow-y-auto p-6 bg-[rgb(241,242,247)]">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}