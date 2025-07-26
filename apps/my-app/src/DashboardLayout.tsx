// src/DashboardLayout.tsx
import { type JSX } from 'react';

// This is your blank canvas for the dashboard layout.
// We'll use basic Tailwind CSS classes to create a simple structure.
export function DashboardLayout(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Internal Dashboard</h1>
          {/* Navigation or User Info can go here */}
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Timelines</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Settings</a></li>
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* This is where your dashboard widgets and modules will be placed */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 min-h-[400px] flex items-center justify-center">
          <p className="text-gray-500 text-lg">Your dashboard content will go here!</p>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} My Internal Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}
