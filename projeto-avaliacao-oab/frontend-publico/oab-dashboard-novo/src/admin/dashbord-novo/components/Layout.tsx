

import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { ThemeProvider } from './theme-provider';



export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}